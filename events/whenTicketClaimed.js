const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require(`../config.js`);
const language = require('./Addons/language.js')[config.language]

module.exports = async (interaction, client) => {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'claim_ticket') return;

    // Check if user has support role
    if (!interaction.member.roles.cache.has(config.tickets[0].managers[0])) {
        return interaction.reply({
            content: language.no_permission,
            ephemeral: true
        });
    }

    // Check if ticket is already claimed
    if (interaction.channel.name.startsWith('claimed-')) {
        return interaction.reply({
            content: language.already_claimed,
            ephemeral: true
        });
    }

    try {
        // Update channel name
        await interaction.channel.setName(`claimed-${interaction.channel.name}`);

        // Hide ticket from others if configured
        if (config.hide_onclaim) {
            await interaction.channel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                }
            ]);
        }

        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(language.claimed_title)
            .setDescription(language.claimed_desc.replace('{user}', interaction.user.toString()))
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error claiming ticket:', error);
        await interaction.reply({
            content: language.claim_error,
            ephemeral: true
        });
    }
};
