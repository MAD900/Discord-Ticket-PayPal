/*
`7MMM.     ,MMF'      db      `7MM"""Yb.   
  MMMb    dPMM       ;MM:       MM    `Yb. 
  M YM   ,M MM      ,V^MM.      MM     `Mb 
  M  Mb  M' MM     ,M  `MM      MM      MM 
  M  YM.P'  MM     AbmmmqMA     MM     ,MP 
  M  `YM'   MM    A'     VML    MM    ,dP' 
.JML. `'  .JMML..AMA.   .AMMA..JMMmmmdP'   
         ( MAD Services جميع الحقوق محفوظه لدى )
            - لك كامل صلاحية التعديل 
*/

const config = {
    debug: true,
    hide_onclaim: false, /* hide ticket from the others when claimed */
    language: 'ar', /* available language: ar or en */
    user_permissions: [`VIEW_CHANNEL`, `SEND_MESSAGES`], /* users permission when open a ticket */
    max_tickets: 1, /* max opened tickets */
    payments: `**Manual payments:** \n | paypal (i1AbdullaHx6754@gmail.com)\n | streamlabs (https://streamlabs.com/i1abdullah/tip)`,

    // Panel Embed Configuration
    panel_embed: {
        nameInButton: true,
        format: '> 「{reaction}」•  {title}',
        title: `🎫 نظام التذاكر`,
        description: `**▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n> \n{tickets}\n> \n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`,
        color: `#0099ff`,
    },

    // PayPal Configuration
    paypal_terms: `Terms and conditions apply.\nYou can't request a refund (digital goods)\nلاتستطيع طلب إسترداد لأي سبب | جميع المُنتجات منتجات رقمية ولايسمح إستبدالها أو إسترجاعها`,
    paypal_mode: process.env.PAYPAL_MODE || "sandbox",
    paypal_client_id: process.env.PAYPAL_CLIENT_ID,
    paypal_client_secret: process.env.PAYPAL_CLIENT_SECRET,
    paypal_qrCode: true,
    paypal_tax: {
        status: true,
        percentage: 3.50, /* paypal tax % */
    },

    pin_emoji: '📌',
    status: {
        status: true,
        format: `{automsg}`,
        automsg: [`MAD Tickets`],
        type: `LISTENING`, /* PLAYING , WATCHING , LISTENING , STREAMING: */
        ms: 10000 /* in ms | 10000 = 10 seconds */
    },

    // Ticket Categories
    tickets: [
        {
            channel_name: `{reaction}Bots_TicketX-{counter}`, /* You can use {reaction} {counter} {username} */
            title: `تذكرة شراء بوت`,
            reaction: `<:logo_new:824505709231079425>`,
            message: `**أهلا وسهلا بك , __{username}__ سيتم مساعدتك من قبل المسؤولين في أقرب وقت مُمكن .\nأشرح طلبك وسيتم الرد عليك بأسرع وقت مُمكن شاكرين لك إنتظارك :rose: .**`,
            managers: [`959298695805947954`],
            products: [
                { n: `بوت نظام التكتات`, p: 26 }, /* n = أسم المنتج | p = سعر المنتج بالدولار */
                { n: `بوت حافظ الرتب`, p: 22 },
            ],
        },

        {
            channel_name: `{reaction}Designs_TicketX-{counter}`,
            title: `تذكرة شراء تصميم`,
            reaction: `🎨`,
            message: `**أهلا وسهلا بك , __{username}__ سيتم مساعدتك من قبل المسؤولين في أقرب وقت مُمكن .\nأشرح طلبك وسيتم الرد عليك بأسرع وقت مُمكن شاكرين لك إنتظارك :rose: .**`,
            managers: [`955204819642114178`],
            products: [
                { n: `بكج دسكورد`, p: 25 },
                { n: `بكج فايف ام`, p: 45 }, 
            ],
        },

        {
            channel_name: `{reaction}{username}-{counter}`,
            title: `تذكرة دعم فني`,
            reaction: `🤖`,
            message: `**أهلا وسهلا بك , __{username}__ سيتم مساعدتك من قبل المسؤولين في أقرب وقت مُمكن .\nأشرح مُشكلتك وسيتم الرد عليك بأسرع وقت مُمكن شاكرين لك إنتظارك :rose: .**`,
            managers: [`955204819642114178`],
            products: [],
        },
    ],

    // Developer Information
    developer: {
        name: "𝗠𝗔𝗗𝟵𝟬𝟬",
        support_server: "https://discord.gg/ZSt4byYbQZ",
        copyright: "All rights reserved MAD Services 2025"
    }
}

module.exports = config
