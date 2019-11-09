const rp = require('request-promise');
const gitProjectList = async (name)=>{
    const options = {
        method: 'GET',  
        url: 'https://api.github.com/search/repositories',
        qs: { q: name},
        json: true,
        headers: {'user-agent': 'node.js'}
    };    
    return rp(options);   
}


module.exports = gitProjectList;