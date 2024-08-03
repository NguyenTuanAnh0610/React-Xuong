import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../Axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          const { data } = await instance.get("/660/users/4", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Check token error:", error);
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    checkAuth();
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const { data } = await instance.post("/login", { email, password });
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await instance.post("/register", { email, password });
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
