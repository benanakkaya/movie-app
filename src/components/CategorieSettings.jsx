import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSortSetting, setSelectedCategory } from '../redux/movies/moviesSlice';


function CategorieSettings() {

    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.movies.selectedCategory);
    const sortSetting = useSelector((state) => state.movies.sortSetting);

    const sortTypes = ["id", "views", "comments.length", "imdbRating"];

    const categories = ["aile", "aksiyon", "animasyon", "komedi", "macera", "korku", "dram", "bilim", "fantastik", "psikoloji", "yerli", "spor", "belgesel", "fragman"];




    return (
        <div className='col-md-3 settings-menu mt-5 ms-2 mb-5 me-2 p-3'>

            {/* SIRALAMA */}
            <div className='sort-settings-header p-2 ps-0 '>
                <h6 className='cat-head p-3 ps-0 mb-1'><i className="fa-solid fa-bookmark bookmark me-2"></i>Sıralama</h6>
            </div>
            <div className='sort-settings-body'>
                {sortTypes.map((type,ind) => (
                    <div key={ind} className='row mb-2 ps-2 pe-2'>
                        <Link to={`/movie-archive/?sort=${type}`} onClick={() => dispatch(setSortSetting(type))} className={sortSetting === type ? 'sort-setting active' : 'sort-setting'}>
                            {type === "id" ? "En Yeniler" :
                                type === "views" ? "En Çok Görüntülenenler" :
                                    type === "comments.length" ? "En Çok Yorumlananlar" :
                                        type === "imdbRating" ? "IMDB Puanına Göre" : null}</Link>
                    </div>
                ))}
            </div>

            {/* TÜRLER */}

            <div className='sort-settings-header p-2 ps-0 '>
                <h6 className='cat-head p-3 ps-0 mb-1'><i className="fa-solid fa-bookmark bookmark me-2"></i>Türler</h6>
            </div>
            <div className='sort-settings-body d-flex flex-column ps-2'>
                <div className='row '>
                    <Link to={`/movie-archive/category/all`} name="all" onClick={(e) => dispatch(setSelectedCategory("all"))} className={selectedCategory ===  "all" ? 'sort-setting type col-md-10 text-center active' : 'sort-setting type col-md-10 text-center'}>Hepsi</Link>
                </div>
                <div className='row '>
                    {categories.map((cat) => (
                        <Link to={`/movie-archive/category/${cat}`} name={cat} onClick={(e) => dispatch(setSelectedCategory(e.target.name))} className={cat === selectedCategory ? 'sort-setting type col-md-5 active' : 'sort-setting type col-md-5'}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Link>
                    ))}
                </div>
            </div>


            {/* Diller */}

            <div className='sort-settings-header p-2 ps-0 '>
                <h6 className='cat-head p-3 ps-0 mb-1'><i className="fa-solid fa-bookmark bookmark me-2"></i>Dil Seçimi</h6>
            </div>
            <div className='sort-settings-body d-flex flex-column ps-2'>
                <div className='row '>
                    <Link to={`/movie-archive/category`} name="türkçe" onClick={(e) => setSelectedCategory(e.target.name)} className='sort-setting type col-md-5'>Türkçe</Link>
                    <Link to={`/movie-archive/category`} name="orjinal" onClick={(e) => setSelectedCategory(e.target.name)} className='sort-setting type col-md-5'>Orjinal Dil</Link>
                </div>
            </div>


        </div>
    )
}


export default CategorieSettings;