import React from 'react'
import Navbar from '../components/Navbar'
import MovieSearch from '../components/MovieSearch'
import Footer from '../components/Footer';

function SearchPage() {
  return (
    <div>
        <Navbar />
        <MovieSearch />
        <Footer />
    </div>
  )
}

export default SearchPage;
