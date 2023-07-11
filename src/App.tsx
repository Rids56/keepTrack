import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import HomePage from './home/HomePage';
import ProjectPage from './projects/ProjectPage';

function App() {
  return (
    <Router>
      <header className='sticky'>
        <span className='logo'>
          <img src='/assets/logo.jpg' alt='logo' width='80' height='80'/>
        </span>
        <NavLink to='/' className='button rounded'>
          <span className='icon-home'></span>
          Home
        </NavLink>
        <NavLink to='/projects' className='button rounded'>
          <span className='icon-name'></span>
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/projects' element={<ProjectsPage />} />
          <Route path='/projects/:id' element={<ProjectPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
