/** ========== ACTIONS ==========
 * Выполнение экшен. Работа с сайд эффектами
 */

import { URL_SERVER } from '../../config/constants';
import { PLAYER } from '../../constants/player';

export async function ACTION__PLAYERS__GET_ALL_PLAYERS() {
  const URL = `${URL_SERVER}/api/player/all`;

  try {
    const response = await fetch(URL, { method: 'GET' });
    const json: [] = await response.json();
    const players = json.reduce((acc: any, cur: any) => {
      const player: any = { ...PLAYER };
      Object.keys(PLAYER).forEach((property) => {
        player[property] = cur[property] || null;
      });

      return { ...acc, [cur._id]: player };
    }, {});

    MUTATION__PLAYERS__SET_ALL_PLAYERS(players);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ACTION__PLAYERS__GET_PLAYER_BY_ID(id: string) {
  // TODO: reserved
}

export async function ACTION__PLAYERS__DELETE_PLAYER(id: string) {
  const URL = `${URL_SERVER}/api/player/${id}`;

  try {
    await fetch(URL, { method: 'DELETE' });
    await ACTION__PLAYERS__GET_ALL_PLAYERS();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ACTION__PLAYERS__CREATE_PLAYER(player?: any) {
  const URL = `${URL_SERVER}/api/player/create`;
  if (!player) {
    player = { ...PLAYER };
  }

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ player }),
    });
    const createdPlayer = await response.json();

    await ACTION__PLAYERS__GET_ALL_PLAYERS();

    return { id: createdPlayer._id, player: createdPlayer };
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ACTION__PLAYERS__UPDATE_PLAYER(id: string, player: any) {
  const URL = `${URL_SERVER}/api/player/update`;

  try {
    await fetch(URL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ id, player }),
    });

    await ACTION__PLAYERS__GET_ALL_PLAYERS();
  } catch (error) {
    console.error('Error:', error);
  }
}

/** ========== MUTATIONS ==========
 * Обновление localStorage
 */

function MUTATION__PLAYERS__SET_ALL_PLAYERS(players: any) {
  localStorage.setItem('players', JSON.stringify(players));
}

/** ========== GETTERS ==========
 * Получение данных из localStorage
 */

export function GETTER__PLAYERS__GET_ALL_PLAYERS() {
  const json: any = localStorage.getItem('players') || null;
  const players = JSON.parse(json);
  return players;
}

export function GETTER__PLAYERS__GET_PLAYER_BY_ID(id: any) {
  const json: any = localStorage.getItem('players') || null;
  const players = JSON.parse(json);
  return players[id] || null;
}
