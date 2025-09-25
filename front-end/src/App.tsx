import { Route, Routes } from 'react-router-dom';
import BuscarCodigo from './components/0-Menu';
import IngresarCodigo from './components/4-Posicion';
import Transfer from './components/5-Transfer';
import LoginForm from './components/6-LoginForm';
import Devoluciones from './components/7-Devoluciones';
import PrivateRoute from './components/PrivateRoute';
import Recebimiento from './components/9-Recebimiento';
import Estragados from './components/8-Estragados';

function App() {
  return (
    <Routes>
      <Route path='/' element={<BuscarCodigo />} />
      <Route path='/posicion' element={<IngresarCodigo />} />
      <Route path='/login' element={<LoginForm />} />

      <Route element={<PrivateRoute />}>
        <Route path='/transfer' element={<Transfer />} />
        <Route path='/devoluciones' element={<Devoluciones />} />
        <Route path='/recebimiento' element={<Recebimiento/>}/>
        <Route path='/estragados' element={<Estragados/>}/>

      </Route>

    </Routes>
  )
}

export default App
