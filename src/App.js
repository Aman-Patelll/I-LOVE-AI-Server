import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import GenerateImage from './components/Image/Image';
import GenerateAudio from './components/Audio/GenerateAudio';

function App() {
  return (
    <>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/image" element={<GenerateImage />} />
          <Route path="/audio" element={<GenerateAudio />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
