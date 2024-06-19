import React from "react";
export const CheckAuth = async () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
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
      return { authenticated: data.authenticated, user: data.user };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication check failed');
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
    return { authenticated: false, user: {} };
  }
};

export const GetUser = async () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
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
      return {user: data.user };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication check failed');
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
    return { user: {} };
  }
};
