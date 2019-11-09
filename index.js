const gitProjectList = require('./gitProjectSearch');
const twitList = require('./searchTweet');
const async = require('async');
const util = require('./util');
const getReactiveProjectList = async () => {
    const gitProjects = await gitProjectList('Reactive');
    if (gitProjects.total_count === 0) {
        console.log(`Git project does not exist for "${searchKeyword}" word`);
        return;
    }
    let projectList = gitProjects.total_count < 11 ? gitProjects.items : gitProjects.items.slice(0, 10);
    let allProjectTweets = [];
    projectList.forEach(async (element) => {
        let projectInfo = util.extractProjectInfo(element);
        let list = await twitList(element.name);
        projectInfo.tweets = util.extractTweetInfo(list);
        allProjectTweets.push(projectInfo);
        console.log(allProjectTweets);
        util.writeData(JSON.stringify(allProjectTweets));
        // check file for actual result
    });
    


}
getReactiveProjectList().catch((err) => {
    console.log('Something went wrong', err);
});
// try {
//     getReactiveProjectList();
// } catch(e){

// }

