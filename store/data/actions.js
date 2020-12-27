import {SET_ALL, SET_FILTERED, SET_ONLY_WITH_ERRORS} from './mutation-types';

/**
*
* @param { function } commit
* @param { array } all
*/
export function setAll({ commit }, { all }) {
    commit(SET_ALL, { all });
}

/**
 *
 * @param { function } commit
 * @param { array } filtered
 */
export function setFiltered({ commit }, { filtered }) {
    commit(SET_FILTERED, { filtered });
}

/**
 *
 * @param { function } commit
 */
export function toggleOnlyWithErrors({ commit }) {
    commit(SET_ONLY_WITH_ERRORS);
}

