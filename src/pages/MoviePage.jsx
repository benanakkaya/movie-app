import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import PlayerArea from '../components/PlayerArea';
import DescriptionArea from '../components/DescriptionArea';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMovieComments, moviesSelector, setTargetMovie } from '../redux/movies/moviesSlice';
import CommentsArea from '../components/CommentsArea';
import Footer from '../components/Footer';

export default function MoviePage() {

    const dispatch = useDispatch();

    const {name} = useParams();

    const movieList = useSelector(moviesSelector.selectAll);

    const movie = movieList.filter((mov) => mov.name.toLowerCase() === name.replace(/-/g," "));





    return (
        <div>
            <Navbar />
            <PlayerArea movie={movie} />
            <DescriptionArea movie={movie} />
            <CommentsArea movie={movie} />
            <Footer />
        </div>
    )
}
