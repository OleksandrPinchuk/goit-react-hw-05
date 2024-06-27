import { useSearchParams } from 'react-router-dom';
import { getSearchedFilm } from '../../api/movie-api.js';
import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import css from './MoviesPage.module.css';

const MoviesPage = () => {

    const [params, setParams] = useSearchParams();
    const query = params.get('query') || '';
    const [inputValue, setInputValue] = useState(query);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (query) {
                try {
                    setIsLoading(true);
                    const data = await getSearchedFilm(query);
                    setMovies(data);
                } catch (error) {
                    console.log('error')
                    setError(true);
                } finally {
                    setIsLoading(false);
                    
            }
            }
        };
        getData();
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setParams({ query: inputValue })
    };

    const handleChange = (event) => {
        setInputValue(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={css.form}>
                <input type="text" name="query" value={inputValue} placeholder='Search movies' onChange={handleChange} className={css.input} />
                <button type="submit" className={css.button}>Search</button>
            </form>
            {isLoading && <p>loading...</p>}
            {error && <p>error</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </div>
    )
}

export default MoviesPage