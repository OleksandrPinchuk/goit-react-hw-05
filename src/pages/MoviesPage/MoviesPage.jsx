import { useSearchParams } from "react-router-dom";
import { getSearchedFilm } from '../../api/movie-api.js';

const MoviesPage = () => {

    const [params, setParams] = useSearchParams();
    const query = params.get('search') || '';
    console.log(query);
    const handleChange = ({target:{value}}) => {
        params.set('search', value);
        setParams(params);
    }

    const handleSearch = async (query) => {
        const data = await getSearchedFilm(query)
        console.log(data);
    }

    return (
        <div>
            <p>MoviesPage</p>
            <p>сторінка пошуку кінофільмів за ключовим словом.</p>
            <label htmlFor="search"></label>
            <input type="text" id="search" onChange={handleChange} />
            <button type="submit" onSubmit={handleSearch}>Search</button>
        </div>
        
    )
}

export default MoviesPage