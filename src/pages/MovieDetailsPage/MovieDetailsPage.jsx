import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { getSingleMovie } from '../../api/movie-api.js';
import { useEffect, useState, useRef } from 'react';
import css from './MovieDetailsPage.module.css';

const defaultImg = '<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>';

const MovieDetailsPage = () => {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();
    const { movieId } = useParams();
    const backLinkHref = useRef(location.state ?? '/');
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500/';

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await getSingleMovie(movieId);
                setMovie(data);
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
            <div className={css.button}><Link to={backLinkHref.current} className={css.link}>Go back</Link></div>
            {isLoading && <p>loading...</p>}
            {error && <p>error</p>}
            {movie && (
            <div>
                <div>
                    <h2>{movie.title}</h2>
                </div>
                <div>
                    <img src={ movie.poster_path ? `${baseImgUrl}${movie.backdrop_path}` : defaultImg } />
                </div>
                <div>
                    <h3>Release date</h3>
                    <p>{movie.release_date}</p>
                    <p>User Score: {movie.vote_average}</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Budget</h3>
                    <p>${movie.budget}</p>
                    <h3>Revenue</h3>
                    <p>${movie.revenue}</p>

                    <h3>Genres</h3>
                    <ul>
                        {movie.genres && movie.genres.map((genre) => (
                            <li key={genre.id}>{genre.name}</li>
                            ))}
                    </ul>
                        <h3>Additional information</h3>
                        <div>
                            <nav className={css.box}>
                                <div className={css.button}><Link to={`/movies/${movieId}/cast`} className={css.link}>Cast</Link></div>
                                <div className={css.button}><Link to={`/movies/${movieId}/reviews`} className={css.link}>Reviews</Link></div>
                            </nav>
                            <Outlet/>
                        </div>
                </div>
            </div>)}
        </div>
    )
}

export default MovieDetailsPage