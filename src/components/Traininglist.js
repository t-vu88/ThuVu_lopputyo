import React, {useState, useEffect, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';

export default function Traininglist(){

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
    
    const columns = [
        {field : "date" , headerName : "Pvm", sortable : true, filter : true, cellRenderer: dateFormatter, width : 150},
        {field : "date" , headerName : "Aika", sortable : true, filter : true, cellRenderer: timeFormatter, width: 150},
        {field : "duration" , headerName : "Kesto(min)", sortable : true, filter : true, width : 150},
        {field : "activity" , headerName : "Harjoitus", sortable : true, filter : true, width : 200},
        {headerName: 'Asiakas', sortable: true, filter: true, width : 200, 
            valueGetter: (params) => {
                return params.data.customer.firstname + " " + params.data.customer.lastname;
            },
        },
        {headerName: ""}
    ]

    const pagination = true;
    const paginationPageSize = 10;
    const gridStyle = useMemo(() => ({ height: '550px', width: '70%' }), []);

    return (
        <div>
            <h1> Harjoitusten lista</h1>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact 
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    rowData={trainings} 
                    columnDefs={columns}/>
            </div>   
        </div>
    )
}