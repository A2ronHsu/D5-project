import { Route, Routes} from 'react-router-dom';
import './App.css'
import BuscarCodigo from './components/0-BuscarCodigo';
import IngresarCodigo from './components/4-IngresarCodigo';
import Transfer from './components/5-Transfer';

function App() {
 return (
  <Routes>
    <Route path='/' element={<BuscarCodigo />} />
    <Route path='/ingresar_codigo' element={<IngresarCodigo/>} />
    <Route path='/dannyhome/transfer' element={<Transfer/>}/>
  </Routes>
 )
}

export default App
