import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios'

function Row({ title, fetchURL, isLargeRow = false }) {

    const baseURL = "https://image.tmdb.org/t/p/original/"
    const [movies, setMovies] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            //console.log(request)
            setMovies(request.data.results)
            return request
        }

        fetchData()
    }, [fetchURL]);

    console.log(movies)

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie => (
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <div className="poster">
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                key={movie.id}
                                src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name}
                            />
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