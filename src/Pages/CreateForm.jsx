
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc,updateDoc } from 'firebase/firestore'
import db from './firebase'
import './CreateForm.css'
import FormField from './FormFields'


import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';


function CreateForm() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const formRef = doc(db, "FeedbackForms", id);

  //form name state
  const [formName,setformName]=useState(null);

//Form dialog on clicking add button
  const [open, setOpen] = React.useState(false);

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getForm = async () => {
      try {
        const docSnap = await getDoc(formRef);
        if (docSnap.exists()) {
          const formData=docSnap.data();
          setForm(formData);
          setformName(formData["Form Name"])
        } else {
          console.log("No such form");
        }

      } catch (err) {
        console.log(err);
      }
    }
    getForm();
  }, [id]);

  //on changing form name change the state
  const handleNameChange=(e)=>{
      setformName(e.target.value);
  };

  return (
    <div className="dash">

     

      {form ? (
        <Box >
          <Card className="cardbody" variant="outlined" sx={{ minWidth: 330, minHeight: "70vh" }}>
            <CardContent>
              <div className="banner" style={{ fontSize: '40px'}}>
                 <Button > <ArrowBackIosIcon/> </Button>
                {formName}
                <Button onClick={handleClickOpen}> <EditIcon/>  </Button>
              </div>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {form.Comment}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                Rating :{form.Rating}
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>

            <Dialog
              open={open}
              onClose={handleClose}
              PaperProps={{
                component: 'form',
                onSubmit: async (event) => {
                  event.preventDefault();
                  try{
                    await updateDoc(formRef,{"Form Name":formName})

                  }catch(err)
                  {
                    console.log(err);
                  }
                  handleClose();
                },
              }}
            >
              <DialogTitle>Edit Form Name</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Enter name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={formName}
                  onChange={handleNameChange}
                  sx={{minWidth:"20vw"}}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Save</Button>
              </DialogActions>
            </Dialog>

            </CardActions>
          </Card>
        </Box>

      ) : (
        <p>Loading...</p>
      )}
         <FormField></FormField>
    </div>
  );
}
export default CreateForm;