const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const generateImages = async (req, res) => {
    let { prompt, n, size } = req.body;

    if (!prompt || !prompt?.length) {
        res.status(400).json({ message: 'Image description is empty.' });
    }

    if (prompt.length > 1000) {
        res.status(400).json({ message: 'Image description can not have more than 1000 characters.' });
    }

    if (n > 10) {
        res.status(400).json({ message: 'Maximum number of images exceeded.' });
    }

    if (!['small', 'medium', 'large'].includes(size)) {
        res.status(400).json({ message: 'Invalid size.' });
    }

    if (!n) {
        n = 1;
    }

    if (!size || !size?.length) {
        size = '1024x1024';
    }

    size = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            n,
            size
        });

        res.status(200).json({ data: response.data.data, message: 'Image generation is successful.' });
    } catch (err) {
        res.status(400).json({ message: 'Unable to generate desired image(s).' });
    }
};

module.exports = {
    generateImages
};