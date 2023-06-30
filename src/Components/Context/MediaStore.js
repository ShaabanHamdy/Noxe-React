import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let MediaContext = createContext(null);

export default function MediaContexetProvider(props) {
  const [trenedIteams, setTrenedMovie] = useState([]);
  const [trenedPeople, setTrenedPeople] = useState([]);
  const [trenedITvShow, setTrenedITvShow] = useState([]);

  let getTrendingIteams = async (mediaType, callback) => {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=f2afc7f6ffe3b10c3847bde15c6e4db3`
    );

    callback(data.results);
  };

  useEffect(() => {
    getTrendingIteams("movie", setTrenedMovie);
    getTrendingIteams("person", setTrenedPeople);
    getTrendingIteams("tv", setTrenedITvShow);
    
  }, []);

  return (
    <MediaContext.Provider
      value={{ trenedIteams, trenedPeople, trenedITvShow }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}

// export async function searchInput(e) {
//   let value = e.target.value;
//   let { data } =
//     await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f2afc7f6ffe3b10c3847bde15c6e4db3&language=en-US&query=${value}&page=1&include_adult=false
//   `);
//   setTrenedMovie(data.results);
// }
