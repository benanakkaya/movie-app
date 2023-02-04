import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { moviesSelector } from '../redux/movies/moviesSlice';

function MostViewedSide() {

    const movieList = useSelector(moviesSelector.selectAll);



    return (
        <div>
            <div className='mv-header-ms p-3 '>
                <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>En Çok İzlenenler</h6>
            </div>
            <div className='mv-body'>
                {movieList.slice().sort((a, b) => a.views >= b.views ? -1 : 1).slice(0, 5).map((mov,ind) => (
                    <Link key={mov.id} to={`/${mov.name.toLowerCase().replace(/ /g,"-")}`} className='row list-side ps-3 pe-3 mb-1'>
                        <div className='rank-list col-1 ms-2'>{ind+1}.</div>
                        <div className='body-list col-9'>
                            <div className='body-list-img'>
                                <img className='list-img' alt='logo' src={mov.image} />
                            </div>
                            <div className='body-list-info ms-2'>
                                <h6 className='mv-movie-header'>{mov.name.length > 20 ? mov.name.slice(0,20) + "..." : mov.name} ({mov.year})</h6>
                                <small>
                                    <span><i className="fa-solid fa-eye me-1"></i>{mov.views}</span>
                                    <span><i className="fa-solid fa-star ms-3 me-1"></i>{mov.imdbRating}</span>
                                    <span><i className="fa-solid fa-comment ms-3 me-1"></i>{mov.comments.length}</span>
                                </small>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MostViewedSide;
