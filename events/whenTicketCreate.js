const { MessageActionRow, Modal, TextInputComponent, Client, Intents, MessageButton, MessageEmbed, UserFlags, Message } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require(`../config.js`);
const language = require('./Addons/language.js')[config.language]

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'create_ticket') return;

    const lang = language[interaction.guild.id] || 'ar';
    const userId = interaction.user.id;
    const userName = interaction.user.username;

    // Check if user has reached max tickets
    const userTickets = db.get(`tickets_${userId}`) || 0;
    if (userTickets >= client.config.max_tickets) {
        return interaction.reply({
            content: lang === 'ar' ? 'عذراً، لديك الحد الأقصى من التذاكر المفتوحة!' : 'Sorry, you have reached the maximum number of open tickets!',
            ephemeral: true
        });
    }

    // Create ticket channel
    const ticketChannel = await interaction.guild.channels.create({
        name: `ticket-${userName}`,
        type: 0,
        parent: client.config.system.category,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: ['ViewChannel']
            },
            {
                id: userId,
                allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
            },
            {
                id: client.config.system.supportRole,
                allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
            }
        ]
    });

    // Create ticket embed
    const embed = new MessageEmbed()
        .setTitle(`> ${config.tickets[0].title}`)
        .setAuthor({name: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL()})
        .setDescription(`${config.tickets[0].message.replace(`{username}`, `${interaction.user.username}`)}`)
        .addFields(
            { name: language.ticket_num, value: `#${1}`, inline: true },
            { name: language.managers_online, value: `\\🟢 0`, inline: true },
        )
        .setColor(`#ebc743`)
        .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL()})

    let ticketUA = new MessageActionRow()
    ticketUA.addComponents(new MessageButton().setEmoji(`👤`).setLabel(`${language.user_options}`).setCustomId('UserX_Options').setStyle('SECONDARY')) 
    ticketUA.addComponents(new MessageButton().setEmoji(`🛠️`).setLabel(`${language.staff_options}`).setCustomId('StaffX_Options').setStyle('SECONDARY')) 
    ticketUA.addComponents(new MessageButton().setEmoji(`${config.pin_emoji}`).setLabel(`${language.claim}`).setCustomId('StaffX_Claim').setStyle('SECONDARY')) 

    await ticketChannel.send({embeds: [embed], components: [ticketUA]}).catch(e => {}).then(msg => { msg.pin() })

    // Save ticket info in database
    db.set(`ticket_owner_${ticketChannel.id}`, userId);
    db.add(`tickets_${userId}`, 1);

    // Send confirmation
    await interaction.reply({
        content: lang === 'ar' ? `✅ تم إنشاء تذكرتك في ${ticketChannel}` : `✅ Your ticket has been created in ${ticketChannel}`,
        ephemeral: true
    });
};
