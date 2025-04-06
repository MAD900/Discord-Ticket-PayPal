const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const config = require(`../config.js`);
const language = require('./Addons/language.js')[config.language]
const fs = require('fs');
const path = require('path');

module.exports = async (payment, interaction, client) => {
    try {
        // Create success embed
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(language.payment_success)
            .setDescription(language.payment_details
                .replace('{amount}', payment.amount)
                .replace('{invoice}', payment.id))
            .addFields(
                { name: language.payment_status, value: payment.status, inline: true },
                { name: language.payment_date, value: new Date().toLocaleString(), inline: true }
            )
            .setFooter({ text: interaction.user.tag, iconURL: interaction.user.avatarURL() });

        // Log payment details
        const logEntry = `[${new Date().toISOString()}] Payment Success - Invoice: ${payment.id}, Amount: ${payment.amount}, User: ${interaction.user.tag}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/payments.txt'), logEntry);

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing payment:', error);
        
        // Log error
        const errorLog = `[${new Date().toISOString()}] Payment Error - ${error.message}\n`;
        fs.appendFileSync(path.join(__dirname, '../logs/paypal_errors.txt'), errorLog);

        await interaction.reply({
            content: language.payment_error,
            ephemeral: true
        });
    }
};
