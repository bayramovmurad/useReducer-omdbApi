// actions.js
export const SET_LOADING = "SET_LOADING";
export const SET_DATA = "SET_DATA";
export const SET_FILTERED_DATA = "SET_FILTERED_DATA";
export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setLoading = (loading) => ({ type: SET_LOADING, loading });
export const setData = (data) => ({ type: SET_DATA, data });
export const setFilteredData = (filteredData) => ({ type: SET_FILTERED_DATA, filteredData });
export const setSearchTerm = (searchTerm) => ({ type: SET_SEARCH_TERM, searchTerm });
