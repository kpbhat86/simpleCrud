import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList
} from 'graphql';

import gameModel from '../../models/game.js';

export const gameType = new GraphQLObjectType({
  name: 'Game',
  description: 'Game api',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    title: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    price: {
      type: GraphQLString
    },
    year: {
      type: GraphQLString
    },
    cover: {
      type: GraphQLString
    }
  })
})

export const gameInputType = new GraphQLInputObjectType({
  name: 'gameInput',
  description: 'Insert game',
  fields: () => ({
    title: {
      type: GraphQLString
    },
    company: {
      type: GraphQLString
    },
    price: {
      type: GraphQLString
    },
    year: {
      type: GraphQLString
    },
    cover: {
      type: GraphQLString
    }
  })
})
