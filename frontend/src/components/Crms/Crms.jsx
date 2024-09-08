import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './crms.css';

const Crms = () => {
  const [crms, setCrms] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/crm`)
      .then(response => {
        setCrms(response.data);
      })
      .catch(error => {
        console.error('Error fetching CRM data:', error);
      });
  }, []);

  return (
    <div className="crm-container">
      {crms.map(crm => (
        <a href={`/crm/${crm.id}`} key={crm.id}>  
          <div className="crm">
            <h3>{crm.title}</h3>
            <p>Number of Comments: {crm.comments.length}</p>
            <p>Number of Attachments: {crm.attachments.length}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Crms;