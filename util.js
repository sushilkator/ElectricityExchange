const fs = require('fs');


module.exports = {
    extractProjectInfo: (data)=>{
       return {
            projectName: data.full_name,
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
            console.log("The file was saved!");
        }); 
    }
}