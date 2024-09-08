import { useEffect, useState } from "react";
import db from './firebase'
import { getDocs, collection,addDoc } from 'firebase/firestore';
import './Dashboard.css'
import { useNavigate } from "react-router-dom";

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Dashboard = () => {

  const navigate=useNavigate();

  const [FormList, setFormList] = useState([]);
  const FormCollectionRef = collection(db, "FeedbackForms");

  //For creating form in firebase
  const [docRef,setdocRef]=useState(null);


  //Form dialog on clicking add button
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getFormList = async () => {
      try {
        const data = await getDocs(FormCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setFormList(filteredData);
      } catch (err) {
        console.log(err);
      }

    }
    getFormList();
  }, []);


  return (

    <div className="dash">

      <Box >
        <Card variant="outlined" sx={{ minWidth: 300, minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CardContent>
            <Button onClick={handleClickOpen} sx={{ fontSize: '80px', paddingLeft: 5, pb: 5 }}>
              <AddIcon fontSize="inherit" />
            </Button>

            <Typography variant="h4">
              New form
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
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries(formData.entries());
                  const name = formJson.name;
            
                  try{
                    const dr= await addDoc(FormCollectionRef,{"Form Name" :name});
                    setdocRef(dr);
                    console.log(dr.id);
                    navigate(`/createForm/${dr.id}`);

                  }catch(err)
                  {
                    console.log(err);
                  }
                  handleClose();
                },
              }}
            >
              <DialogTitle>Create Feedback Form</DialogTitle>
              <DialogContent>
                To create a form type the form name here
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Form name"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogActions>
            </Dialog>

          </CardActions>
        </Card>
      </Box>

      {FormList.map((Form) => (

        <div key={Form.id} className="FormCard">
          <Box >
            <Card variant="outlined" sx={{ minWidth: 300, minHeight: 360 }}>
              <CardContent>
                <div className="top" style={{ fontSize: '40px', textAlign: "center" }}>
                  <AssignmentIcon fontSize="inherit"></AssignmentIcon>
                </div>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                  {Form.Comment}
                </Typography>
                <Typography variant="h5">
                  {/* be{bull}nev{bull}o{bull}lent */}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant="body2">
                  Rating :{Form.Rating}
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Box>
        </div>

      ))}

    </div>

  );
}
export default Dashboard;