import React, { useEffect, useState } from 'react';
import './App.css';

// our structure for our post request
type TEvent = {
  name: string,
  _id: string,
  eventsArray: [
    eventName: string | boolean | number
  ]
}
interface AssociativeArray {
  firstName: string;
  lastName: string;
}

function App() {
  const [name, setName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [events, setEvents] = useState<TEvent[]>([]);

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
  

  // update
  async function handleUpdateEvents(eventId: string) {
    // var associative_array: AssociativeArray[] = []
    // associative_array['name'] = 'Tutorialspoint'
    // var eventsArray = [string:string]
    // var eventArray: AssociativeArray[] = []
    // eventArray['eventName'] = eventName,
    console.log("this is event name: " + eventName);

    var eventArray: { [id: string]: AssociativeArray; } = {};
    eventArray["p1"] = { firstName: "F1", lastName: "L1" };
    console.log(eventArray)

    // 3/23 need to look at the associative array to pass data and post it to the api request
    
    
    // const response = await fetch(`http://localhost:5000/bookings/${eventId}/addevents` , {
    //   method: "POST",
    //   body: JSON.stringify({
    //     eventName,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   }
    // });
    // const event = await response.json();
    // setEvents([...events, event]);
    // setEventName("");
    console.log(eventName);
  }

  // forloop to update classname 
  let updateClass = ((addonFormClassName: any, newClassName: string) => {
    addonFormClassName.forEach(function (value: any) {
      console.log(value);
      value.className = newClassName;
    })
  })

  // todo: increment input fields
  let updateClassField = ((eventName: any) => {
    eventName.array.forEach(function (value: any) {
      console.log(value);
      value.eventName = eventName + " i"
    });
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
                <div id='fieldContainer events active'>
                  <label htmlFor='eventName'>Event Name : </label>
                  <input id='eventName' value={eventName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventName(e.target.value)
                  }} />
                </div>
                <div id='fieldContainer events active'>
                  <label htmlFor='eventDate'>Event Date : </label>
                  <input id='eventDate' value={eventDate} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventDate(e.target.value)
                  }} />
                </div>
                <div id='fieldContainer events active'>
                  <label htmlFor='eventStartTime'>Event Start Time : </label>
                  <input id='eventStartTime' value={eventStartTime} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEventStartTime(e.target.value)
                  }} />
                </div>
              </form>
              {/* <button onSubmit={() => handleUpdateEvents(event._id)}>Update Events</button> */}
              <button onClick={() => handleUpdateEvents(event._id)}>Update Events</button>
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
          <button onClick={handleSubmit}>Submit</button>
        </form>
        <button onClick={() => handleClickEvent()} >Open Events</button>
      </header>
    </div>
  );
}

export default App;

// todo: add ui and functionality to work on event card and adding details such as event time, date, and event start time.
