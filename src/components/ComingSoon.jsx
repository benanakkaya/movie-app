import React from 'react';
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { moviesSelector } from '../redux/movies/moviesSlice';

function ComingSoon() {

    const movieList = useSelector(moviesSelector.selectAll);



    return (
        <section>
            <div className='container comingsoon-area p-4'>
                <div className='row'>
                    <div className='comingsoon-header p-3 mb-3'>
                        <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Yakında Çıkacaklar</h6>
                    </div>
                    <div className='items row d-flex justify-content-start col-11  m-auto'>
                        {movieList.filter((mov) => mov.category.includes("fragman")).slice(0,4).map((movie) => (
                            <Link key={movie.id} to={`/${movie.name.toLowerCase().replace(/ /g,"-")}`} className='movie-item col col-sm-6 col-lg-3 d-flex flex-column align-items-center'>
                                <div className='text-align-left'>
                                    <div style={{ position: "relative" }}>
                                        <img className='movie-banner' alt='movie-banner' src={movie.image} />
                                        </div>
                                    <h5 style={{marginTop:"0.5rem",fontSize:"1rem"}}>{movie.name.length > 25 ? movie.name.slice(0,25) + "..." : movie.name}</h5>
                                    <h6>{movie.year}</h6>
                                </div>
                            </Link>
                        ))}
                    </div>  
                </div>
            </div>
        </section>
    )
}


export default ComingSoon;