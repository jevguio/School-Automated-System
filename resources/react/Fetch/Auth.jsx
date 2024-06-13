import React, { useState, useEffect } from 'react';

const CheckAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const [userData, setUserData] = useState({});
  const checkAuthentication = async () => {
    try {
      const response = await fetch('/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      if (response.ok) {
        const data = await response.json(); 
        setIsLoggedIn(data.authenticated);
        setUserData(data.user);
      } else {
        const errorData = await response.json(); 
      }
    } catch (error) {
      // console.error('Error during authentication check:', error);
    }
  };

  useEffect(() => {
    
    checkAuthentication();

    const intervalId = setInterval(checkAuthentication, 5000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [csrfToken]);

  return [isLoggedIn, setIsLoggedIn,userData];
};

export default CheckAuth;
