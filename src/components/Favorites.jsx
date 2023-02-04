import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { moviesSelector } from '../redux/movies/moviesSlice';
import { getFavorites, removeFavorite, removeFavoriteDB, usersSelector } from '../redux/users/usersSlice';

export default function Favorites() {
    const dispatch = useDispatch();
    const userID = JSON.parse(localStorage.getItem("userID"));
    const movieList = useSelector(moviesSelector.selectAll);
    const userFavorites = useSelector((state) => state.users.userFavorites);

    useEffect(() => {
        dispatch(getFavorites(userID));
    },[])

    const handleRemoveFav = (movieName) => {
        dispatch(removeFavorite(movieName));
        dispatch(removeFavoriteDB([userID,movieName]));
    }

    return (
        <div className='container favorites '>
            <div className='mv-header-ms p-3 '>
                <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Favori Filmlerim</h6>
            </div>
            <div className='mv-body pb-3'>
                {userFavorites.length === 0 ?
                    <div className="alert alert-warning" role="alert">
                        Favori listenizde henüz hiçbir film yok!
                    </div>
                    :
                    movieList.filter((mv) => userFavorites.includes(mv.name)).map((mov,ind) => (
                        <a key={mov.id} href="#/" className='row list-side ps-3 pe-3 mb-1'>
                            <div className='rank-list col-1 ms-2'>{ind + 1}.</div>
                            <div className='body-list col-9 d-flex justify-content-between'>
                                <div className='body-list-info ms-2 d-flex '>
                                    <div className='body-list-img me-3'>
                                        <img className='list-img' alt='logo' src={mov.image} />
                                    </div>
                                    <div>
                                        <h6 className='mv-movie-header'>{mov.name.length > 20 ? mov.name.slice(0, 20) + "..." : mov.name} ({mov.year})</h6>
                                        <small>
                                            <span><i className="fa-solid fa-eye me-1"></i>{mov.views}</span>
                                            <span><i className="fa-solid fa-star ms-3 me-1"></i>{mov.imdbRating}</span>
                                            <span><i className="fa-solid fa-comment ms-3 me-1"></i>{mov.comments.length}</span>
                                        </small>
                                    </div>
                                </div>
                                <div>
                                    <button className='btn btn-danger' onClick={() => handleRemoveFav(mov.name)}>Kaldır</button>
                                </div>
                            </div>
                            <div>
                            </div>
                        </a>
                    ))
                }


            </div>
        </div>
    )
}   
