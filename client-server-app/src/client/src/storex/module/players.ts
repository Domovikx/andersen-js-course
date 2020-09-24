/** ========== ACTIONS ==========
 * Создаем экшены, работаем с сайд эффектами
 */

import { URL_SERVER } from '../../config/constants';

export async function ACTION__PLAYERS__GET_ALL_PLAYERS() {
  const URL = `${URL_SERVER}/api/player/all`;
  try {
    const response = await fetch(URL, { method: 'GET' });
    const json: [] = await response.json();
    const players = json.reduce((acc: any, cur: any) => {
      const player = {
        number: cur.number || null,
        name: cur.name || null,
        sex: cur.sex || null,
        level: cur.level || null,
        power: cur.power || null,
        class: cur.class || null,
        race: cur.race || null,
        dice: cur.dice || null,
        collar: cur.collar || null,
      };

      return { ...acc, [cur._id]: player };
    }, {});
    MUTATION__PLAYERS__SET_ALL_PLAYERS(players);
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ACTION__PLAYERS__GET_PLAYER_BY_ID(id: string) {}

export async function ACTION__PLAYERS__DELETE_PLAYER(id: string) {}

export async function ACTION__PLAYERS__CREATE_PLAYER(data?: any) {
  console.log('ACTION__PLAYERS__CREATE_PLAYER');

  const URL = `${URL_SERVER}/api/player/create`;
  try {
    await fetch(URL, { method: 'POST' });
    ACTION__PLAYERS__GET_ALL_PLAYERS();
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function ACTION__PLAYERS__UPDATE_PLAYER(id: string, data: any) {}

/** ========== MUTATIONS ==========
 * Может принимать объект. Обновляет localStorage
 */

function MUTATION__PLAYERS__SET_ALL_PLAYERS(players: any) {
  localStorage.setItem('players', JSON.stringify(players));
}

/** ========== GETTERS ==========
 * Достает данные из localStorage
 */

export function GETTER__PLAYERS__GET_ALL_PLAYERS() {
  const json: any = localStorage.getItem('players') || null;
  const players = JSON.parse(json);
  return players;
}