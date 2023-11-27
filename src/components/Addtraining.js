import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: null
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCustomers(data.content))
            .catch(error => console.error('Error fetching customer list:', error));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: '',
            duration: '',
            activity: '',
            customer: null
        });
    };

    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    };

    const addTraining = () => {
        if (training.customer) {
            const selectedCustomer = training.customer;
            const customerIDLink = selectedCustomer.links[1].href;
            const updatedTraining = { ...training, customer: customerIDLink, date: training.date.toISOString() };
            props.saveTraining(updatedTraining);
          }
        
        handleClose();
    }
  
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
                <AddBoxRoundedIcon color="primary" sx={{ fontSize: 40 }} onClick={handleClickOpen} style ={{cursor:'pointer'}}/>
                <span style={{ fontSize: '20px',fontWeight: 'bold'}}>Lisää uusi harjoitus</span>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DialogTitle id="form-dialog-title">Lisää uusi harjoitus</DialogTitle>
                    <DialogContent style={{ minWidth: '300px', minHeight: '300px' }}>
                        <DateTimePicker
                            style={{ paddingTop: '20px' }}
                            onChange={(value) => setTraining({ ...training, date: value })}
                            label="Pvm ja aika"
                            inputFormat="DD/MM/YYYY HH:mm"
                            format="DD/MM/YYYY HH:mm"
                            ampm={false}
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            name="activity"
                            value={training.activity}
                            label="Harjoitus"
                            fullWidth
                            onChange={(e) => handleInputChange(e)}
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            name="duration"
                            value={training.duration}
                            label="Kesto (min)"
                            fullWidth
                            onChange={(e) => handleInputChange(e)}
                            variant="standard"
                        />
                        {console.log('Customer List:', customers)}
                        <Autocomplete
                            margin="dense"
                            name="customer"
                            value={training.customer}
                            options={customers}
                            getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                            onChange={(event, value) => setTraining({ ...training, customer: value })}
                            renderInput={(params) => (
                                <TextField {...params} label="Asiakas" fullWidth variant="standard" />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={addTraining} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </LocalizationProvider>
            </Dialog>
        </div>
    );
}
