import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
const UserContext = createContext();

export const UserProvider = ({children}) => {
 //  const [btnLoading, setBtnLoading] = useState(false);
  async function registerUser(email,username,password,navigate) {
   // setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/auth/register`, { email,username,password});

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    //  setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function loginUser(email,password ,fetchChats ) {
    try {
      const { data } = await axios.post(`${server}/api/auth/login`, {
        email,
        password
      });

      toast.success("logged in");
      localStorage.clear();
      localStorage.setItem("token", data.token);
      window.location.reload();
     // setBtnLoading(false);
      setIsAuth(true);
      setUser(data.user);
      await fetchChats();

    } catch (error) {
      toast.error(error.response.data.message);
    //  setBtnLoading(false);
    }
  }
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/auth/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();

    toast.success("logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };

  useEffect(() => {
    
    fetchUser();
  }, []);
  
  
  return (
    <UserContext.Provider
      value={{
        loginUser,
        //btnLoading,
        isAuth,
        setIsAuth,
        user,
        registerUser,
        loading,
        logoutHandler,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
