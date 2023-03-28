// import { Configuration, OpenAIApi } from 'openai'
import { ChatGPTAPI } from 'chatgpt'

export default async function handler(req, res) {
    //  check if the request is a POST request
    if (req.method === 'POST') {
        const { message, id } = req.body;

        // res.json({
        //     id: "chatcmpl-6yqKAYvCyAN3XlVWGsKeuR8DzCAC9",
        //     text: "As an AI language model, I don't have feelings, but I'm functioning well. How can I assist you today?",
        //     role: "bot",
        //     question: message
        // });

        // const configuration = new Configuration({
        //     apiKey: "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",
        // });
        // const openai = new OpenAIApi(configuration);
        // openai.createCompletion({
        //     model: "text-davinci-002",
        //     prompt: message,
        // }).then((completion) => {
        //     res.json({
        //         id: completion.data.id,
        //         text: completion.data.choices[0].text,
        //     });
        // }).catch((error) => {
        //     res.json(error);
        // });

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
