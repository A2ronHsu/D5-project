import { Route, Routes} from 'react-router-dom';
import './App.css'
import BuscarCodigo from './components/0-BuscarCodigo';
import IngresarCodigo from './components/4-IngresarCodigo';

function App() {
 return (
  <Routes>
    <Route path='/' element={<BuscarCodigo />} />
    <Route path='/ingresar_codigo' element={<IngresarCodigo/>} />
  </Routes>
 )
}

export default App
