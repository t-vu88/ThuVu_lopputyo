import React, {useState, useEffect, useMemo} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Customerlist(){

    const [customers, setCustomers] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => setCustomers(data.content))
          .catch(error => console.error('Error fetching data:', error));
      };
    const columns = [
        {field : "firstname" , headerName : "Etunimi", sortable : true, filter : true, width: 130},
        {field : "lastname" , headerName : "Sukunimi", sortable : true, filter : true, width: 150},
        {field : "email" , headerName : "Sähköposti", sortable : true, filter : true, width: 220},
        {field : "phone" , headerName : "Puhelinnumero", sortable : true, filter : true, width: 200},
        {field : "streetaddress" , headerName : "Osoite", sortable : true, filter : true, width: 200},
        {field : "postcode" , headerName : "Postinumero", sortable : true, filter : true, width: 150},
        {field : "city" , headerName : "Kaupunki", sortable : true, filter : true, width: 150},
        {headerName: ""}
    ]
    const pagination = true;
    const paginationPageSize = 10;
    
    const gridStyle = useMemo(() => ({ height: '550px', width: '100%' }), []);
    return (
      <div>
        <h1> Asiakasluettelo </h1>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact 
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              rowData={customers} 
              columnDefs={columns} />
          </div>
    </div>
    )
}