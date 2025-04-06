const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require(`../config.js`);
const language = require('./Addons/language.js')[config.language]
const db = require('quick.db');

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'close_ticket') return;

    const lang = language[interaction.guild.id] || 'ar';
    
    // Check if user has permission
    const hasPermission = interaction.member.roles.cache.has(client.config.system.supportRole) || 
                         interaction.channel.permissionOverwrites.cache.has(interaction.user.id);
    
    if (!hasPermission) {
        return interaction.reply({
            content: lang === 'ar' ? 'لا تملك صلاحية إغلاق التذكرة!' : 'You don\'t have permission to close this ticket!',
            ephemeral: true
        });
    }

    let ticketUA = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setEmoji('✅')
                .setLabel(lang === 'ar' ? 'تأكيد' : 'Confirm')
                .setCustomId('confirm_close')
                .setStyle('SUCCESS'),
            new MessageButton()
                .setEmoji('❌')
                .setLabel(lang === 'ar' ? 'إلغاء' : 'Cancel')
                .setCustomId('cancel_close')
                .setStyle('DANGER')
        );

    let embed = new MessageEmbed()
        .setTitle(lang === 'ar' ? '⚠️ تأكيد إغلاق التذكرة' : '⚠️ Confirm Ticket Closure')
        .setDescription(lang === 'ar' ? 'هل أنت متأكد من إغلاق هذه التذكرة؟' : 'Are you sure you want to close this ticket?')
        .setColor('RED')
        .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

    await interaction.reply({ embeds: [embed], components: [ticketUA] });

    const filter = i => i.user.id === interaction.user.id;
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

    collector.on('collect', async i => {
        if (i.customId === 'confirm_close') {
            // Get ticket owner ID and decrease their ticket count
            const userId = db.get(`ticket_owner_${interaction.channel.id}`);
            if (userId) {
                db.subtract(`tickets_${userId}`, 1);
            }

            // Send closure message
            const closureEmbed = new MessageEmbed()
                .setColor('Green')
                .setTitle(lang === 'ar' ? '🔒 تم إغلاق التذكرة' : '🔒 Ticket Closed')
                .setDescription(lang === 'ar' ? `تم إغلاق التذكرة بواسطة ${interaction.user}` : `Ticket closed by ${interaction.user}`)
                .setTimestamp();

            await i.update({ embeds: [closureEmbed], components: [] });

            // Clean up database
            db.delete(`ticket_owner_${interaction.channel.id}`);

            // Archive channel
            setTimeout(() => {
                interaction.channel.delete()
                    .catch(console.error);
            }, 5000);
        } else if (i.customId === 'cancel_close') {
            await i.update({
                content: lang === 'ar' ? '❌ تم إلغاء إغلاق التذكرة' : '❌ Ticket closure cancelled',
                embeds: [],
                components: []
            });
        }
    });

    collector.on('end', collected => {
        if (collected.size === 0) {
            interaction.editReply({
                content: lang === 'ar' ? '❌ انتهى وقت التأكيد' : '❌ Confirmation timeout',
                embeds: [],
                components: []
            });
        }
    });
};
