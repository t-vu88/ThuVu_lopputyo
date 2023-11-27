
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Kalenteri = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const events = trainings.map(training => {
    const customerName = `${training.customer?.firstname} ${training.customer?.lastname}` ?? 'No Customer';
    return {
      title: `${training.activity}/${customerName}`,
      start: new Date(training.date),
      end: moment(training.date).add(training.duration, 'minutes').toDate(),
    };
  });
 
  return (
    <div>
      <h2>Kalenteri</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 , fontSize :'13px'}}
    />

    </div>
  );
};

export default Kalenteri;
