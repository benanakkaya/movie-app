import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFormState, setModalState } from '../redux/modals/modalsSlice';
import { setSelectedCategory } from '../redux/movies/moviesSlice';
import { getUserFavorites, setLoginState } from '../redux/users/usersSlice';


function Navbar() {

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const loginned = useSelector((state) => state.users.login);
  const [adminMode, setAdminMode] = useState(false);
  const [username, setUsername] = useState("");



  const handleLoginBtn = () => {
    dispatch(setModalState(true));
    dispatch(setFormState("login"));
  }


  const handleRegisterBtn = () => {
    dispatch(setModalState(true));
    dispatch(setFormState("register"));
  }

  var userName = JSON.parse(localStorage.getItem("username"));

  useEffect(() => {
    var login = JSON.parse(localStorage.getItem("login"));
    var userName = JSON.parse(localStorage.getItem("username"));
    var adminMode = JSON.parse(localStorage.getItem("admin"));


    if (login === "" || login === null) {
      dispatch(setLoginState(false));
    }
    else if (login === true) {
      dispatch(setLoginState(true));
      setUsername(userName);
    }

    if (adminMode === "" || adminMode === null) {
      setAdminMode(false);
    }
    else if (adminMode === true) {
      setAdminMode(true);
    }


  },[loginned])

  const handleLogoutBtn = () => {
    localStorage.setItem("username",JSON.stringify(""));
    localStorage.setItem("admin",JSON.stringify(false));
    localStorage.setItem("userID",JSON.stringify(""));
    dispatch(setLoginState(false));
  }







  return (
    <header id="header" className='mt-4'>
      <nav className="navbar navbar-expand-xl navbar-custom navbar-top ">
        <div className="container ">
          <Link to="/"><img className='website-logo' alt='site-logo' src={require("../images/website-logo.png")} /> </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <div className='searchbar-area rounded-pill ms-auto '>
              <form className='search' onSubmit={(e) => e.preventDefault()}>
                <input onChange={(event) => setSearchInput(event.target.value)} id='search-input' type="text" placeholder="Ara..." />
                <Link to={searchInput === "" ? false : `/search/${searchInput}`}  style={{ cursor: "pointer", textDecoration: "none", color: "#474b50" }} className="fa-solid fa-magnifying-glass"></Link>
              </form>
            </div>
            <div className='user-buttons ms-auto me-2 d-flex justify-content-center mt-3'>
              {loginned === false ?
                <>
                  <button className='btn btn-primary rounded-pill ' onClick={() => handleRegisterBtn()} ><i className="fa-solid fa-user-plus"></i> Kaydol</button>
                  <button className='btn btn-warning rounded-pill ms-2' onClick={() => handleLoginBtn()}><i className="fa-solid fa-right-to-bracket"></i> Giriş Yap</button>
                </>
                :
                <div className='loginState'>
                  <small className='welcomeMessage'> Hoşgeldin <span style={{color:"#ece49d"}}>{username}</span> </small>
                  <div className='d-flex justify-content-center align-items-center'> 
                  <Link to={`/${username}/favorites`} className='btn btn-secondary rounded-pill ms-2' ><i className="fa-solid fa-star"></i> Favorilerim</Link>
                  <button className='btn btn-danger rounded-pill ms-2' onClick={() => handleLogoutBtn()}><i className="fa-solid fa-door-open"></i> Çıkış Yap</button>
                  </div>
                </ div>
              }
            </div>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-xl navbar-dark navbar-custom navbar-bottom ">
        <div className="container  ">
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-auto ">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page" href="#"><i className="fa-sharp fa-solid fa-house me-2"></i>Anasayfa</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movie-archive"><i className="fa-solid fa-box-archive me-2"></i>Film Arşivi</Link>
              </li>
              <li className="nav-item">
                <Link to="/movie-archive/category/yerli"  className="nav-link" href="#/"><i className="fa-solid fa-location-dot me-2"></i>Yerli Filmler</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/"><i className="fa-solid fa-language me-2"></i>Türkçe Dublaj</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/"><i className="fa-solid fa-video me-2"></i>Orjinal Dilinde</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/"><i className="fa-solid fa-message me-2"></i>İletişim</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}



export default Navbar;

