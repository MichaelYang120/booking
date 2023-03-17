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
  
  function handleClickEvent() {
    var eventClassName = document.querySelector(".events");
    var addonFormClassName = document.querySelector(".addonForm");
    console.log(eventClassName?.className);
    if (eventClassName != null) {
      if (eventClassName.className == "events") {
        eventClassName.className = "events active";

      } else {
        eventClassName.className = "events";
 
      }
    }
    if (addonFormClassName != null) {
      if (addonFormClassName.className == "addonForm") {
        addonFormClassName.className = "addonForm active";

      } else {
        addonFormClassName.className = "addonForm";

      }
    }
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
        <ul className="events">
          {events.map((event) => (
            <li 
            key={event._id}
            // onClick={(handleClickEvent)}
            >
              {event.name}
              <form className='addonForm'>
                <div id='fieldContainer events active'>
                  <label htmlFor='eventName'>Event Name : </label>
                  <input id='eventName'></input>
                </div>
                <div id='fieldContainer events active'>
                  <label htmlFor='eventDate'>Event Date : </label>
                  <input id='eventDate'></input>
                </div>
                <div id='fieldContainer events active'>
                  <label htmlFor='eventStartTime'>Event Start Time : </label>
                  <input id='eventStartTime'></input>
                </div>
              </form>
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
            {/* <div id='fieldContainer events active'>
              <label htmlFor='eventName'>Event Name : </label>
              <input id='eventName'></input>
            </div>
            <div id='fieldContainer events active'>
              <label htmlFor='eventDate'>Event Date : </label>
              <input id='eventDate'></input>
            </div>
            <div id='fieldContainer events active'>
              <label htmlFor='eventStartTime'>Event Start Time : </label>
              <input id='eventStartTime'></input>
            </div> */}
          <button onClick={handleSubmit}>Submit</button>
        </form>
          <button onClick={() => handleClickEvent()} >Open Events</button>
      </header>
    </div>
  );
}

export default App;

// todo: add ui and functionality to work on event card and adding details such as event time, date, and event start time.
