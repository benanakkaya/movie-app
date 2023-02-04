import React from 'react';
import MovieList from './MovieList';
import SideMenu from './SideMenu';

function Main() {
    return (
        <section >
            <div className='row main-body m-auto'>
                <div className='col-md-8 pe-0'>
                    <MovieList />
                </div>
                <div className='col-md-4 ps-0'>
                    <SideMenu />
                </div>
            </div>
        </section>
    )
}


export default Main;