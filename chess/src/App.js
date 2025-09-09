import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import BoardHome from './pages/boardHome';
import Home from './pages/home';
import CreateRoom from './pages/createRoom';
import { ContextProvider } from './context/BoardContext';

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/board" element={<BoardHome />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
