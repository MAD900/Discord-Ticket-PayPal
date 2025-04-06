const { EmbedBuilder } = require('discord.js');
const { language } = require('./Addons/language');
const db = require('quick.db');

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'remove_ticket') return;

    const lang = language[interaction.guild.id] || 'ar';

    // Check if user has support role
    if (!interaction.member.roles.cache.has(client.config.system.supportRole)) {
        return interaction.reply({
            content: lang === 'ar' ? 'لا تملك صلاحية حذف التذكرة!' : 'You don\'t have permission to remove this ticket!',
            ephemeral: true
        });
    }

    try {
        // Get ticket owner and update their ticket count
        const userId = db.get(`ticket_owner_${interaction.channel.id}`);
        if (userId) {
            db.subtract(`tickets_${userId}`, 1);
            db.delete(`ticket_owner_${interaction.channel.id}`);
        }

        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle(lang === 'ar' ? '🗑️ جاري حذف التذكرة' : '🗑️ Removing Ticket')
            .setDescription(lang === 'ar' ? 
                'سيتم حذف هذه التذكرة خلال 5 ثواني...' : 
                'This ticket will be deleted in 5 seconds...')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

        // Delete the channel after 5 seconds
        setTimeout(() => {
            interaction.channel.delete()
                .catch(console.error);
        }, 5000);

    } catch (error) {
        console.error('Error removing ticket:', error);
        await interaction.reply({
            content: lang === 'ar' ? '❌ حدث خطأ أثناء حذف التذكرة' : '❌ Error removing the ticket',
            ephemeral: true
        });
    }
};
