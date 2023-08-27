const fs = require('fs').promises;
const twitList = require('./searchTweet');

const extractProjectInfo = ({ name, full_name, description }) => ({
    projectName: name,
    projectFullName: full_name,
    projectDescription: description,
    tweets: []
});

const extractTweetInfo = (data) => 
    data.statuses.map(({ user, text, created_at }) => ({
        name: user.name,
        text,
        date: created_at
    }));

const writeData = async (data) => {
    try {
        await fs.writeFile("tweets.json", data);
        console.log("To see final results, check 'tweets.json' file!");
    } catch (err) {
        console.error("Error writing to 'tweets.json'", err);
    }
};

const tweets = async (list) => {
    const promises = list.map(project => twitList(project.name));
    try {
        return await Promise.all(promises);
    } catch (err) {
        console.error("Error fetching tweets for the projects", err);
        throw err;
    }
};

module.exports = {
    extractProjectInfo,
    extractTweetInfo,
    writeData,
    tweets
};
