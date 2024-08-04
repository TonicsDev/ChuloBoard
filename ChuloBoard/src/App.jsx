import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from './pages/Home';
import "./css/app.css";
import { UserProvider } from './contexts/User';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import algoliasearch from "algoliasearch/lite.js";
import { InstantSearch } from 'react-instantsearch-core';
import DashBoardView from './pages/DashboardView';
import GuauWidget from './pages/GuauWidget';
import NotFound from './pages/NotFound';
import Docs from './pages/Docs';
import ProtectedRoute from './components/Utils/ProtectedRoute';

const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_ID,
  import.meta.env.VITE_ALGOLIA_TOKEN
)

const INDEX_NAME = "variables_substitutes";
function App() {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName={INDEX_NAME}>
        <Router>
          <UserProvider>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/docs/*' element={<Docs/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route path='/dashboard/*' element={<Dashboard/>}/>
              </Route>
              <Route path='/dashboard/*' element={<Dashboard/>}/>
              <Route path='/view/*' element={<DashBoardView/>}/>
              <Route path='/guau/:id' element={<GuauWidget/>}/>
              <Route path='/404' element={<NotFound/>}/>
              <Route path='*' element={<Navigate to={"/404"}/>}/>
            </Routes>
          </UserProvider>
        </Router>
      </InstantSearch>
    </>
  )
}

export default App
