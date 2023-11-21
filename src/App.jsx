import { useEffect, useState } from "react"

const ApiKey = "https://www.omdbapi.com/?s=hollywood&apikey=e7160ab"

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);

  useEffect(() => {
    (
      async () => {
        setLoading(true)
        try {
          const resp = await fetch(ApiKey);
          const data = await resp.json();
          setLoading(false)
          setData(data.Search);
          console.log(data.Search);
          setFilteredData(data.Search);
        } catch (error) {
          console.log(error);
        }
      }
    )()
  }, []);

  const handleClick = () => {
    const filtered = data.filter(movieData => 
      movieData.Title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
      setSearchTerm("")
  }

  if(loading){
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <input value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} type="text" placeholder="Search Movie"/>
        <button onClick={handleClick}>
          Serach
        </button>
      </div>
      {
          filteredData.map(({Poster,Title,imdbID})=>{
            return(
              <div key={imdbID}>
                  <img src={Poster} alt={Title} />
                  <h3>{Title}</h3>
              </div>
            )
          })
      }
    </div>
  )
}
export default App