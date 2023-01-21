const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// Helper Methods
const { validateImageGeneration } = require("../utils/openaiHelpers");

const generateImages = async (req, res) => {
    let { prompt, n, size } = req.body;

    const respose = validateImageGeneration(prompt, n, size);

    if (respose.errors) {
        res.status(400).json({ message: respose.message });
    } else {
        prompt = respose.prompt;
        n = respose.n;
        size = respose.size;
    }

    try {
        const response = await openai.createImage({
            prompt,
            n,
            size
        });

        res.status(200).json({ imageList: response.data.data, message: 'Image generation is successful.' });
    } catch (err) {
        res.status(400).json({ message: 'Unable to generate desired image(s).' });
    }
};

const generateImageVariations = async (req, res) => {
    const payload = new URLSearchParams({
        image: req.files.image,
        n: req.body.n,
        size: req.body.size
    });

    // let { image, n, size } = req.body;

    // if (n > 10) {
    //     res.status(400).json({ message: 'Maximum number of images exceeded.' });
    // }

    // if (!['small', 'medium', 'large'].includes(size)) {
    //     size = 'large';
    // }

    // if (!n) {
    //     n = 1;
    // }

    // if (!size || !size?.length) {
    //     size = '1024x1024';
    // }

    // size = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImageVariation(payload);

        res.status(200).json({ data: response.data.data, message: 'Image variation generation is successful.' });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        res.status(400).json({ message: 'Unable to generate desired image(s).' });
    }
};

module.exports = {
    generateImages,
    generateImageVariations
};