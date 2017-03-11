const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({ // 1.
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType), // en lista med Users.
      resolve(parentValue, args){
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }
    }
  })
});


//
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString},
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // obs, här kommer vi inte åt args, utan vi får data från parent (RootQuery)
        //console.log(parentValue, args);
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
         .then(res => res.data);
      }
    }
  })
});

// entry point into our graph/data.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } }, // arg som vi kommer åt i arg i resolvfunktionen.
      resolve(parentValue, args) {
        // hämtade data från en extern json-server.
        // axios retunerar { data: {firstName: bill } }
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString} },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});


// 1. vi tar och omsluter fields objectet med en fat arrow function därför
// vi har med UserType och den har inte skapas ännu. closure.
