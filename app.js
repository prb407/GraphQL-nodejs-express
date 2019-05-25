const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./src/graphql/schema/index')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 9334

app.use('/graphql',expressGraphQL({
    schema,
    graphiql:true
}))

app.listen(port,()=>console.log(`listening on ${port}`))