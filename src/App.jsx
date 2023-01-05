import { Routes, Route } from 'react-router-dom';

import AllPage from "./components/Pages/AllPage";
import FavouritesPages from "./components/Pages/FavouritesPage";

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