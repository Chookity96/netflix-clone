import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from './axios'
import requests from './Requests'
import { FaPlay,  } from 'react-icons/fa'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.abs(Math.floor(Math.random() * request.data.results.length - 1))])
        }
        fetchData()
    }, []);

    function truncate(string, num) {
        return string?.length > num ? string.substr(0, num - 1) + "..." : string
    }
    //console.log(movie)
    return (
        <header
            className='banner'
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
            }}>

            <div className="banner__container">
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <h1 className="banner__description">
                    {
                        truncate(movie?.overview, 100)
                    }
                </h1>
                <div className="banner__btns">
                    <div className="banner__btn">
                        <button className="banner__btn--play">
                            <FaPlay className='banner__btn--play--icon' />
                            Play
                        </button>
                    </div>
                    <div className="banner__btn btn--gray">
                        <button className="banner__btn--info">
                            <AiOutlineInfoCircle className='banner__btn--info--icon' />
                            More Info
                        </button>

                    </div>

                </div>

            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner