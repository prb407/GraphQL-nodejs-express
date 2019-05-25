const addUser = ()=>({
    addUser : {
        type : UserType,
        args : {
            name: { type : new GraphQLNonNull(GraphQLString) },
            email : { type : new GraphQLNonNull(GraphQLString) },
            companyID : { type : new GraphQLNonNull(GraphQLString) }
        },
        resolve(parent,args){
            return axios.post('http://localhost:3000/users',{ ...args,id:"123"}).then(res=>res.data).then(data=>data)
        }
    }
})

module.exports.addUser = addUser