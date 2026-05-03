const geminiService = require('../services/geminiService');
const whatsappService = require('../services/whatsappService');

exports.handleIncomingMessage = async (req, res) => {
  try {
    // Twilio sends the message body in req.body.Body
    const incomingMsg = req.body.Body;
    const sender = req.body.From; // The user's WhatsApp number

    console.log(`Received message from ${sender}: ${incomingMsg}`);

    if (!incomingMsg) {
      return res.status(200).send('No message provided');
    }

    // 1. Process the text with Gemini AI
    const aiResponse = await geminiService.generateResponse(incomingMsg);
    
    console.log(`AI Response: ${aiResponse}`);

    // 2. Send the response back via Twilio
    await whatsappService.sendMessage(sender, aiResponse);

    // Twilio expects a 200 OK response
    res.status(200).send('Message processed successfully');
  } catch (error) {
    console.error('Error handling WhatsApp message:', error);
    res.status(500).send('Internal Server Error');
  }
};
