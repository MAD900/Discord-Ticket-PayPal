const { EmbedBuilder } = require('discord.js');
const { language } = require('./Addons/language');

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'pin_ticket') return;

    const lang = language[interaction.guild.id] || 'ar';

    // Check if user has support role
    if (!interaction.member.roles.cache.has(client.config.system.supportRole)) {
        return interaction.reply({
            content: lang === 'ar' ? 'لا تملك صلاحية تثبيت التذكرة!' : 'You don\'t have permission to pin this ticket!',
            ephemeral: true
        });
    }

    try {
        // Pin the message
        await interaction.message.pin();

        const embed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(lang === 'ar' ? '📌 تم تثبيت التذكرة' : '📌 Ticket Pinned')
            .setDescription(lang === 'ar' ? 
                `تم تثبيت التذكرة بواسطة ${interaction.user}` : 
                `Ticket pinned by ${interaction.user}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error pinning ticket:', error);
        await interaction.reply({
            content: lang === 'ar' ? '❌ حدث خطأ أثناء تثبيت التذكرة' : '❌ Error pinning the ticket',
            ephemeral: true
        });
    }
};
