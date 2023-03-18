import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import MainPage from './pages/MainPage';
import CoursePage from './pages/CoursePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainPage />} />
        <Route path="/course/:courseId" element={<CoursePage />} />
      </Route>
    </Routes>
  );
}

export default App;
