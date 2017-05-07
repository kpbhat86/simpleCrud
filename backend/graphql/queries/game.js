import {GraphQLID, GraphQLNonNull, GraphQLList} from 'graphql';

import {gameType} from '../types';
import gameModel from '../../models/game';

const FindByGame = {
  type: gameType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params){
    return gameModel.findById(params.id).exec();
  }
}

const FindAllGames = {
  type: new GraphQLList(gameType),
  resolve() {
    const games = gameModel.find().exec();
    if(!games){
      throw new Error('Error fetching all games');
    }
    return games;
  }
}

export default {
  FindByGame,
  FindAllGames
}
