var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    world: String
  }
`);
var obj1 = {
      hello:"hai",
      world :"bye",
      ok : "okayOkay"
    }
var root = {hello,world} = obj1 ;

graphql(schema, '{ hello,world }', root).then((response) => {
  console.log(response);
});