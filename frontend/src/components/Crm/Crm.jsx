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
    axios.get(`http://localhost:8000/api/crm/${id}`)
      .then(response => {
        console.log('CRM data received:', response.data);
        setCrm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching CRM data:', error);
        setError('خطا در دریافت اطلاعات');
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

    // Prepare the FormData
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('crm', id);
    formData.append('created_datetime', formattedDate);
    formData.append('token', token);

    // Send the POST request
    axios.post(`http://localhost:8000/api/comment/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    })
    .then(response => {
      
      // Update the CRM with the new comment
      setCrm(prevCrm => ({
        ...prevCrm,
        comments: [...prevCrm.comments, response.data],
      }));
      setComment('');
      setAttachments([]);
    })
    .catch(error => {
      setError('!مشکلی در ثبت کامنت رخ داده');
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
      <p>ایجاد شده در: {crm.created_datetime ? new Date(crm.created_datetime).toLocaleString() : 'Unknown'}</p>
      <p>کاربران دارای دسترسی: {crm.authenticated_user_names ? crm.authenticated_user_names.join(', ') : 'No authenticated users'}</p>

      {crm.attachments && crm.attachments.length > 0 && (
        <div className="attachments-section">
          <h3>فایل های ضمیمه</h3>
          {crm.attachments.map((attachment, index) => (
            <a key={index} href={attachment.file} target="_blank" rel="noopener noreferrer">
              فایل ضمیمه
            </a>
          ))}
        </div>
      )}
      <div className="comments-section">
        <h3>کامنت ها</h3>
        {crm.comments && crm.comments.length > 0 ? (
          crm.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.user}:</strong> {comment.comment}</p>
              <p>ایجاد شده در: {new Date(comment.created_datetime).toLocaleString()}</p>
              {comment.attachments && comment.attachments.length > 0 && (
                <div className="attachments-section">
                  <h4>فایل های ضمیمه</h4>
                  {comment.attachments.map((attachment, idx) => (
                    <a key={idx} href={attachment.file} target="_blank" rel="noopener noreferrer">
                      فایل ضمیمه
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>بدون کامنت</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="کامنت خود را بگذارید  "
          required
        />
        <br /> <br />
        <button type="submit">ثبت</button>
      </form>
    </div>
  );
};

export default Crm;