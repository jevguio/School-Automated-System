// src/Departments.js

import React, { useEffect, useState } from 'react';

const Departments = async() => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
    try {
        const response = await fetch('./getDepartments', {
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
          console.log(data);
          return { departments: data};
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Authentication check failed');
        }
      } catch (error) {
        console.error('Error during get Departments:', error);
        return { departments: null};
      }
};

export default Departments;
