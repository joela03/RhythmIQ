import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/LandingPage.jsx';

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
        </Routes>

      </div>  
    </Router>
  )
}

export default App
