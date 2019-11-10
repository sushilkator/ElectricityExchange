const fs = require('fs');
const twitList = require('./searchTweet');

module.exports = {
    extractProjectInfo: (data)=>{
       return {
            projectName: data.name,
            projectFullName : data.full_name,
            projectDescription: data.description,
            tweets: []
        }
    },
    extractTweetInfo : (data)=>{
       let list =  data.statuses.map(d => {
            return { name: d.user.name, text: d.text, date: d.created_at };
        });
        return list;
    },
    writeData : (data)=>{
        fs.writeFile("tweets.json", data, (err)=> {
            if(err) {
                 console.log("Some issue with file write");
            }
            console.log("To see final result see 'tweets.json' file !");
        }); 
    },
    tweets : (list)=>{
        let data = list.map(d=>{return twitList(d.name);})
        return Promise.all(data);
    }
}