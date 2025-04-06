/*
`7MMM.     ,MMF'      db      `7MM"""Yb.   
  MMMb    dPMM       ;MM:       MM    `Yb. 
  M YM   ,M MM      ,V^MM.      MM     `Mb 
  M  Mb  M' MM     ,M  `MM      MM      MM 
  M  YM.P'  MM     AbmmmqMA     MM     ,MP 
  M  `YM'   MM    A'     VML    MM    ,dP' 
.JML. `'  .JMML..AMA.   .AMMA..JMMmmmdP'   
         ( MAD Services © جميع الحقوق محفوظه لدى )
            - 🌹 لك كامل صلاحية التعديل 🌹
*/

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember]
});

// Load config
client.config = require('./config.js');

// Create event handlers collection
client.events = new Collection();

// Load event handlers
const eventFiles = fs.readdirSync('./events')
    .filter(file => file.endsWith('.js') && !file.startsWith('Addons'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.events.set(eventName, event);
    console.log(`✅ Loaded event: ${eventName}`);
}

// Handle interactions
client.on('interactionCreate', async interaction => {
    try {
        // Handle button interactions
        if (interaction.isButton()) {
            const event = client.events.get(interaction.customId.split('_')[0]);
            if (event) await event(interaction, client);
        }
    } catch (error) {
        console.error('Error handling interaction:', error);
        
        // Log error
        const errorPath = path.join(__dirname, 'logs/errors.txt');
        const errorLog = `[${new Date().toISOString()}] Interaction Error: ${error.message}\n`;
        fs.appendFileSync(errorPath, errorLog);

        // Send error message to user
        const errorMessage = client.config.language === 'ar' ?
            '❌ حدث خطأ أثناء تنفيذ العملية' :
            '❌ An error occurred while processing your request';

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: errorMessage, ephemeral: true });
        } else {
            await interaction.reply({ content: errorMessage, ephemeral: true });
        }
    }
});

// Login to Discord
client.login(process.env.TOKEN)
    .then(() => {
        console.log(`✅ Bot logged in as ${client.user.tag}`);
        
        // Create necessary directories
        ['logs', 'events', 'events/Addons'].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`✅ Created directory: ${dir}`);
            }
        });
    })
    .catch(error => {
        console.error('Failed to login:', error);
        process.exit(1);
    });
