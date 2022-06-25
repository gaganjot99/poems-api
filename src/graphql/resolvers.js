module.exports = {
    Query: {
        poem(_, {input}, {poemdata}){
            console.log("something came")
            return poemdata.findOne({name: input}).exec()
        },
        allpoems(_, {input}, {poemdata}){
            var type = {}
            if(!input.type){
              type = { $in: ["poem", "story"]}
            }
            else{
                type = {$in: [input.type]}
            }
            if(input.name && input.author){
                return poemdata.find({name: input.name, author: input.author, type: type}).exec()
            }
            else if(input.name && !input.author){
                return poemdata.find({name: input.name, type: type}).exec()
            }
            else if(!input.name && input.author){
                return poemdata.find({author: input.author, type: type}).exec()
            }
            else {
                return poemdata.find({type: type}).exec()
            }
            
        },
        async allauthors(_, __, {poemdata}){
            const authors = await poemdata.find().distinct("author").exec()
            console.log(authors)
            return authors.map((item)=>{
               return {name: item}
            })
        },
    },

    Author: {
        poems(author, __, {poemdata}){
             return poemdata.exists({author: author.name, type: "poem"}).then(exists=>{
                if(exists){
                    return true
                }
                return false
            })
        },
        stories(author, __, {poemdata}){
            return poemdata.exists({author: author.name, type: "stories"}).then(exists=>{
                if(exists){
                    return true
                }
                return false
            })
        },
        content(author, __, {poemdata}){
            return poemdata.find({author: author.name}).select({name: 1}).limit(5).lean().then(info=>{
                return info.map(item=>{
                    return item.name
                })
            })
        }
    },

    Mutation: {
        addcontent(_, {input}, {poemdata}){
            return poemdata.create(input)
        }
    }
}