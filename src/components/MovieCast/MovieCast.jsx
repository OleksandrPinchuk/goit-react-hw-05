import { useEffect, useState } from 'react';
import { getCast } from '../../api/movie-api.js';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getCast(movieId);
                setCast(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [movieId]);

    return (
        <div>
            <h3>Cast</h3>
            <ul>
                {cast.length > 0 && cast.map(actor => (
                    <li key={actor.id}>
                        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                        <h4>{actor.name}</h4>
                        <p>{actor.character}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default MovieCast