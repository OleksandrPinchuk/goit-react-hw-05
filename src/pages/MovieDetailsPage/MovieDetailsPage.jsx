import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getSingleMovie } from '../../api/movie-api.js';
import { useEffect, useRef, useState } from 'react';

const MovieDetailsPage = () => {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
    const { movieId } = useParams();
    console.log(location);
    console.log(movieId);
    const backLinkHref = location.state ?? '/movies';
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await getSingleMovie(movieId);
                setMovie(data);
                console.log(data)
            } catch (error) {
                setError(true);
                console.log('error');
            } finally {
                setIsLoading(false);
            }
        }
        getData()
    }, [movieId])
    
    return (
            <div>
                <Link to={backLinkHref}>Back</Link>
                {isLoading && <p>loading...</p>}
                {error && <p>error</p>}
                {movie && (
                    <div>
                        <h2>{movie.title}</h2>
                        <div><img src={`${baseImgUrl}${movie.backdrop_path}`} /></div>
                        <p>User Score: {movie.vote_average}</p>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                        <h3>Genres</h3>
                        <ul>
                            {movie.genres && movie.genres.map((genre) => (
                                <li key={genre.id}>{genre.name}</li>
                                ))}
                        </ul>
                        <h3>Additional information</h3>
                        <nav>
                            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
                            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
                            <Outlet/>
                        </nav>
                    </div>)}
            </div>
    )
}

export default MovieDetailsPage