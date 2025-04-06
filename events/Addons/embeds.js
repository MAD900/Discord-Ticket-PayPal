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
const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js') //don't edit
const config = require('../../config')
const language = require('../Addons/language')[config.language]

const embeds = {
    panel: async function embed(interaction, all) { // قائمة التكتات - tickets menu
        let embed = new MessageEmbed()
            .setTitle(config.panel_embed.title)
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(config.panel_embed.description.replace(`{tickets}`, `${all}`))
            .setColor(config.panel_embed.color)
            .setFooter({ text: interaction.guild.name + ` © ${new Date().getFullYear()}`, iconURL: interaction.guild.iconURL() })
        return embed //don't touch this!
    },

    user_menu: async function embed(interaction) { //قائمة اليوزر - user menu
        let embed = new MessageEmbed()
            .setColor(`YELLOW`)
            .setAuthor({ name: `${language.creator_select}`, iconURL: interaction.guild.iconURL() })
        let ticketUA = new MessageActionRow()
            .addComponents(new MessageButton().setEmoji(`📄`).setLabel(`${language.save}`).setCustomId('StaffX_Options5').setStyle('SECONDARY')) //don't change the customid
            .addComponents(new MessageButton().setEmoji(`🔐`).setLabel(`${language.close}`).setCustomId('StaffX_Options3').setStyle('SECONDARY')) //don't change the customid
            .addComponents(new MessageButton().setEmoji(`⛔`).setLabel(`${language.delete}`).setCustomId('StaffX_Options4').setStyle('SECONDARY')) //don't change the customid
        return ({ embeds: [embed], components: [ticketUA], ephemeral: true }) //don't touch this!
    },

    rate_menu: async function embed(interaction, dataX) { //قائمة التقييم - rate menu
        let menus = []
        menus.push({ emoji: `⭐`, label: `Five Stars - خمس نجوم`, description: 'Click here to rate 5/5', value: `RateX_5` }) //don't change the value
        menus.push({ emoji: `⭐`, label: `Four Stars - أربع نجوم`, description: 'Click here to rate 4/5', value: `RateX_4` }) //don't change the value
        menus.push({ emoji: `⭐`, label: `Three Stars - ثلاث نجوم`, description: 'Click here to rate 3/5', value: `RateX_3` }) //don't change the value
        menus.push({ emoji: `⭐`, label: `Two Stars - نجمتين`, description: 'Click here to rate 2/5', value: `RateX_2` }) //don't change the value
        menus.push({ emoji: `⭐`, label: `One Star - نجمة واحدة`, description: 'Click here to rate 1/5', value: `RateX_1` }) //don't change the value
        const rowX = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('RateTickets')
                    .setPlaceholder(`${interaction.guild.name}`)
                    .addOptions(menus),
            );
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.rate_title.replace(`{target}`, `${dataX.creator.tag}`)}`, iconURL: `${dataX.creator.avatarURL || `https://i.ibb.co/qpnRy3M/image.png`}` })
            .setColor(`YELLOW`)
        return ({ embeds: [embed], components: [rowX], ephemeral: true }) //don't touch this!
    },

    rated: async function embed(interaction, products, claimedby, starsX, file) { //رساله التقييم - rate message
        let embedX = new MessageEmbed()
            .setDescription(` **| Products:** ${products}\n **| Responsible:** ${claimedby}\n **| Stars:** ${starsX}`)
            .setAuthor({ name: interaction.member.user.tag + ` (${interaction.member.id})`, iconURL: interaction.member.user.avatarURL() || `https://i.ibb.co/qpnRy3M/image.png` })
            .setImage("attachment://file.jpg")
            .setColor('YELLOW')
        return ({ embeds: [embedX], files: [file], components: [] }) //don't touch this!
    },

    reminder: async function embed(interaction, target) { //رساله التنبيه - reminder message
        let ticketUAX = new MessageActionRow()
            .addComponents(new MessageButton().setEmoji(`📄`).setLabel(`${interaction.channel.name}`).setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`).setStyle(`LINK`))
        return ({ content: `${language.reminder}\n- <#${interaction.channel.id}>`, components: [ticketUAX] }) //don't touch this!
    },

    private_message: async function embed(interaction, target, content) { //رساله خاصة - private message
        let ticketUAX = new MessageActionRow()
            .addComponents(new MessageButton().setEmoji(`📄`).setLabel(`${interaction.channel.name}`).setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`).setStyle(`LINK`))
        return ({ content: content, components: [ticketUAX] }) //don't touch this!
    },

    basket_first: async function embed(interaction, dataX) { //العربة الإفتراضيه- basket default
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.requestbill.select}`, iconURL: interaction.guild.iconURL() })
            .setColor(`#303434`)
        return (embed) //don't touch this!
    },

    basket_done_auto: async function embed(interaction, dataX, items, total, paypal_url, invoice, err, qr, image) { //العربة لما يطلب الفاتورة - basket when request bill auto
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.requestbill.bill.replace(`{total}`, `${total}`)}`, iconURL: `https://cdn.discordapp.com/attachments/795013504548732938/1095929854538563614/paypal-logo-2120.webp` })
            .setDescription(`**Items:** ${items}\n**Automatic payments:** \n | Paypal invoice: [Invoice#${invoice.number}_Ticket#${dataX.InGuildNum}](${paypal_url}invoice/p/#${invoice.id})\n | Status: UNPAID`)
            .setColor(`BLUE`)
        let ticketAD = new MessageActionRow()
            .addComponents(new MessageButton().setLabel(`${language.paypal.invoiceurl}`).setURL(`${paypal_url}invoice/p/#${invoice.id}`).setStyle('LINK'))
            .addComponents(new MessageButton().setLabel(`${language.paypal.confirm}`).setCustomId(`Check_BillX`).setStyle('SUCCESS'))
            .addComponents(new MessageButton().setLabel(`${language.paypal.cancel}`).setCustomId(`Cancel_BillX`).setStyle('DANGER'))
        obj = { embeds: [embed], components: [ticketAD] }
        if ((!err || qr != false) && image !== null) {
            embed.setThumbnail(`attachment://file.jpg`)
            obj['files'] = [image]
        }
        return (obj) //don't touch this!
    },

    request_invoice: async function embed(interaction, dataX, items, total, paypal_url, invoice, err, qr, image) { //طلب فاتورة من شخص عن طريق الامر - request_invoice from someone /invoice
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.requestbill.bill.replace(`{total}`, `${total}`)}`, iconURL: `https://cdn.discordapp.com/attachments/795013504548732938/1095929854538563614/paypal-logo-2120.webp` })
            .setDescription(`**Items:** ${items}\n**Automatic payments:** \n | Paypal invoice: [Invoice#${invoice.number}_Ticket#${dataX.InGuildNum}](${paypal_url}invoice/p/#${invoice.id})\n | Status: UNPAID`)
            .setColor(`BLUE`)
        let ticketAD = new MessageActionRow()
            .addComponents(new MessageButton().setLabel(`${language.paypal.invoiceurl}`).setURL(`${paypal_url}invoice/p/#${invoice.id}`).setStyle('LINK'))
            .addComponents(new MessageButton().setLabel(`${language.paypal.confirm}`).setCustomId(`2Check_BillX`).setStyle('SUCCESS'))
            .addComponents(new MessageButton().setLabel(`${language.paypal.cancel}`).setCustomId(`2Cancel_BillX`).setStyle('DANGER'))
        obj = { embeds: [embed], components: [ticketAD] }
        if ((!err || qr != false) && image !== null) {
            embed.setThumbnail(`attachment://file.jpg`)
            obj['files'] = [image]
        }
        return (obj) //don't touch this!
    },

    basket_done_manual: async function embed(interaction, dataX, items, total) { //العربة لما يطلب الفاتورة - basket when request bill manual
        menus = [{ emoji: '📝', label: `${language.requestbill.new_order}`, description: `${language.requestbill.new_order_desc}`, value: `Request_neworderX` }]
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.requestbill.bill.replace(`{total}`, `${total}`)}`, iconURL: `https://j.top4top.io/p_21953ftqc1.png` })
            .setDescription(`**Items:** ${items}\n${config.payments}`)
            .setColor(`YELLOW`)
        const rowX = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectX2')
                    .setPlaceholder(`${config.tickets[dataX.InConfigNum].title}`)
                    .addOptions(menus),
            );
        return ({ embeds: [embed], components: [rowX] }) //don't touch this!
    },

    basket_empty: async function embed(interaction, dataX) { //basket empty - العربة فاضيه
        menus = [{ emoji: '📝', label: `${language.requestbill.new_order}`, description: `${language.requestbill.new_order_desc}`, value: `Request_neworderX` }]
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.requestbill.no_item}`, iconURL: interaction.guild.iconURL() })
            .setColor(`#303434`)
        const rowX = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('selectX2')
                    .setPlaceholder(`${config.tickets[dataX.InConfigNum].title}`)
                    .addOptions(menus),
            );
        return ({ embeds: [embed], components: [rowX] }) //don't touch this!
    },

    invoice_paid_basket: async function embed(interaction, total, paypal_url, invoice, items) { //when invoice paid in basket - عند دفع فاتورة العربة
        let ticketAD = new MessageActionRow()
        ticketAD.addComponents(new MessageButton().setLabel(`${language.paypal.invoiceurl}`).setURL(`${paypal_url}invoice/p/#${invoice.id}`).setStyle('LINK'))
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.paypal.totalpaid.replace(`{total}`, `${total}`)}`, iconURL: `https://i.ibb.co/TMkkrHX/380803-paypal-icon.png` })
            .setThumbnail(`https://i.ibb.co/2nN5TXb/gce-Eeg9-Mi.png`)
            .setDescription(`**Items:** ${items}\n**Invoice details:** \n | Link: [Invoice#${invoice.number}](${paypal_url}invoice/p/#${invoice.id})\n | Status: Paid \\✅`)
            .setColor(`BLUE`)
        return ({ embeds: [embed], components: [ticketAD] }) //don't touch this!
    },

    invoice_paid_toperson: async function embed(interaction, total, paypal_url, invoice, items) { //when invoice paid in /invoice - عند دفع فاتورةالأمر
        let ticketAD = new MessageActionRow()
        ticketAD.addComponents(new MessageButton().setLabel(`${language.paypal.invoiceurl}`).setURL(`${paypal_url}invoice/p/#${invoice.id}`).setStyle('LINK'))
        let embed = new MessageEmbed()
            .setAuthor({ name: `${language.paypal.totalpaid.replace(`{total}`, `${total}`)}`, iconURL: `https://i.ibb.co/TMkkrHX/380803-paypal-icon.png` })
            .setThumbnail(`https://i.ibb.co/2nN5TXb/gce-Eeg9-Mi.png`)
            .setDescription(`**Items:** ${items}\n**Invoice details:** \n | Link: [Invoice#${invoice.number}](${paypal_url}invoice/p/#${invoice.id})\n | Status: Paid \\✅`)
            .setColor(`BLUE`)
        return ({ embeds: [embed], components: [ticketAD], files: [] }) //don't touch this!
    },
}

module.exports = embeds
