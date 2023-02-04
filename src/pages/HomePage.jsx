import React from 'react'
import Navbar from "../components/Navbar";
import ComingSoon from "../components/ComingSoon";
import Main from "../components/Main";
import Footer from "../components/Footer";


export default function HomePage() {
    return (
        <div>
            <Navbar />
            <ComingSoon />
            <Main />
            <Footer />
        </div>
    )
}
