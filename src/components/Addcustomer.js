import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';


export default function AddCar(props){
    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = React.useState({
        firstname : "", 
        lastname:"",
        email : "", 
        phone: "", 
        streetaddress : "", 
        postcode:"",
        city:""
    })
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    setCustomer('');
    };

    const handleInputChange = (event) =>{
        setCustomer ({...customer, [event.target.name]: event.target.value})
    }

    const addCustomer = () =>{
        props.saveCustomer(customer);
        handleClose()
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <AddBoxRoundedIcon color ="primary" sx ={{ fontSize: 40}} onClick={handleClickOpen} style ={{cursor:'pointer'}}/>
                <span style={{ fontSize: '20px',fontWeight: 'bold'}}>Lisää uusi asiakas</span>
             </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id = "form-dialog-title">Uusi asiakas </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value = {customer.firstname}
                        label= "Etunimi"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="lastname"
                        value = {customer.lastname}
                        label= "Sukunimi"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="email"
                        value = {customer.email}
                        label= "Sähköposti"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    /> <TextField
                        margin="dense"
                        name="phone"
                        value = {customer.phone}
                        label= "Phone"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value = {customer.streetaddress}
                        label= "Osoite"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                     <TextField
                        margin="dense"
                        name="postcode"
                        value = {customer.postcode}
                        label= "Postinumero"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value = {customer.city}
                        label= "Kaupunki"
                        fullWidth
                        onChange = {e => handleInputChange(e)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color = "primary">Cancel</Button>
                    <Button onClick={addCustomer} color = "primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}