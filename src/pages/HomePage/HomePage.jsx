import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api/movie-api.js';
import MovieList from '../../components/MovieList/MovieList.jsx';

const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await getTrendingMovies();
                setTrendMovies(data);
            } catch (error) {
                setError(true);
                console.log('error');
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <div>
            <h1>Trending movies</h1>
            {isLoading && <p>loading...</p>}
            {error && <p>error</p>}
            {trendMovies.length > 0 && <MovieList movies={trendMovies} />}
        </div>
    )
}

export default HomePage