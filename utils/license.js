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

const axios = require('axios');
const crypto = require('crypto');
const os = require('os');
const { license } = require('../config.js');

class LicenseManager {
    constructor() {
        this.isValid = false;
        this.lastCheck = null;
        this.checkInterval = 12 * 60 * 60 * 1000; // Check every 12 hours
    }

    async verifyLicense() {
        try {
            const response = await axios.post('https://api.madservices.net/license/verify', {
                key: license.key,
                product: license.product,
                version: license.version,
                hwid: await this.getHWID(),
                timestamp: Date.now()
            });

            if (response.data.success) {
                this.isValid = true;
                this.lastCheck = Date.now();
                return true;
            }
            
            this.showError(response.data.message || 'License key is not valid');
            return false;
        } catch (error) {
            this.showError('Unable to verify license. Check your connection');
            return false;
        }
    }

    async getHWID() {
        const systemInfo = {
            hostname: os.hostname(),
            platform: os.platform(),
            release: os.release(),
            cpus: os.cpus().length,
            totalMem: os.totalmem()
        };
        return crypto.createHash('sha256').update(JSON.stringify(systemInfo)).digest('hex');
    }

    showError(message) {
        console.error(`
╔════════════════════════════════════════════╗
║             Invalid License Key            ║
║                                           ║
║  Please purchase a valid license from:     ║
║  https://discord.gg/ZSt4byYbQZ            ║
║                                           ║
║  Your license key may be:                 ║
║  • Invalid or incorrect                   ║
║  • Expired                               ║
║  • Used on another machine               ║
║  • Revoked                              ║
║                                           ║
║  Contact 𝗠𝗔𝗗𝟬𝟬 for support              ║
╚════════════════════════════════════════════╝

Error: ${message}
`);
    }

    async validateOrExit() {
        // Check if enough time has passed since last check
        if (this.lastCheck && Date.now() - this.lastCheck < this.checkInterval) {
            return this.isValid;
        }

        const isValid = await this.verifyLicense();
        if (!isValid) {
            process.exit(1);
        }
        return true;
    }
}

module.exports = new LicenseManager();
