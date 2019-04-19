var express = require('express');
var express_graphql = require('express-graphql');
const { ApolloServer } = require('apollo-server');
var { buildSchema } = require('graphql');

// GraphQL Schema

var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    type Course {
        id : Int,
        title : String,
        author : String,
        description : String,
        topic : String,
        url : String
    }
`);

var coursesData = [
    {
        id:1,
        title:'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/node.js/'
    },
    {
        id:2,
        title:'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversary',
        description: 'Learn by example building & deploying real-world Node.js applications from scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/node.js-express-mongodb/'
    },
    {
        id:3,
        title:'JavaScript: Understanding the weird Parts',
        author: 'Anthony Alicea',
        description: 'An Advanced JavaScript course for everyone1 scope clousers, prototypes,this',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript'
    }
]

// ! resolver : we can attach a function which is called 
// !            each time when query our schema is needs to be executed

var getCourse = function(args){
    var id = args.id;
    return coursesData.filter((course) => {
        return course.id == id;
    })[0];
}

var getCourses = function(args){
    if(args.topic){
        var topic = args.topic
        return coursesData.filter((course) => {
            return course.topic == topic;
        })
    }else{
        return coursesData;
    }
}

var updateCourseTopic = function({id,topic}) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter((course) => course.id === id)[0];
}

// Resolvers
var root = {
    course : getCourse,
    courses : getCourses,
    updateCourseTopic: updateCourseTopic
}

//Create an express server and graphql endpoint.
var app = express();
app.use('/graphql',express_graphql({
    schema : schema,
    rootValue: root,
    graphiql : true // tool running on browser
}));


// const server = new ApolloServer({
//     schema : schema,
//     rootValue: root,
//     playground:true,
// });


app.listen(3000,() => {
    console.log('Express graphql Server now running on localhost:3000/graphql')
})


// 1.queries
// 2.mutation
// 3.subscription.