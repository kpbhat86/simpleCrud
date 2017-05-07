export const SET_GAMES = 'SET_GAMES';
export const ADD_GAME = 'ADD_GAME';
export const GAME_FETCHED = 'GAME_FETCHED';
export const GAME_UPDATED = 'GAME_UPDATED';
export const GAME_DELETED = 'GAME_DELETED';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setGames(games) {
  return {
    type: SET_GAMES,
    games
  }
}

export function addGame(game) {
  return {
    type: ADD_GAME,
    game
  }
}

export function gameFetched(game) {
  return {
    type: GAME_FETCHED,
    game
  }
}

export function gameUpdated(game) {
  return {
    type: GAME_UPDATED,
    game
  }
}

export function gameDeleted(gameId) {
  return {
    type: GAME_DELETED,
    gameId
  }
}

export function saveGame(data) {
  const AddGameQuery = `mutation{addGame(data:{title:"${data.title}", company:"${data.company}", price:"${data.price}", year:"${data.year}", cover:"${data.cover}"}){_id title company price year cover}}`
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: AddGameQuery,
      headers: {
        "Content-Type": "application/graphql"
      }
    }).then(handleResponse)
    .then(data => dispatch(addGame(data.data.addGame)));
  }
}

export function updateGame(data) {
  const id = JSON.stringify(data._id);
  const updateGameQuery = `mutation{updateGame(id:${id}, data:{title:"${data.title}", company:"${data.company}", price:"${data.price}", year:"${data.year}", cover:"${data.cover}"}){_id title company price year cover}}`
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: updateGameQuery,
      headers: {
        "Content-Type": "application/graphql"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameUpdated(data.data.updateGame)));
  }
}

export function deleteGame(id) {
  const temp = JSON.stringify(id);
  const DeleteGameByIdQuery = `mutation{removeGame(id:${temp}){_id title company price year cover}}`;
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: DeleteGameByIdQuery,
      headers: {
        "Content-Type": "application/graphql"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameDeleted(id)));
  }
}

export function fetchGames() {
  const FetchAllGameQuery = "query{FindAllGames{_id title company price year cover}}";
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: FetchAllGameQuery,
      headers: {
        "Content-Type": "application/graphql"
      }
    }).then(handleResponse)
    .then(data => dispatch(setGames(data.data.FindAllGames)));
  }
}

export function fetchGame(id) {
  const FetchGameByIdQuery = `query{FindByGame(id:"${id}") {_id title company price year cover}}`;
  return dispatch => {
    return fetch('/graphql', {
      method: 'post',
      body: FetchGameByIdQuery,
      headers: {
        "Content-Type": "application/graphql"
      }
    }).then(handleResponse)
    .then(data => dispatch(gameFetched(data.data.FindByGame)));
  }
}
