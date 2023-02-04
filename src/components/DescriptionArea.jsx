import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavorite, fetchUsers, getFavorites, removeFavorite, removeFavoriteDB, setUserFavorites, usersSelector } from '../redux/users/usersSlice';

function DescriptionArea({ movie }) {


    const dispatch = useDispatch();

    const userID = JSON.parse(localStorage.getItem("userID"));

    useEffect(() => {
        dispatch(getFavorites(userID))
    },[])

    const userFavorites = useSelector((state) => state.users.userFavorites);

    const logedin = useSelector((state) => state.users.login);

    const handleAddFav = (movieName) => {
        dispatch(setUserFavorites(movieName));
        dispatch(addFavorite([userID, movieName]))
    }

    const handleRemoveFav = (movieName) => {
        dispatch(removeFavorite(movieName));
        dispatch(removeFavoriteDB([userID,movieName]));
    }

    return (
        <div className='container movie-info pe-2 ps-2 pt-5 pb-5 d-flex'>
            {movie.map((mov) => (
                <div key={mov.id} className='d-flex'>
                    <div className='col-2 p-3 me-5 ps-5 d-none d-lg-block d-xl-block '>
                        <img className='movie-banner-sm' src={mov.image} alt='banner' />
                        {logedin === false ? null :
                            <div>
                                {userFavorites.includes(mov.name) ?
                                    <button onClick={() => handleRemoveFav(mov.name)} className='btn btn-primary btn-delFav mt-2'>Favorilerden Sil</button>
                                    :
                                    <button onClick={() => handleAddFav(mov.name)} className='btn btn-primary btn-addfav mt-2'>Favorilere Ekle</button>
                                }
                            </div>}
                    </div>
                    <div className='col-10 movie-description p-3 pe-0'>
                        <div className='row'>
                            <div className='col-1 d-none d-md-block pt-1 pb-1 ps-2 pe-2 ms-3 me-4'>
                                <div className='m-auto rate-area d-flex flex-column justify-content-center align-items-center ps-2 pe-2'>
                                    <h6 className='movie-page-rate text-center mb-1'>{mov.imdbRating}</h6>
                                    <h6 className='rate-from text-center'>IMDB</h6>
                                </div>
                            </div>
                            <div className='col-11 col-sm-12 col-md-10 '>
                                <h5 className='movie-page-header text1'>{mov.name} {mov.orginalName !== "" ? <span className='movie-page-orginal-name text2'>({mov.orginalName})</span> : null} </h5>
                                <h6 className='movie-page-header-bottom text2'>Yapım Yılı <span className='text1 ms-1 me-1'>{mov.year}</span> Ülke <span className='text1 ms-1 me-1'>{mov.country}</span> Film Süresi <span className='text1 ms-1 me-1'>{mov.time} dakika</span></h6>
                            </div>
                        </div>
                        <hr className='col-11' style={{ color: "#43454b" }} />
                        <div className='row'>
                            <div className='col-12 pt-1 pb-1 ps-2 pe-2 ms-3 me-4'>
                                <div className='movie-page-cat mb-3 d-flex align-items-center'>
                                    <div className='text2 me-5 col-1'>Kategori</div>
                                    <div className='col-10'>
                                        {mov.category.map((cat) => (
                                            <Link to={`/movie-archive/category/${cat}`} className="btn btn-primary rounded-pill btn-cat me-3" > {cat}</Link>
                                        ))}
                                    </div>
                                </div>
                                <div className='movie-page-director mb-3 d-flex align-items-center'>
                                    <div className='text2 me-5 col-1'>Yönetmen</div>
                                    <div className='text1 col-10'>{mov.director}</div>
                                </div>
                                <div className='movie-page-senario mb-3 d-flex align-items-center'>
                                    <div className='text2 me-5 col-1'>Senaryo</div>
                                    <div className='text1 col-10'>{mov.senario}</div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-11 pt-1 pb-1 ps-2 pe-2 ms-3 me-4 text1'>
                                {mov.description}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}


export default DescriptionArea;