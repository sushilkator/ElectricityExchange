const Twitter = require('twitter');
const twitterConfig = require("./twitterConfig");
const client = new Twitter(twitterConfig);
const gitTweetList = async(q) => {
    return new Promise((resolve, reject) => {
        client.get('search/tweets', { q: q }, (error, tweets, response) => {
            if (error)
                reject(error)
            resolve(tweets)
        });
    });
}
module.exports = gitTweetList;
