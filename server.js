var express = require('express');
var express_graphql = require('express-graphql');

var { buildSchema } = require('graphql');

// GraphQL Schema

var schema = buildSchema(`
    type Query {
        message : String,
        akhil : String
    }
`);

// ! resolver : we can attach a function which is called 
// !            each time when query our schema is needs to be executed

var root = {
    message : () => 'Hello World',
    akhil : () => 'pagal'
}

// Create an express server and graphql endpoint.
var app = express();
app.use('/graphql',express_graphql({
    schema : schema,
    rootValue: root,
    graphiql : true // tool running on browser
}));

app.listen(3000,() => {
    console.log('Express graphql Server now running on localhost:3000/grapgql')
})