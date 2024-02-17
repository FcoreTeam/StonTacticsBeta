import { Routes, Route, useNavigate } from 'react-router-dom'

import Main from '../main/Main';
import Page from '../page/Page';
import { useEffect } from 'react';
import Grenades from '../grenades/Grenades';
import Canvas from '../canvas/Canvas';

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/strategy")
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<Page />}>
        <Route path="/strategy" element={<Canvas />} />
        <Route path="/grenades" element={<Grenades />} />
      </Route>
    </Routes>
  );
}

export default App;
