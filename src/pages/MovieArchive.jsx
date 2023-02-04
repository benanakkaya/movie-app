import React from 'react'
import ArchiveList from '../components/ArchiveList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function MovieArchive() {
    return (
        <div className='col-12'>
            <Navbar />
            <ArchiveList />
            <Footer />
        </div>
    )
}


export default MovieArchive;