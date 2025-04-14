# Discord Ticket System with PayPal Integration

A powerful Discord bot that manages support tickets with PayPal integration for handling payments. Created by [MADX900](https://github.com/MADX900).

## Features

- 🎫 Advanced ticket management system
- 💳 PayPal integration for payments
- 🌐 Multi-language support (Arabic & English)
- 🔒 Secure payment processing
- 📊 Custom ticket categories
- 🛠️ Configurable settings
- 💬 Auto-responses and custom messages

## Setup

1. Install Node.js from [nodejs.org](https://nodejs.org/)
2. Clone this repository
3. Install dependencies:
```bash
npm install
```
4. Configure the `.env` file with:
```env
# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_SECRET=your_client_secret_here
PAYPAL_EMAIL=your_paypal_email_here

# Discord Bot Configuration
DISCORD_TOKEN=your_bot_token_here
```

5. Modify `config.js` with your settings:
   - Set up ticket categories
   - Configure manager IDs
   - Customize messages
   - Set up products and prices

6. Run the bot:
```bash
npm start
```

## Configuration

### Ticket Categories
You can configure multiple ticket categories in `config.js`:
- Support tickets
- Product purchase tickets
- Custom categories

### PayPal Integration
- Supports both sandbox and live modes
- QR code payment option
- Configurable tax rates
- Multiple product support

## Support

Need help? Join our Discord server:
[Discord Support Server](https://discord.gg/ZSt4byYbQZ)

## Author

Created by [MAD900](https://github.com/MADX900)

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

All rights reserved MAD Services 2025
