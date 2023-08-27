const Twitter = require('twitter');
const twitterConfig = require('./twitterConfig');

const client = new Twitter(twitterConfig);

const gitTweetList = async (query) => {
    try {
        const tweets = await client.get('search/tweets', { q: query });
        return tweets;
    } catch (error) {
        console.error(`Error fetching tweets for query: ${query}`, error.message);
        throw error;
    }
};

module.exports = gitTweetList;
