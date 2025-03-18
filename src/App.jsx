import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CadastroCliente from './pages/CadastroCliente'
import './App.css'
import Login from './pages/Login'
import ListaClientes from './pages/ListaClientes'
import Home from './pages/Home'



function App() {


  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/> } />
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element= { <CadastroCliente/>}/>
        <Route path="/lista-clientes" element= { <ListaClientes/>}/>
      </Routes>
    </Router>
  )
}

export default App
