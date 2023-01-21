const validateImageGeneration = (prompt, n, size) => {
    if (!prompt || !prompt?.length) {
        return ({ 
            errors: true,
            message: 'Image description is empty.' 
        });
    }

    if (prompt.length > 1000) {
        return ({ 
            errors: true,
            message: 'Image description can not have more than 1000 characters.' 
        });
    }

    if (n > 10) {
        return ({ 
            errors: true,
            message: 'Maximum number of images exceeded.' 
        });
    }

    if (!['small', 'medium', 'large'].includes(size)) {
        size = 'large';
    }

    if (!n) {
        n = 1;
    }

    if (!size || !size?.length) {
        size = '1024x1024';
    }

    size = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    return ({ 
        errors: false,
        prompt,
        n,
        size 
    });
};

module.exports = {
    validateImageGeneration
};