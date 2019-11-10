const gitProjectList = require('./gitProjectSearch');
const util = require('./util');
const keyword = process.env.keyword || 'Reactive';
const getReactiveProjectList = async (keyword) => {
    const gitProjects = await gitProjectList(keyword);
    if (gitProjects.total_count === 0) {
        console.log(`Git project does not exist for "${keyword}" word`);
        return [];
    }
    let projectList = gitProjects.total_count < 11 ? gitProjects.items : gitProjects.items.slice(0, 10);
    let projectInfo = projectList.map(d=>{return util.extractProjectInfo(d)});
    let tweetList = await util.tweets(projectList);
    let list = tweetList.map(d=>{return util.extractTweetInfo(d)});
    projectInfo.forEach((e,i )=> {
        projectInfo[i].tweets = list[i];
    });
    return projectInfo;
}
getReactiveProjectList(keyword).then((res)=>{
    console.log(res);
    util.writeData(JSON.stringify(res));
}).catch((err) => {
    console.log('Something went wrong', err);
});

// try {
//     getReactiveProjectList();
// } catch(e){

// }

