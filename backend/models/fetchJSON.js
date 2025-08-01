
module.exports = {
fetchJSON: function(dataset,section=''){
    const data = require(`../data/${dataset}.json`)
    if (section !== ''){
        let sectionData = data[section]

        if (sectionData){
            return sectionData
        }
        return {"message":"Error, no section found"}
    }
    console.log(data)

    return data

        

},



}

