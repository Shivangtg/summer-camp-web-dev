import { useState } from "react";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import Authentication from "./pages/Authentication";

import {BrowserRouter,Routes,Route, Navigate, useNavigate, Link} from "react-router-dom"
import HomePage from "./pages/HomePage";
import { useUserContext } from "./hooks/useUserContext";
import { useThemeContext } from "./hooks/useThemeContext";
import { ThemeProvider } from "@emotion/react";
import * as Theme from './theme'

function App() {
  const {user,dispatchUser}=useUserContext()
  const {theme,dispatchTheme}=useThemeContext()
  
  return (
    <ThemeProvider theme={theme=="dark"?Theme.darkTheme:Theme.lightTheme}>
      <BrowserRouter>
        
            <Routes>
              <Route path="/" element={user?<HomePage/>:<Navigate to="/Authentication"/>} />
              <Route path="/Authentication" element={<Authentication/>} />
            </Routes>
          
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;
