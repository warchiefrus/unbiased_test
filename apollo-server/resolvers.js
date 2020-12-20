import GraphQLJSON from 'graphql-type-json'

export default {
  JSON: GraphQLJSON,

  Query: {
    getAirports: () => {
      return [
        {
          id: '1',
          name: 'Heathrow',
          terminals: ['1', '2', '3', '4', 'not sure']
        },
        {
          id: '2',
          name: 'Gatwick',
          terminals: []
        }
      ]
    }
  },

  Mutation: {
    addTaxiOrder: () => new Date()
  }
}
