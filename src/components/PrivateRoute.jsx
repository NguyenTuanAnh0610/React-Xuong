import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom';
import { AuthContext } from './../contexts/AuthContext';
import AccessDenied from './../pages/AccessDenied';

const PrivateRoute = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
	console.log(isAuthenticated, user);
	
	if (user?.role !== "admin") {
		return <AccessDenied />;
	}

	return <Outlet />;
};

export default PrivateRoute;
