const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const _  = require('lodash')
const axios = require('axios')

// const  = graphql
const CompanyType = new GraphQLObjectType({
    name:'Company',
    fields: () => ({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        email:{ type:GraphQLString },
        user : {
            type: new GraphQLList(UserType),
            resolve(parent,args){
                // console.log(parent.id)
                return axios.get(`http://localhost:3000/company/${parent.companyID}/users`).then(res => res.data).then(data => data)
            }
        }
    }),
    
})

const UserType = new GraphQLObjectType({
    name:'User',
    fields:()=>({
        id:{ type:GraphQLString },
        name:{ type:GraphQLString },
        email:{ type:GraphQLString },
        company : { 
            type:CompanyType, 
            args:{
                id:{ type:GraphQLString } 
            }, 
            resolve(parent,args) {
                console.log(parent,args)
                return axios.get(`http://localhost:3000/company/${parent.companyID}`).then(res => res.data).then(data => data)
            } 
        }
    }),
    
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        user : {
            type : new GraphQLList(UserType),
            resolve(parent,args){
                return axios.get('http://localhost:3000/users').then(res => res.data).then(data => data)
            }
        },
        company : { 
            type:new GraphQLList(CompanyType), 
            args:{
                id:{type:GraphQLString} 
            }, 
            resolve(parent,args) {
                console.log(parent,args)
                return axios.get(`http://localhost:3000/company`).then(res => res.data).then(data => data)
            } 
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addUser : {
            type : UserType,
            args : {
                name: { type : new GraphQLNonNull(GraphQLString) },
                email : { type : new GraphQLNonNull(GraphQLString) },
                companyID : { type : new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent,args){
                return axios.post('http://localhost:3000/users',{ ...args,id:"11" }).then(res=>res.data).then(data=>data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : RootMutation
})