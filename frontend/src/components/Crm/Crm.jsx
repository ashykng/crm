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
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('authToken') || '');
  const currentUsername = localStorage.getItem('username') || '';

  useEffect(() => {
    axios.get(`http://localhost:8000/api/crm/${id}`)
      .then(response => {
        setCrm(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching CRM data:', error);
        setError('خطا در دریافت اطلاعات');
        setLoading(false);
      });
  }, [id]);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Store selected files
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('http://localhost:8000/api/attachment/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract attachment IDs from the response
      if (Array.isArray(response.data)) {
        return response.data.map(attachment => attachment.id); // Return IDs
      } else if (response.data.attachments && Array.isArray(response.data.attachments)) {
        return response.data.attachments.map(attachment => attachment.id); // Return IDs
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      return [];
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    const currentDatetime = new Date();
    const formattedDate = `${currentDatetime.getFullYear()}-${String(currentDatetime.getMonth() + 1).padStart(2, '0')}-${String(currentDatetime.getDate()).padStart(2, '0')} ${String(currentDatetime.getHours()).padStart(2, '0')}:${String(currentDatetime.getMinutes()).padStart(2, '0')}:${String(currentDatetime.getSeconds()).padStart(2, '0')}`;
  
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('crm', id);
    formData.append('created_datetime', formattedDate);
    formData.append('token', token);
  
    try {
      let attachments = [];
      if (files.length > 0) {
        attachments = await handleFileUpload();
        // Append each attachment ID individually
        attachments.forEach(id => formData.append('attachments[]', id));
      }
  
      const response = await axios.post(`http://localhost:8000/api/comment/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setCrm(prevCrm => ({
        ...prevCrm,
        comments: [...prevCrm.comments, response.data],
      }));
      setComment('');
      setFiles([]);
    } catch (error) {
      setError('!مشکلی در ثبت کامنت رخ داده');
    }
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

  // Determine if the current user is an admin
  const isAdmin = currentUsername === 'admin';

  // Filter comments: Show all comments if the user is "admin", otherwise show only the user's comments and admin's comments
  const commentsToShow = isAdmin
    ? crm.comments
    : crm.comments.filter(comment => comment.user === currentUsername || comment.user === 'admin');

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
        <h3>{isAdmin ? 'تمام کامنت ها' : 'کامنت های شما'}</h3>
        {commentsToShow.length > 0 ? (
          commentsToShow.map((comment, index) => (
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
          <p>هیچ کامنتی موجود نیست</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="کامنت خود را وارد کنید"
        />
        <br /><br />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <br /><br />
        <button type="submit">ثبت</button>
      </form>
    </div>
  );
};

export default Crm;