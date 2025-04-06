const { EmbedBuilder } = require('discord.js');
const { language } = require('./Addons/language');
const db = require('quick.db');

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'reopen_ticket') return;

    const lang = language[interaction.guild.id] || 'ar';

    // Check if user has support role
    if (!interaction.member.roles.cache.has(client.config.system.supportRole)) {
        return interaction.reply({
            content: lang === 'ar' ? 'لا تملك صلاحية إعادة فتح التذكرة!' : 'You don\'t have permission to reopen this ticket!',
            ephemeral: true
        });
    }

    try {
        // Get ticket owner
        const userId = db.get(`ticket_owner_${interaction.channel.id}`);
        if (!userId) {
            return interaction.reply({
                content: lang === 'ar' ? '❌ لم يتم العثور على صاحب التذكرة' : '❌ Ticket owner not found',
                ephemeral: true
            });
        }

        // Update permissions
        await interaction.channel.permissionOverwrites.edit(userId, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        });

        // Update channel name (remove 'closed-' prefix if exists)
        const newName = interaction.channel.name.replace('closed-', '');
        await interaction.channel.setName(newName);

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(lang === 'ar' ? '🔓 تم إعادة فتح التذكرة' : '🔓 Ticket Reopened')
            .setDescription(lang === 'ar' ? 
                `تم إعادة فتح التذكرة بواسطة ${interaction.user}` : 
                `Ticket reopened by ${interaction.user}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error reopening ticket:', error);
        await interaction.reply({
            content: lang === 'ar' ? '❌ حدث خطأ أثناء إعادة فتح التذكرة' : '❌ Error reopening the ticket',
            ephemeral: true
        });
    }
};
