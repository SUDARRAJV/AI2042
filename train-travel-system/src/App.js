import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [authtoken, setAuthToken] = useState({});
  const [traindetails, setTrainDetails] = useState({});

  const getAuthToken = async () => {    
    const getAuthTokenReq = {
    
      "companyName": "Train Travel Management",
      "clientID": "8d5adb66-14ad-4578-9737-525c2a4153dd",
      "clientSecret": "GaZQntPiyJbzjrRN",
      "ownerName": "Sudarraj V",
      "ownerEmail": "vksudarrajsna@gmail.com",
      "rollNo": "AI2042"  
}

  // Send the POST request
  await axios.post('http://20.244.56.144/train/auth', getAuthTokenReq)
    .then(async (response) => {
      // console.log(response.data.access_token);
      // Handle the successful response
      setAuthToken(response.data.access_token);

      await axios.get('http://20.244.56.144:80/train/trains', {
        headers: {
          'Authorization': `Bearer ${authtoken}`,
        },
      }) 
      .then((response) => {
        setTrainDetails(response.data);
        console.log('GET request successful:', response.data);
      })     
      console.log('POST request successful:', response.data);
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error making POST request:', error);
    });  
}
  

    useEffect(() => {      
      getAuthToken();
    },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* {{ traindetails }} */}
        </a>
      </header>
    </div>
  );
}

export default App;
