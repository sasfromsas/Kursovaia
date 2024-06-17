import './App.css';
import { useState } from 'react';

import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import Header from './pages/header/header';
import Test_page_1 from './pages/page_tests/test_page_1/test_page_1';
import Test_page_2 from './pages/page_tests/test_page_2/test_page_2';
import Test_page_3 from './pages/page_tests/test_page_3/test_page_3';
import Test_navigaton from './pages/other/test_navigation/test_navigation';
import Login from './pages/other/login/login';
import Registration from './pages/other/registration/registration';
import Results from './pages/other/results/results';
import Footer from './pages/footer/footer';
function App() {
  return (
    <div className="App">

        <Header/>

      <Routes>
        <Route path='/' element={<Test_navigaton/>}></Route>
        <Route path='/Test1' element={<Test_page_1/>}></Route>
        <Route path='/Test2' element={<Test_page_2/>}></Route>
        <Route path='/Test3' element={<Test_page_3/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registration' element={<Registration/>}></Route>
        <Route path='/results' element={<Results/>}></Route>
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
