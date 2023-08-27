const gitProjectList = require('./gitProjectSearch');
const util = require('./util');
const keyword = process.env.keyword || 'Reactive';

const getReactiveProjectList = async (searchKeyword) => {
    const gitProjects = await gitProjectList(searchKeyword);

    if (!gitProjects.total_count) {
        console.log(`No projects found with keyword "${searchKeyword}"`);
        return [];
    }

    const topProjects = gitProjects.items.slice(0, Math.min(gitProjects.total_count, 10));
    const projectInfo = topProjects.map(util.extractProjectInfo);
    const tweetList = await util.tweets(topProjects);

    tweetList.forEach((tweet, index) => {
        projectInfo[index].tweets = util.extractTweetInfo(tweet);
    });

    return projectInfo;
};

(async () => {
    try {
        const projects = await getReactiveProjectList(keyword);
        console.log(projects);
        util.writeData(JSON.stringify(projects));
    } catch (error) {
        console.error('Something went wrong:', error);
    }
})();
