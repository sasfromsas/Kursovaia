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

import Test_navigaton from './pages/other/test_navigation/test_navigation';
function App() {
  return (
    <div className="App">
      
      <body>

        <Header/>
        {/* <Test_page_1/> */}
      </body>

      
      <Routes>
        <Route path='/selectTest' element={<Test_navigaton/>}></Route>
        <Route path='/Test1' element={<Test_page_1/>}></Route>
        <Route path='/Test2' element={<Test_page_2/>}></Route>

        <Route path='/Test3' element={<Test_page_2/>}></Route>
      </Routes>


    </div>
  );
}

export default App;
