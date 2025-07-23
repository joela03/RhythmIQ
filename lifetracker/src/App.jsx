import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>

      </div>  
    </Router>
  )
}

export default App
