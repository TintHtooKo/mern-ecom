const fs = require('fs').promises

const removeFile = async(path)=>{
    let fileExist;
    try {
        await fs.access(path)
        fileExist = true
    } catch (error) {
        fileExist = false
    }
    if(fileExist){
        await fs.unlink(path)
    }
}

module.exports = removeFile