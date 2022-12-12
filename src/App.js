import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './home/Home';
import ProtectedRoutes from './protectedRoutes/ProtectedRoutes';
import SignIn from './views/SignIn';

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path='login' element={<SignIn/>}/>
      <Route path='/' element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
