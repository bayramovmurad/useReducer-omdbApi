import { useEffect, useReducer } from "react";
import reducer from "./reducer/reducer";
import * as actions from "./reducer/action";

const ApiKey = "https://www.omdbapi.com/?s=hollywood&apikey=e7160ab";

const initialState = {
    loading: true,
    data: [],
    filteredData: [],
    searchTerm: "",
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { loading, data, filteredData, searchTerm } = state;

    useEffect(() => {
        (async () => {
            dispatch(actions.setLoading(true));
            try {
                const resp = await fetch(ApiKey);
                const responseData = await resp.json();
                dispatch(actions.setLoading(false));
                dispatch(actions.setData(responseData.Search));
                dispatch(actions.setFilteredData(responseData.Search));
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleClick = () => {
        const filtered = data.filter(
            (movieData) =>
                movieData.Title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        dispatch(actions.setFilteredData(filtered));
        dispatch(actions.setSearchTerm(""));
    };

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <div>
                <input
                    value={searchTerm}
                    onChange={(e) => dispatch(actions.setSearchTerm(e.target.value))}
                    type="text"
                    placeholder="Search Movie"
                />
                <button onClick={handleClick}>Search</button>
            </div>
            {filteredData.map(({ Poster, Title, imdbID }) => {
                return (
                    <div key={imdbID}>
                        <img src={Poster} alt={Title} />
                        <h3>{Title}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
