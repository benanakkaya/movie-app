import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelectedCategory } from "../redux/movies//moviesSlice"

function AllCategories() {

    const dispatch = useDispatch();

    const selectedCategory = useSelector((state) => state.movies.selectedCategory);

    const categories = ["aile", "aksiyon", "animasyon", "komedi", "macera", "korku", "dram", "bilim", "fantastik", "psikoloji", "yerli", "spor", "belgesel", "fragman"];



    return (
        <div >
            <div className='categories-header-ms p-3 '>
                <h6 className='cat-head'><i className="fa-solid fa-bookmark bookmark me-2"></i>Kategoriler</h6>
            </div>
            <div className='categories-body'>
                <div className='cat-list m-auto'>
                <div className='row ps-3 pe-3'>
                            <Link to={`/movie-archive/category/all`}  onClick={(e) => dispatch(setSelectedCategory("all"))} className='cat-item col-md-10 text-center'>Hepsi</Link>
                    </div>
                    <div className='row ps-3 pe-3'>
                        {categories.map((cat,ind) => (
                            <Link key={ind} to={`/movie-archive/category/${cat}`} name={cat} onClick={(e) => dispatch(setSelectedCategory(e.target.name))} className='cat-item col-md-5'>{cat.charAt(0).toUpperCase()+cat.slice(1)}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}


export default AllCategories;