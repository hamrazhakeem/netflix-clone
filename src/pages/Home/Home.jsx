import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ${process.env.REACT_APP_API_KEY}'
    }
  };

  const fetchRandomMovie = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const handlePlayClick = (movieId) => {
    navigate(`/player/${movieId}`);
  };

  return (
    <div className='home'>
      <Navbar />
      {randomMovie && (
        <div className="hero">
          <img src={`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`} alt={randomMovie.title} className='banner-img' />
          <div className="hero-caption">
            <h1 className='movie-title'>{randomMovie.title}</h1>
            <div className="hero-btns">
              <button className='btn' onClick={() => handlePlayClick(randomMovie.id)}><img src={play_icon} alt="Play" />Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt="More Info" />More Info</button>
            </div>
            <TitleCards/>
          </div>
        </div>
      )}
      <div className="more-cards">
        <TitleCards title={'Your Next Watch'} category={"top_rated"} />
        <TitleCards title={'New on Netflix'} category={"popular"} />
        <TitleCards title={'Top Searches'} category={"upcoming"} />
        <TitleCards title={"Today's Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  )
}

export default Home;
