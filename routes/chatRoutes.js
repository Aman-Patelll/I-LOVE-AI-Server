const express = require("express");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary");

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("speech.mp3");

router.post("/chat", async (req, res) => {
	const { prompt } = req.body;

	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 1,
			max_tokens: 4000,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		res.status(200).send(response);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in chat api", error: { error } });
	}
});

router.post("/generate/image", async (req, res) => {
	const { prompt } = req.body;

	try {
		const response = await openai.images.generate({
			model: "dall-e-2",
			prompt: prompt,
			n: 2,
			size: "1024x1024",
		});
		console.log(response.data);
		res.status(200).send(response.data);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in chat api", error: { error } });
	}
});

router.post("/generate/audio", async (req, res) => {
	const { prompt } = req.body;

	try {
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: prompt,
		});
		// console.log(speechFile);
		const buffer = Buffer.from(await mp3.arrayBuffer());
		await fs.promises.writeFile(speechFile, buffer);

		const cdb = await cloudinary.v2.uploader.upload(speechFile, {
			resource_type: "auto",
		});
		console.log(cdb);

		res.status(200).send(cdb.url);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error in chat api", error: { error } });
	}
});

// router.post("/chat/image", async (req, res) => {
// 	const { text, image_url } = req.body;

// 	try {
// 		const response = await openai.chat.completions.create({
// 			model: "gpt-4",
// 			messages: [
// 				{
// 					role: "user",
// 					content: [
// 						{
// 							type: "text",
// 							text: { text },
// 						},
// 						{
// 							type: "image_url",
// 							image_url: {
// 								url: { image_url },
// 							},
// 						},
// 					],
// 				},
// 			],
// 			max_tokens: 300,
// 		});

// 		res.status(200).send(response);
// 	} catch (error) {
// 		console.log(error);
// 		res
// 			.status(500)
// 			.json({ message: "Error in chat with api", error: { error } });
// 	}
// });

module.exports = router;
