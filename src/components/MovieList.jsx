import React  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {moviesSelector, updateList, movieUpdateForViews } from "../redux/movies/moviesSlice";


function MovieList() {

    const dispatch = useDispatch();
    const movieList = useSelector(moviesSelector.selectAll  )


    const handleClick = (mov) => {
        //For DOM
        dispatch(updateList({id: mov.id, changes:{views: mov.views+1}}));
        //For DB
        dispatch(movieUpdateForViews(mov))
    }



    return (
        <article>
            <div className='movie-list p-2'>
                <div className='movie-list-header p-3 mb-3'>
                    <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Son Eklenen Filmler</h6>
                </div>
                <div className='row col-md-12'>
                    <div className='items row d-flex justify-content-start col-12  m-auto'>
                        {movieList.sort((a,b) => a.id >= b.id ? -1 : 1).map((movie) => (
                            <Link key={movie.id} to={`/${movie.name.toLowerCase().replace(/ /g,"-")}`} onClick={() => handleClick(movie) } className='movie-item col col-sm-6 col-lg-3 d-flex flex-column align-items-center'>
                                <div className='text-align-left'>
                                    <div style={{ position: "relative" }}>
                                        <img className='movie-banner-sm' alt='movie-banner' src={movie.image} />
                                        <img className='lang-flag' src={movie.flag} alt='lang-flag-tr' />
                                        <img className='res-flag' style={{backgroundColor:"rgba(1,1,1,0.8)"}} src={require(`../images/${movie.quality}.png`)} alt='res-flag' />
                                    </div>
                                    <h5 style={{marginTop:"0.5rem", fontSize:"1rem"}}>{movie.name.length > 15 ? movie.name.slice(0,15) + "..." : movie.name}</h5>
                                    <h6>{movie.year}</h6>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}


export default MovieList;