import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { fetchMovies, moviesSelector, updateList, movieUpdateForViews, setSelectedCategory, setSortSetting } from "../redux/movies/moviesSlice";
export default function MovieArchiveList() {

    const dispatch = useDispatch();
    const movieList = useSelector(moviesSelector.selectAll)
    const status = useSelector((state) => state.movies.status);
    const sortSetting = useSelector((state) => state.movies.sortSetting);
    const selectedCategory = useSelector((state) => state.movies.selectedCategory);
    


    if(sortSetting === "id"){
        movieList.sort((a,b) => a.id >= b.id ? -1 : 1)
    }
    else if(sortSetting === "views"){
        movieList.sort((a,b) => a.views >= b.views ? -1 : 1)
    }
    else if(sortSetting === "comments.length"){
        movieList.sort((a,b) => a.comments.length >= b.comments.length ? -1 : 1)
    }
    else if(sortSetting === "imdbRating"){
        movieList.sort((a,b) => a.imdbRating >= b.imdbRating ? -1 : 1)
    }


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMovies());
        }
        dispatch(setSelectedCategory("all"));
        dispatch(setSortSetting("id"));
    },[movieList])

    const handleClick = (mov) => {
        //For DOM
        dispatch(updateList({ id: mov.id, changes: { views: mov.views + 1 } }));
        //For DB
        dispatch(movieUpdateForViews(mov))

    }

    return (
        <article className='col-md-8'>
            <div className='movie-list p-2'>
                <div className='movie-list-header p-3 mb-3'>
                    <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Film Arşivi</h6>
                </div>
                <div className='row col-md-12'>
                    <div className='items row d-flex justify-content-start col-12  m-auto'>
                        {movieList.filter((e) => e.category.indexOf(selectedCategory) >= 0).map((movie) => (
                            <Link key={movie.id} to={`/${movie.name.toLowerCase().replace(/ /g, "-")}`} onClick={() => handleClick(movie)} className='movie-item col col-sm-6 col-lg-3 d-flex flex-column align-items-center'>
                                <div className='text-align-left'>
                                    <div style={{ position: "relative" }}>
                                        <img className='movie-banner-sm' alt='movie-banner' src={movie.image} />
                                        <img className='lang-flag' src={movie.flag} alt='lang-flag-tr' />
                                        <img className='res-flag' style={{ backgroundColor: "rgba(1,1,1,0.8)" }} src={require(`../images/${movie.quality}.png`)} alt='res-flag' />
                                    </div>
                                    <h5 className='text-align-start' style={{ marginTop: "0.5rem", fontSize: "1rem" }}>{movie.name.length > 18 ? movie.name.slice(0,18) + "..." : movie.name}</h5>
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
