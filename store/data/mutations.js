import {SET_ALL, SET_FILTERED, SET_ONLY_WITH_ERRORS} from './mutation-types';

export default {
    /**
    *
    * @param { DataState } state
    * @param { array } all
    */
    [SET_ALL](state, { all }) {
        state.all = all;
    },

    /**
     *
     * @param { DataState } state
     * @param { array } filtered
     */
    [SET_FILTERED](state, { filtered }) {
        state.filtered = filtered;
    },

    /**
     *
     * @param { DataState } state
     */
    [SET_ONLY_WITH_ERRORS](state) {
        state.onlyWithErrors = !state.onlyWithErrors;
    },
};
