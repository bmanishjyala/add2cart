import './App.css';
import Navbar from './comps/Navbar';
import {Routes,Route} from 'react-router-dom'
import ProductList from './comps/ProductList';
import CardDetail from './comps/CardDetail';
function App() {
  return (
    <>
    <Navbar  />
    <Routes>
      <Route path='/'  element={<ProductList />} />
      <Route path='/cart/:id'  element={<CardDetail />} />
    </Routes>
    </>
  )
}

export default App;
