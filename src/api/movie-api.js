import axios from 'axios';

const access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDk5YmI3N2VjMGQyZmU0ODI4ZGVjOThiMjEwMDlhYSIsInN1YiI6IjY2NzQ4YzA1OTQ1ZjY0NTgxMTZjNTRkYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z-_FfS2l47bZs9C7Jd_puN0y906mNindnRwsvGS-1o';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getTrendingMovies = async () => {
    const { data } = await axios.get('trending/movie/day?language=en-US', {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
        }
    })
    return data.results
};

export const getSingleMovie = async (movieId) => {
    const { data } = await axios.get(`movie/${movieId}?language=en-US`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`,
        }
    })
    return data
}


