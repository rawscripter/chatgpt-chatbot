 import { ChatGPTAPI } from 'chatgpt'

export default async function handler(req, res) {
    //  check if the request is a POST request
    if (req.method === 'POST') {
        const { message, id } = req.body;

        const api = new ChatGPTAPI({
            apiKey: process.env.CHATGPT
        })
        let chat;
        let systemMessage = "Only answer real state related questions. if user asks a question that is not related to real estate, the bot should respond with a message like:  I'm sorry, I don't understand your question."
        if (!id) {
            chat = await api.sendMessage(message, {
                systemMessage: systemMessage
            })
        } else {
            chat = await api.sendMessage(message, {
                parentMessageId: id,
                systemMessage: systemMessage
            })
        }

        res.json({
            id: chat.id,
            text: chat.text,
            question: message
        });


    }

}
