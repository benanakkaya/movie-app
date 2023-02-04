import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieArchive from "./pages/MovieArchive";
import MoviePage from "./pages/MoviePage";
import SearchPage from "./pages/SearchPage";
import UserModal from "./components/UserModal";
import FavoritesPage from "./pages/FavoritesPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setSelectedCategory, setSortSetting } from "./redux/movies/moviesSlice";
import { fetchUsers } from "./redux/users/usersSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
        dispatch(fetchMovies());
        dispatch(fetchUsers());
    }
    dispatch(setSelectedCategory("all"));
    dispatch(setSortSetting("id"));
})


  return (
    <div className="App">
      <div className="container col-md-10">
        <Router>

          <UserModal  />

          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/:name" element={<MoviePage />} />
            <Route path="/search/:searchInput" element={<SearchPage />} />
            <Route path="/movie-archive/category/:cat" element={<MovieArchive />} />
            <Route path="/movie-archive/" element={<MovieArchive />} />
            <Route path="/:username/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
