import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';


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
        fetch(props.customer)
        .then((response) => response.json())
        .then((data) => setCustomer(data))
        .catch((error) => console.error(error));
        setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleInputChange = (event) =>{
        setCustomer ({...customer, [event.target.name]: event.target.value})
    }

    const updateCustomer = () =>{
        props.updateCustomer(customer,props.customer);
        handleClose()
    }
    return (
        <div>
            <EditIcon color ="primary" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id = "form-dialog-title">Muokka asiakastietoja</DialogTitle>
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
                        label= "Puhelin"
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
                    <Button onClick={updateCustomer} color = "primary">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}