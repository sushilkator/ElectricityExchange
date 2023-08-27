const rp = require('request-promise');

const GITHUB_API_BASE_URL = 'https://api.github.com';

const gitProjectList = async (name) => {
    const options = {
        method: 'GET',
        uri: `${GITHUB_API_BASE_URL}/search/repositories`,
        qs: {
            q: name
        },
        json: true,
        headers: {
            'user-agent': 'node.js'
        }
    };

    try {
        return await rp(options);
    } catch (error) {
        console.error(`Error fetching repositories for keyword: ${name}`, error.message);
        throw error;
    }
};

module.exports = gitProjectList;
