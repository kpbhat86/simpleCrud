import { GraphQLNonNull, GraphQLID } from 'graphql';

import {gameType, gameInputType} from '../types';
import gameModel from '../../models/game';

export const addGame = {
  type: gameType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(gameInputType)
    }
  },
  resolve(root, params){
    const newData = new gameModel(params.data);
    const newGame = newData.save();
    if(!newGame){
      throw new Error('Error inserting game');
    }
    return newGame;
  }
}

export const removeGame = {
  type: gameType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params){
    const oldGame = gameModel.findByIdAndRemove(params.id).exec();
    if(!oldGame){
      throw new Error('Error deleting game');
    }
    return oldGame
  }
}

export const updateGame = {
  type: gameType,
  args: {
    id: {
      name: 'ID',
      type: new GraphQLNonNull(GraphQLID)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(gameInputType)
    }
  },
  resolve(root, params){
    return gameModel.findByIdAndUpdate(params.id, {$set: { ...params.data}})
      .then(data => gameModel.findById(data.id).exec())
      .catch(err => new Error('Cannot update game data'));
  }
}

export default {
  addGame,
  removeGame,
  updateGame
}
