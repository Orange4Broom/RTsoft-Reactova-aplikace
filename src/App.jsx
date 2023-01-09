import { Routes, Route } from 'react-router-dom';

import FavouritesPages from "./components/Pages/FavouritesPage";
import AllPage from "./components/Pages/AllPage";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<AllPage />} />
      <Route path='favourites' element={<FavouritesPages />} />
    </Routes>
    </>
  );
}

export default App;