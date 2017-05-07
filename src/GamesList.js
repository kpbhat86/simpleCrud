import React from 'react';
import GameCard from './GameCard';
import PropTypes from 'prop-types';

export default function GamesList({ games, deleteGame }) {
  const emptyMessage = (
    <p>There are no games yet in your collection.</p>
  );

  const gamesList = (
    <div className="ui link cards">
      { games.map(game =>
        <GameCard game={game} key={game._id} deleteGame={deleteGame} />)
      }
    </div>
  );

  return (
    <div>
      {games.length === 0 ? emptyMessage : gamesList}
    </div>
  );
}

GamesList.propTypes = {
  games: React.PropTypes.array.isRequired,
  deleteGame: React.PropTypes.func.isRequired
}
