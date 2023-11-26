import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const gridRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/api/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const deleteCustomer = (link) => {
    if (window.confirm('Oletko varma, että haluat poistaa tämän asiakkaan?')) {
      fetch(link, { method: 'DELETE' })
        .then((res) => {
          if (res.ok) {
            console.log('Customer deleted successfully.');
            fetchData();
          } else {
            throw new Error('Error deleting customer');
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const saveCustomer = (customer) => {
    fetch('https://traineeapp.azurewebsites.net/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const updateCustomer = (customer, link) => {
    fetch(link, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    })
      .then((res) => fetchData())
      .catch((err) => console.error(err));
  };

  const columns = [
    { field: 'firstname', headerName: 'Etunimi', sortable: true, filter: true, width: 130 },
    { field: 'lastname', headerName: 'Sukunimi', sortable: true, filter: true, width: 150 },
    { field: 'email', headerName: 'Sähköposti', sortable: true, filter: true, width: 220 },
    { field: 'phone', headerName: 'Puhelinnumero', sortable: true, filter: true, width: 200 },
    { field: 'streetaddress', headerName: 'Osoite', sortable: true, filter: true, width: 200 },
    { field: 'postcode', headerName: 'Postinumero', sortable: true, filter: true, width: 150 },
    { field: 'city', headerName: 'Kaupunki', sortable: true, filter: true, width: 150 },
    {
      headerName: 'Action',
      cellRenderer: (params) => <Editcustomer updateCustomer={updateCustomer} customer={params.data.links[1].href} />,
      width: 80,
    },
    {
      headerName: '',
      cellRenderer: (params) => (
        <DeleteIcon style={{ color: 'red' }} onClick={() => deleteCustomer(params.data.links[1].href)} />
      ),
      width: 80,
    },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const gridStyle = useMemo(() => ({ height: '550px', width: '100%' }), []);
  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div>
      <h1> Asiakasluettelo</h1>
      <div>
        <button style = {{padding: '15px 20px', backgroundColor: '#1976d2', fontSize:'16px', fontWeight: 'bold',
        color: 'white',border: 'none', borderRadius: '5px',marginBottom:'15px', cursor:'pointer'}} 
        onClick={onBtnExport}> Export CSV tiedostoon
        </button>
      </div>
      <Addcustomer saveCustomer={saveCustomer} />
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowSelection="single"
          ref={gridRef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          rowData={customers}
          columnDefs={columns}
          domLayout="autoHeight"
          defaultColDef={{ resizable: true }}
        />
      </div>
      
    </div>
  );
}
