const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const client = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_ACCOUNT_SID !== 'your_twilio_sid_here'
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

exports.sendMessage = async (to, message) => {
  try {
    if (!client) {
      console.log(`[MOCK WHATSAPP] To: ${to} | Message: ${message}`);
      return;
    }

    const from = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // default twilio sandbox
    
    await client.messages.create({
      body: message,
      from: from,
      to: to
    });
    
    console.log(`WhatsApp message sent to ${to}`);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
