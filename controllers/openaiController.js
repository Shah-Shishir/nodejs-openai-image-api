const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const generateImages = async (req, res) => {
    let { prompt, n, size } = req.body;

    size = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    if (n > 3) {
        res.status(400).json({ message: 'Maximum number of images exceeded.' });
    }

    try {
        const response = await openai.createImage({
            prompt,
            n,
            size
        });

        res.status(200).json({ data: response.data, message: 'Image generation is successful.' });
    } catch (err) {
        res.status(400).json({ message: 'Unable to generate desired image(s).' });
    }
};

module.exports = {
    generateImages
};