import React, { useEffect, useState } from 'react';
import './App.css';

// our structure for our post request
type TEvent = {
  name: string,
  _id: string,
  eventsArray: [
    eventName: string | boolean | number,
    eventDate: string,
    eventStartTime: string,
  ]
}
interface AssociativeArray {
  eventName: string;
  eventDate: string;
  eventStartTime: string;
}

function App() {
  const [name, setName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [events, setEvents] = useState<TEvent[]>([]);
  const [eventsArrg, setEventsArrg] = useState<TEvent[]>([]);

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
    setEventsArrg([...eventsArrg, event]);
    console.log("set events" + setEventsArrg);
    setName("");

  }

  async function handleDeleteEvent(eventId: string) {
    await fetch(`http://localhost:5000/bookings/${eventId}`, {
      method: "DELETE"
    })

    // optimistic update here 
    setEvents(events.filter((event) => event._id !== eventId))
  }
  
  async function handleUpdateEvents(eventId: string, eventName: string ) {
    // console.log("this is event name: " + eventName);
    let eventsdata: { [eventName: string]: AssociativeArray; } = {};
    eventsdata["events"] = { 
      eventName: eventName, 
      eventDate: eventDate,
      eventStartTime: eventStartTime,
    };
    // console.log(eventsdata)    
    
    const response = await fetch(`http://localhost:5000/bookings/${eventId}/addevents` , {
      method: "POST",
      body: JSON.stringify(
        eventsdata
      ),
      headers: {
        "Content-Type": "application/json",
      }
    });
    await response.json();
  }

  // forloop to update classname 
  let updateClass = ((addonFormClassName: any, newClassName: string) => {
    addonFormClassName.forEach(function (value: any) {
      console.log(value);
      value.className = newClassName;
    })
  })

  // function for click on event 
  const eventClassName = document.querySelector(".events");
  function handleClickEvent() {
    console.log(eventClassName?.className);
    var addonFormClassName = document.querySelectorAll<HTMLInputElement>('.addonForm');
    if (eventClassName != null) {
      if (eventClassName.className === "events") {
        eventClassName.className = "events active";
        updateClass(addonFormClassName, "addonForm active");

      } else {
        eventClassName.className = "events";
        updateClass(addonFormClassName, "addonForm");
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
            >
              {event.name}
              <form className='addonForm'>
                <div id='fieldContainer events active' className='eventContainer'>
                  <label htmlFor='eventName' className='eventtag'>Event Name : </label>
                  <input id='eventName' value={eventName} className="inputtag" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventName(e.target.value)
                  }} />
                </div>
                <div id='fieldContainer events active' className='eventContainer'>
                  <label htmlFor='eventDate' className='eventtag'>Event Date : </label>
                  <input id='eventDate' value={eventDate} className="inputtag" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventDate(e.target.value)
                  }} />
                </div>
                <div id='fieldContainer events active' className='eventContainer'>
                  <label htmlFor='eventStartTime' className='eventtag'>Event Start Time : </label>
                  <input id='eventStartTime' value={eventStartTime} className="inputtag" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventStartTime(e.target.value)
                  }} />
                </div>
              <button onClick={() => handleUpdateEvents(event._id, eventName)}>Update Event</button>
              </form>
              <button onClick={() => handleDeleteEvent(event._id)}>Delete Event</button>
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
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <button onClick={() => handleClickEvent()} >Open Events</button>
        <div>
          {eventsArrg.map((events) => (
            <div>
              <p>
              {eventName}
              {eventDate}
              {eventStartTime}
              </p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;