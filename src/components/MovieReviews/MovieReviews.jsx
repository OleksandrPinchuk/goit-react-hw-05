import { useEffect, useState } from "react";
import { getReviews } from '../../api/movie-api.js';
import { useParams } from "react-router-dom";
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx'

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReviews(movieId);
                setReviews(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [movieId])

    return (
        <div>
            <h3>Reviews</h3>
            <ul>
                {reviews.length > 0 ? reviews.map(review => (
                    <li key={review.id}>
                        <h4>A review by {review.author}</h4>
                        <p>{review.content}</p>
                    </li>
                ))
                : <NotFoundPage/>}
            </ul>
        </div>
    )
}

export default MovieReviews