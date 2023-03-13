import React, { useState } from 'react';
import { json } from 'stream/consumers';
import './App.css';

function App() {
  const [name, setName] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('https://localhost:5000/bookings', {
      method: "POST",
      body: JSON.stringify({
        name
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const event = await response.json();
    event();
    setName("");
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
         Create your booking by adding your name and insert your event information.
        </p>
        <form id='eventForm'>
            <div id='fieldContainer'>
              <label htmlFor='name'>Your Name : </label>
              <input id='name' value={name} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value)
                }}
              />
            </div>
            <div id='fieldContainer'>
              <label htmlFor='eventName'>Event Name : </label>
              <input id='eventName'></input>
            </div>
            <div id='fieldContainer'>
              <label htmlFor='eventDate'>Event Date : </label>
              <input id='eventDate'></input>
            </div>
            <div id='fieldContainer'>
              <label htmlFor='eventStartTime'>Event Start Time : </label>
              <input id='eventStartTime'></input>
            </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
