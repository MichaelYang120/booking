import React, { useEffect, useState } from 'react';
import { json } from 'stream/consumers';
import './App.css';

// our structure for our post request
type TEvent = {
  name: string,
  _id: string,
  // events: []
}

function App() {
  const [name, setName] = useState('');
  const [events, setEvents] = useState<TEvent[]>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/bookings', {
      method: "POST",
      body: JSON.stringify({
        name
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const event = await response.json();
    setEvents([...events, event]);
    setName("");
  }

  async function handleDeleteEvent(eventId: string) {
    await fetch(`http://localhost:5000/bookings/${eventId}`, {
      method: "DELETE"
    })

    // optimistic update here 
    setEvents(events.filter((event) => event._id !== eventId))
  }
  
  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('http://localhost:5000/bookings');

      const newEvents = await response.json();
      setEvents(newEvents);
    }
    fetchEvents();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ul className='events'>
          {events.map((event) => (
            <li key={event._id}>
              {event.name}
              <button onClick={() => handleDeleteEvent(event._id)}>x</button>
            </li>
          ))}
        </ul>
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
