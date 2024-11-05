import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importing the CSS for styling
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const navigate = useNavigate();
  const [dotNumber, setDotNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleLogin = async (event) => {
   
    event.preventDefault();
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://www.brokerwatch.co/crud/login.php', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setMessage('Please check your email');
            setIsError(false);
            console.log(xhr.responseText);
            console.log(dotNumber);
          } else {
            console.log(xhr.responseText);
            setMessage('Error: Please Try Again');
          }
        }
      };
      xhr.send(JSON.stringify({ dot: dotNumber }));
    } catch (error) {
      setMessage('Something went wrong, please try again later.');
      setIsError(true);
    }
    
  };

  return (
   <div>
    <div className="login-page">
    <img src="" alt="" className="kys"/>
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              id="dotNumber"
              value={dotNumber}
              onChange={(e) => setDotNumber(e.target.value)}
              placeholder="Enter your carrier DOT#"
              required
            />
            <button type="submit">Sign In/Up</button>
          </div>
        </form>
        <div className="message" style={{ color: isError ? '#ff0000' : '#00ff00' }}>
          {message}
        </div>
      </div>
    </div>

    </div>
  );
};

export default LoginPage;
