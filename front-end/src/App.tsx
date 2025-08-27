import { Route, Routes } from 'react-router-dom';
import './App.css'
import BuscarCodigo from './components/0-BuscarCodigo';
import IngresarCodigo from './components/4-IngresarCodigo';
import Transfer from './components/5-Transfer';
import LoginForm from './components/6-LoginForm';
import Devoluciones from './components/7-Devoluciones';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<BuscarCodigo />} />
      <Route path='/ingresar_codigo' element={<IngresarCodigo />} />
      <Route path='/dannyhome/login' element={<LoginForm />} />

      <Route element={<PrivateRoute />}>
        <Route path='/dannyhome/transfer' element={<Transfer />} />
        <Route path='/dannyhome/devoluciones' element={<Devoluciones />} />

      </Route>

    </Routes>
  )
}

export default App
