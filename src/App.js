import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';

function App() {
  const initialEvents = [
    {
      id: 1,
      title: 'Event 1',
      start: '2023-08-07',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Event 2',
      start: '2023-08-12',
      end: '2023-08-15',
      type: 'holiday'
    },
    {
      id: 3,
      title: 'Event 3',
      start: '2023-08-25T14:30:00',
      type: 'appointment'
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  const [selectedType, setSelectedType] = useState('all');

  const handleFilterChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);

    if (type === 'all') {
      setEvents(initialEvents);
    } else {
      const filteredEvents = initialEvents.filter((event) => event.type === type);
      setEvents(filteredEvents);
    }
  };

  const [calendarView, setCalendarView] = useState('dayGridMonth');

  const handleViewChange = (view) => {
    setCalendarView(view);
  };

  const eventTimeFormat = {
    hour: 'numeric',
    minute: '2-digit',
    meridiem: false,
    hour12: false
  };

  const getEventTimeFormat = (date) => {
    return calendarView === 'dayGridMonth' ? 'ss' : moment(date).format('HH:mm');
  };
  return (
    <div className="App">
      <h1>My Calendar App</h1>
      <label>
        Filter Events:
        <select value={selectedType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="meeting">Meetings</option>
          <option value="holiday">Holidays</option>
          <option value="appointment">Appointments</option>
        </select>
      </label>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView={calendarView}
        events={events}
        eventTimeFormat={eventTimeFormat}
        eventContent={(event) => (
          <div>
            <p>{event.title}</p>
            <p>{getEventTimeFormat(event.start)}</p>
          </div>
        )}
      />
    </div>
  );
}

export default App;
