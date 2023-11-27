import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';
import Addtraining from "./Addtraining";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  
  useEffect(() => fetchData(), []);
  
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
  
  const dateFormatter = (params) => {
    const formattedDate = dayjs(params.value).format('DD.MM.YYYY');
    return formattedDate;
  };
  
  const timeFormatter = (params) => {
    const formattedTime = dayjs(params.value).format('HH:mm');
    return formattedTime;
  };

  const deleteTraining = (trainingId) => {
    if (window.confirm("Oletko varma, että haluat poistaa tämän harjoituksen?")) {
      const deleteTrainingLink = `https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`;
  
      fetch(deleteTrainingLink, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            fetchData();
          } else {
            throw new Error("Error deleting training");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const saveTraining = (training) => {
    fetch('https://traineeapp.azurewebsites.net/api/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training),
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  };

  const columns = [
    { field: "date", headerName:"Pvm", sortable: true, filter: true, cellRenderer: dateFormatter, width: 150 },
    { field: "date", headerName: "Aika", sortable: true, filter: true, cellRenderer: timeFormatter, width: 150 },
    { field: "duration", headerName: "Kesto(min)", sortable: true, filter: true, width: 150 },
    { field: "activity", headerName: "Harjoitus", sortable: true, filter: true, width: 200 },
    {
      headerName: 'Asiakas', sortable: true, filter: true, width: 200,
      cellRenderer: (params) => {
        return params.data.customer ? (
          <div>{`${params.data.customer.firstname} ${params.data.customer.lastname}`}</div>
        ) : ( <div> </div>);
      },
    },
    {
      headerName: "Action", cellRenderer: (params) => (
        <>
          <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteTraining(params.data.id)} />
        </>
      ), width: 80,
    },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const gridStyle = useMemo(() => ({ height: '550px', width: '80%' }), []);

  return (
    <div>
      <h1>Harjoituslista</h1>
      <Addtraining saveTraining={saveTraining} />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          rowData={trainings}
          columnDefs={columns}
        />
      </div>
    </div>
  );
}
