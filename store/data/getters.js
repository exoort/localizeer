/**
*
*
* @param { DataState } state
* @return { array }
*/
export function all(state) {
    return state.all;
}

/**
 *
 *
 * @param { DataState } state
 * @return { array }
 */
export function filtered(state) {
    return state.filtered;
}

/**
 *
 *
 * @param { DataState } state
 * @return { boolean }
 */
export function onlyWithErrors(state) {
    return state.onlyWithErrors;
}
