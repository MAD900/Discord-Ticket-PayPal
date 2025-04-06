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

const paypal = require('@paypal/checkout-server-sdk');

exports.createInvoice = (amount, currency, description) => {
    return {
        "intent": "CAPTURE",
        "purchase_units": [{
            "amount": {
                "currency_code": currency,
                "value": amount
            },
            "description": description
        }],
        "application_context": {
            "brand_name": "MAD Services",
            "landing_page": "NO_PREFERENCE",
            "user_action": "PAY_NOW",
            "return_url": "https://discord.gg/ZSt4byYbQZ",
            "cancel_url": "https://discord.gg/ZSt4byYbQZ"
        }
    };
};

exports.createPayPalClient = (config) => {
    let environment;
    if (config.paypal.mode === 'live') {
        environment = new paypal.core.LiveEnvironment(
            config.paypal.clientId,
            config.paypal.clientSecret
        );
    } else {
        environment = new paypal.core.SandboxEnvironment(
            config.paypal.clientId,
            config.paypal.clientSecret
        );
    }
    return new paypal.core.PayPalHttpClient(environment);
};
