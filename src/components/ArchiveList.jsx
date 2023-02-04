import React from 'react'
import CategorieSettings from "./CategorieSettings";
import MovieArchiveList from './MovieArchiveList.jsx';


function ArchiveList() {
    return (
        <div className='container movie-archive '>
            <div className='row d-flex justify-content-center'>
                
                <MovieArchiveList />
                <CategorieSettings />
            </div>
        </div>
    )
}


export default ArchiveList;
