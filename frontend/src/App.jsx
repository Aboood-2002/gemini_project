import Main from './Components/Main/Main'
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import { UserData } from "./Context/UserContext";

const App = () => {
  const {  isAuth  } = UserData();

  return (
    <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={ isAuth  ? <Main/>  : <Navigate to = "/login"/>} /> 
            <Route path="/login" element={!isAuth ? <Login /> : <Navigate to = "/"/> }/>
            <Route path="/register" element={!isAuth ?  <Register /> : <Navigate to = "/"/>  } />
          </Routes>
          </BrowserRouter>
    </>
  )
}


export default App


// {isAuth && <SideBar />}

