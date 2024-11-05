import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import logo from './assets/logo.png';
import comingSoon from './assets/comingsoon.png';
import thumbsUp from './assets/thumbsup.png';
import waves from './assets/waves.jpg';
import { json, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function App() {
  const queryParameters = new URLSearchParams(window.location.search)
  const navigate = useNavigate();
  const type = queryParameters.get("type")
  const lcode = queryParameters.get("lcode")
  const checkCookiesAndPost = async () => {
    let sessiontoken = Cookies.get('sessiontoken');
    let dot = Cookies.get('dot');
  
    if (sessiontoken != null && dot != null) {
      try {
        const response = await axios.post('https://www.brokerwatch.co/crud/checksess.php', {
          session: sessiontoken,
          dot:dot
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (response.data.includes("success")) {
          navigate('/dashboard')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Required cookies are missing.');
    }
  };
  const handleLogg = async (event) => {
    try {
      const response = await axios.get('https://www.brokerwatch.co/crud/logcheck.php?lac='.concat(lcode))
      if (response.data['status'] === 'success') {
      return navigate('/dashboard')
      } else {
        throw new Error('Non-200 response');
      }
    } catch (error) {

    }
  }
  if (lcode != null) {
    handleLogg()
  };
  checkCookiesAndPost();
  useEffect(() => {
    // Retrieve the button element by its ID
    const sendButton = document.getElementById('send');
    // Add a click event listener to the button
    sendButton.addEventListener('click', function(event) {
      
      event.preventDefault(); // Prevent the default behavior of the button
      // Get the input value
      const inputValue = document.getElementById('input').value;
      // Create a new XMLHttpRequest object
      const xhr = new XMLHttpRequest();
      // Set the request method and URL
      xhr.open('POST', 'https://www.brokerwatch.co/crud/create.php', true);
      // Set the request headers
      xhr.setRequestHeader('Content-Type', 'application/json');
      // Create the request data object
      const data = {
        table: 'mailinglists',
        dot: inputValue
      };
      // Convert the data object to JSON
      const jsonData = JSON.stringify(data);
      // Send the request
      xhr.send(jsonData);
      document.getElementById("subtext").textContent = "LOADING PLEASE WAIT. DO NOT QUIT THE PAGE. THIS MIGHT TAKE A WHILE"
      // Handle the response
      xhr.onload = function() {
        
        if (xhr.status === 200 && !(xhr.responseText.includes("does not belong to a carrier.") || xhr.responseText.includes("Failed") || xhr.responseText.includes("already exist"))) {
          // Request successful
          const input = document.querySelector('#input');
          const send = document.querySelector('#send');
          const svg = document.querySelector('.svg_icon');
          svg.style.opacity = '1';
          svg.style.transition = 'opacity 0.5s';
          setTimeout(function() {
            svg.style.opacity = '0';
            setTimeout(function() {
              svg.remove();
            }, 500);
          }, 50);
          // Fade out the button
          send.style.opacity = '1';
          send.style.transition = 'opacity 0.5s';
          setTimeout(function() {
            send.style.opacity = '0';
            setTimeout(function() {
            }, 500);
          }, 50);
          // Slowly move the text to the center of the input field
          input.style.transition = 'padding 1s';
          input.style.paddingLeft = '37%';
          console.log('Entry added to the database.');
          document.getElementById("subtext").textContent = "You have been sent a confirmation email. Please press the link included in the email."
          document.getElementById("subtext").style.color = "green"
          navigate("/login");
          // You can perform additional actions here if needed
        } else {
          // Request failed
          console.error('Error adding entry to the database.');
          document.getElementById("subtext").textContent = "Sorry, Something Went Wrong, Please Try Again Later."
          document.getElementById("subtext").style.color = "red"
          
          // You can handle the error scenario here
        }
      };
    });
    const logButton = document.getElementById('log');
    logButton.addEventListener('click', function(event) { 
      event.preventDefault()
      navigate('/login');
    });
      
    document.getElementById("input").addEventListener('focusout', function(event) {
      if (document.getElementById("c3").style.visibility == 'hidden' && window.innerWidth < 768) {
        document.getElementById("c3").style.visibility = 'visible'
        document.getElementById("c4").style.visibility = 'visible'
      }
    });

    document.getElementById("input").addEventListener('focus', function(event) {
      if (window.innerWidth < 768) {
        document.getElementById("c3").style.visibility = 'hidden'
        document.getElementById("c4").style.visibility = 'hidden'
      }
    });
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <>
      <div className="parent">
        <div className="div1" id="c1">
          <img src={comingSoon} alt="Coming Soon!" id="soon" />
        </div>
        <div className="div2" id="c2">
          <img src={logo} alt="BrokerWatch Logo" id="logo" />
          <div className="container-input">
            <div className="custom_input">
              <svg xmlns="http://www.w3.org/2000/svg" className="svg_icon bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
              </svg>
              <input id="input" className="input" type="text" placeholder="Enter your carrier DOT#" />
            </div>
            <div className="custom_button" id="send">
              <a href="#" className="submitButon">SUBMIT</a>
            </div>
            <div className="custom_button" id="log">
              <a href="#" className="logButon">Log In</a>
            </div>
          </div>
          <p className="subtext" id="subtext">You will receive updates via your FMCSA registered email.</p>
        </div>
        <div className="div3" id="c3">
          <h1 className="tagline">Bringing <span className="blue" id="tr">transparency</span> back to logistics!</h1>
        </div>
        <div className="div4" id="c4">
          <h2 className="follow" id="devup">STAY UPDATED WITH OUR DEVELOPMENT</h2>
          <h1 className="url"><span className="blue" id="as">WWW.BROKERWATCH.CO</span></h1>
        </div>
      </div>
      <div className="thumb">
        <img src={thumbsUp} alt="" />
      </div>
    </>
  );
}

export default App;