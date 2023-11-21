import React, { useEffect, useReducer } from "react";

const ApiKey = "https://www.omdbapi.com/?s=hollywood&apikey=e7160ab";

const initialState = {
    loading: true,
    data: [],
    filteredData: [],
    searchTerm: "",
};

const reducer = (state = initialState, action) => {
    if (action.type === "SET_LOADING") {
        return { ...state, loading: action.payload };
    }

    if (action.type === "SET_DATA") {
        return { ...state, data: action.payload, filteredData: action.payload };
    }

    if (action.type === "SET_FILTERED_DATA") {
        return { ...state, filteredData: action.payload };
    }

    if (action.type === "SET_SEARCH_TERM") {
        return { ...state, searchTerm: action.payload };
    }

    return state;
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, data, filteredData, searchTerm } = state;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "SET_LOADING", payload: true });
            try {
                const resp = await fetch(ApiKey);
                const jsonData = await resp.json();
                dispatch({ type: "SET_LOADING", payload: false });
                dispatch({ type: "SET_DATA", payload: jsonData.Search });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        const filtered = data.filter(
            (movieData) =>
                movieData.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch({ type: "SET_FILTERED_DATA", payload: filtered });
        dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <div>
                <input
                    value={searchTerm}
                    onChange={(e) =>
                        dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
                    }
                    type="text"
                    placeholder="Search Movie"
                />
                <button onClick={handleClick}>Search</button>
            </div>
            {filteredData.map(({ Poster, Title, imdbID }) => (
                <div key={imdbID}>
                    <img src={Poster} alt={Title} />
                    <h3>{Title}</h3>
                </div>
            ))}
        </div>
    );
};

export default App;
