import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api/movie-api.js';

const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = getTrendingMovies();
                setTrendMovies(data);
                console.log(data);
            } catch (error) {
                setError(true);
                console.log('error');
            } finally {
                setIsLoading(false);
                console.log('finally');
            }
        }
        getData();
    }, []);

    return (
        <div>
            {isLoading && <p>loading...</p>}
            {error && <p>error</p>}
            {trendMovies.length > 0 && trendMovies.map((movie) => (
                <div key={movie.id}>
                    <p>{movie.title}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage