import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { moviesSelector, movieUpdateForViews, updateList } from '../redux/movies/moviesSlice'


function MovieSearch() {

    const dispatch = useDispatch();
    const movieList = useSelector(moviesSelector.selectAll);

    const { searchInput } = useParams();

    const handleClick = (mov) => {
        //For DOM
        dispatch(updateList({ id: mov.id, changes: { views: mov.views + 1 } }));
        //For DB
        dispatch(movieUpdateForViews(mov))
    }

    return (
        <article>
            <div className='movie-list p-2'>
                <div className='movie-list-header p-3 mb-3'>
                    <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Aranan Kelime: {searchInput} </h6>
                </div>
                <div className='row col-md-12'>
                    <div className='items row d-flex justify-content-start   m-auto'>
                        {movieList.filter((mov) =>
                            mov.name.toLowerCase().includes(searchInput.toLowerCase()) || mov.orginalName.toLowerCase().includes(searchInput.toLowerCase()))
                            .map((movie) => (
                                <Link key={movie.id} to={`/${movie.name.toLowerCase().replace(/ /g, "-")}`} onClick={() => handleClick(movie)} className='movie-item col  d-flex flex-wrap align-items-center'>
                                    <div className='text-align-left'>
                                        <div style={{ position: "relative" }}>
                                            <img className='movie-banner-sm' alt='movie-banner' src={movie.image} />
                                            <img className='lang-flag' src={movie.flag} alt='lang-flag-tr' />
                                            <img className='res-flag' style={{ backgroundColor: "rgba(1,1,1,0.8)" }} src={require(`../images/${movie.quality}.png`)} alt='res-flag' />
                                        </div>
                                        <h5 style={{ marginTop: "0.5rem", fontSize: "1rem" }}>{movie.name}</h5>
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


export default MovieSearch
