const axios = require('axios');

async function updateRedditData() {
    try {
        const redditApiResponse = await axios.get('https://www.reddit.com/reddits.json');
        const reddits = redditApiResponse.data.data.children.map(child => {
            const { display_name, title, banner_img, public_description, description, url } = child.data;
            return { display_name, title, banner_img, public_description, description, url };
        });

        return reddits;
    } catch (error) {
        console.error('Error al actualizar la base de datos con datos de Reddit:', error);
        throw error;
    }
}

module.exports = { updateRedditData };