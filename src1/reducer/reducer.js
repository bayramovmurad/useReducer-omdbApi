// reducer.js
import {
    SET_LOADING,
    SET_DATA,
    SET_FILTERED_DATA,
    SET_SEARCH_TERM,
} from "./action";

const reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: action.loading };

        case SET_DATA:
            return { ...state, data: action.data };

        case SET_FILTERED_DATA:
            return { ...state, filteredData: action.filteredData };

        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.searchTerm };

        default:
            return state;
    }
};

export default reducer;
