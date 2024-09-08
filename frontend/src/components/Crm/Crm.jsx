import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './crm.css';

const Crm = () => {
  const { id } = useParams();
  const [crm, setCrm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('authToken') || ''); // Assuming token is stored in localStorage

  useEffect(() => {
    console.log(`Fetching CRM data for ID: ${id}`);
    axios.get(`http://localhost:8000/api/crm/${id}`)
      .then(response => {
        console.log('CRM data received:', response.data);
        setCrm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching CRM data:', error);
        setError('Error fetching CRM data');
        setLoading(false);
      });
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    // Get the current date and time
    const currentDatetime = new Date();
    const formattedDate = currentDatetime.getFullYear() + '-' +
      String(currentDatetime.getMonth() + 1).padStart(2, '0') + '-' + 
      String(currentDatetime.getDate()).padStart(2, '0') + ' ' + 
      String(currentDatetime.getHours()).padStart(2, '0') + ':' + 
      String(currentDatetime.getMinutes()).padStart(2, '0') + ':' + 
      String(currentDatetime.getSeconds()).padStart(2, '0');

    console.log('Formatted date:', formattedDate);

    // Prepare the FormData
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('crm', id);
    formData.append('created_datetime', formattedDate);
    formData.append('token', token);
    formData.append('attachments', '[]')

    // Send the POST request
    axios.post(`http://localhost:8000/api/comment/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    })
    .then(response => {
      console.log('Comment submitted successfully:', response.data);
      
      // Update the CRM with the new comment
      setCrm(prevCrm => ({
        ...prevCrm,
        comments: [...prevCrm.comments, response.data],
      }));
      setComment('');
      setAttachments([]);
    })
    .catch(error => {
      console.error('Error posting comment:', error);
      setError('Error posting comment');
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!crm) {
    return <div>No CRM data found</div>;
  }

  return (
    <div className="crm-container">
      <h2>{crm.title}</h2>
      <p>Created: {crm.created_datetime ? new Date(crm.created_datetime).toLocaleString() : 'Unknown'}</p>
      <p>Authenticated Users: {crm.authenticated_user_names ? crm.authenticated_user_names.join(', ') : 'No authenticated users'}</p>

      <div className="comments-section">
        <h3>Comments</h3>
        {crm.comments && crm.comments.length > 0 ? (
          crm.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.user}:</strong> {comment.comment}</p>
              <p>Date: {new Date(comment.created_datetime).toLocaleString()}</p>
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="attachments-section">
                  <h4>Attachments:</h4>
                  {comment.attachments.map((attachment, idx) => (
                    <a key={idx} href={attachment.file} target="_blank" rel="noopener noreferrer">
                      View Attachment
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No Comments</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
          required
        />
        <br /> <br />
        <button type="submit">Submit Comment</button>
      </form>

      {crm.attachments && crm.attachments.length > 0 && (
        <div className="attachments-section">
          <h3>Attachments</h3>
          {crm.attachments.map((attachment, index) => (
            <a key={index} href={attachment.file} target="_blank" rel="noopener noreferrer">
              View Attachment
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Crm;