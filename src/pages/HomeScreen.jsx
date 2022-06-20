import React from 'react'
import Banner from '../Banner';
import './HomeScreen.css';
import Nav from '../Nav';
import Row from '../Row';
import requests from '../Requests';
import YoutubePlayer from 'react-youtube-player';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav currentPage={true} />

      <Banner />
      {/* <YoutubePlayer
        videoId='_nBlN9yp9R8'
        playbackState='unstarted'
        configuration={
          {
            showinfo: 0,
            controls: 0
          }
        }
      /> */}

      <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  )
}

export default HomeScreen