import './App.css';
import MainPage from './Components/MainPage/MainPage';
import Login from './Components/Login/Login';
import Signup from './Components/SignUp/Signup';
import {Routes,BrowserRouter, Route, Navigate} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Navigate to="/login"/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/page' element={<MainPage/>}/>
          <Route path='/signup' element={<Signup/>} />

        </Routes>

      </BrowserRouter>
      

    </div>
  );
}

export default App;
