import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crms.css';

const Crms = () => {
  const [crms, setCrms] = useState([]);
  const [username, setUsername] = useState('');

  // Fetch CRM data and set username from localStorage
  useEffect(() => {
    // Get the username from localStorage (assuming it's stored during login)
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch the CRM data from the API
    axios.get('http://localhost:8000/api/crm')
      .then(response => {
        setCrms(response.data);
      })
      .catch(error => {
        console.error('Error fetching CRM data:', error);
      });
  }, []);

  return (
    <div className="crm-container">
      {crms.map(crm => {
        // If the user is "admin", show all CRMs
        if (username === 'admin') {
          return (
            <a href={`/crm/${crm.id}`} key={crm.id}>
              <div className="crm">
                <h3>{crm.title}</h3>
                <p>تعداد کامنت ها: {crm.comments.length}</p>
                <p>فایل های ضمیمه: {crm.attachments.length}</p>
              </div>
            </a>
          );
        }

        // Otherwise, check if the logged-in user is in the authenticated_user_names array
        const isAuthenticatedForCrm = crm.authenticated_user_names.includes(username);

        // Only display the CRM if the user is authenticated
        if (isAuthenticatedForCrm) {
          return (
            <a href={`/crm/${crm.id}`} key={crm.id}>
              <div className="crm">
                <h3>{crm.title}</h3>
                <p>تعداد کامنت ها: {crm.comments.length}</p>
                <p>فایل های ضمیمه: {crm.attachments.length}</p>
              </div>
            </a>
          );
        }
      })}
    </div>
  );
};

export default Crms;