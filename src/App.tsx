import './App.css';
import AllTasks from "./pages";
import Important from './pages/Important';
import Completed from './pages/Completed';
import Incomplete from './pages/Incomplete';
import {Route, Routes} from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
        <div className='layout'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<AllTasks/>} />
          <Route path="/important" element={<Important/>} />
          <Route path="/completed" element={<Completed/>} />
          <Route path="/incomplete" element={<Incomplete/>} />
        </Routes>
        
        </div>
    </div>
  );
}

export default App;
