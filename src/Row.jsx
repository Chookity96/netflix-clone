import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios'
import YouTube from 'react-youtube-player';
import { GiCrossMark } from 'react-icons/gi'

function Row({ title, fetchURL, isLargeRow = false, isLastRow = false }) {

    const baseURL = "https://image.tmdb.org/t/p/original/"
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [showTrailer, setShowTrailer] = useState(false)
    const [currentMovieKey, setCurrentMovieKey] = useState('')
    const [noTrailer, setNoTrailer] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchURL]);


    const fetchMovie = async (id) => {
        const movieURL = `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
        const { data } = await axios.get(movieURL)
        setSelectedMovie(data)
    }
    const selectMovie = async (id) => {
        fetchMovie(id)
    }

    useEffect(() => {
        if(selectedMovie.videos?.results?.length <= 0)
        {
            setNoTrailer(true)
        }   
        else {
            setNoTrailer(false)
        } 
    }, [selectedMovie]);

    const renderTrailer = () => {
        const trailer = selectedMovie.videos?.results?.find(vid => (vid.name === 'Official Trailer' || vid.name === 'Trailer' || vid.type === 'Trailer' || vid.type === 'Clip'))
        return (
            <div className='trailer'>
                <YouTube
                    videoId={trailer.key}
                />
                <GiCrossMark className='crossMark' onClick={() => { setShowTrailer(false); setSelectedMovie({}) }} />
            </div>
        )
    }

    console.log(noTrailer)
    return (
        <div className='row'>
            {
                (selectedMovie.videos?.results?.length > 0 && showTrailer) ? (renderTrailer()) : null
            }
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map((movie, index) => (
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <div key={movie.id} className="poster" onClick={() => { selectMovie(movie.id); setShowTrailer(true);}}>
                                <img
                                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                    key={movie.id}
                                    src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                    onMouseEnter={() => {
                                        setNoTrailer(false);
                                        setCurrentMovieKey(index); // <-- set active index
                                    }}
                                    onMouseLeave={() => {
                                        setNoTrailer(false);
                                        setCurrentMovieKey(''); // <-- set active index
                                    }}
                                />
                                <p
                                    onMouseEnter={() => {
                                        setNoTrailer(false);
                                        setCurrentMovieKey(index); // <-- set active index
                                    }}
                                    hidden={index !== currentMovieKey} // <-- check active index
                                    className={`play-trailer--text ${isLastRow && "reposition-text"}`}
                                    onClick={() => { selectMovie(movie.id); setShowTrailer(true); }}
                                >
                                    {
                                        !noTrailer ? "Click to Play Trailer" : "No Trailer Available"
                                    }
                                    
                                </p>
                                <p>{movie.title || movie.name || movie.original_name || movie.original_title}</p>
                            </div>
                        )
                    ))
                }
            </div>

        </div>
    )
}

export default Row