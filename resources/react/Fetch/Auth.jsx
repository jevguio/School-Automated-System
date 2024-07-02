import React from "react";
export const CheckAuth = async () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
  try {
    const response = await fetch('/check-auth', {
      method: 'post',
      headers: { 
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      return { authenticated: data.authenticated, user: data.user ,student:data.student};
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
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': csrfToken,
      },
    });

    if (response.ok) {
      const data = await response.json(); 
      return {user: data.user,student:data.student };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Authentication check failed');
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
    return { user: {} };
  }
};
