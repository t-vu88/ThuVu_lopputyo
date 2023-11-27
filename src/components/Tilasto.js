
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { sumBy, groupBy } from 'lodash';

const Tilasto = () => {
  const [chartData, setChartData] = useState([]);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTraininglist();
  }, []);

  const fetchTraininglist = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    // Laske kunkin toiminnan keston summa.
    const groupedActivityType = groupBy(trainings, 'activity');
    const  DurationOfEachActivityType= Object.keys(groupedActivityType).map(activity => ({
      activity,
      duration: sumBy(groupedActivityType[activity], 'duration'),
    }));

    setChartData(DurationOfEachActivityType);
  }, [trainings]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
        <XAxis dataKey="activity" />
        <YAxis>
          <Label value="Duration(min)" angle={-90} position="insideLeft" offset={10} />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#1382d6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Tilasto;
