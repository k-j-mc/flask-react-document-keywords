import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getText } from "../../reducers/documentToTextSlice";
import { sendNotification } from "../../reducers/notificationsSlice";

import {
    Button,
    Grid,
  } from "@mui/material";

import Icons from "../Icons";


const DocumentUploadForm = (props) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => (state.documentToText));

  const [newFile, setNewFile] = useState(false);


  useEffect(() => {
    if(newFile === true) {
      if (state.status === "succeeded") {

        dispatch(sendNotification({ "message": "Document successfully read!", "variant": "success" }));
        props.setPDFData(state.data)
        
        props.setActiveStep(1);
        setNewFile(false)
  
      } else if (state.status === "failed") {
  
        dispatch(sendNotification({ "message": "Document failed to read", "variant": "error" }));
        setNewFile(false)
  
      }
    }
    
  }, [state]);


  const onFileUpload = async (e) => {
    setNewFile(true);
    const file = e.target.files[0];

    props.setTitle(file.name);


    if (file != null) {
      const documentData = new FormData();
      documentData.append('file_from_react', file);
      dispatch(getText(documentData));

    };

  };

  return(

    <Grid container spacing={2} className="gridCenterItems">
      <Grid item xs={10}>
        <Button 
          variant="contained" 
          component="label"
          style={{ 
            borderRadius: "50px", 
            margin: "10px", 
            padding: "10px 20px 10px 10px",
            backgroundColor: "rgba(99,255,107,0.5)",
          }} 
          sx={{ textTransform: "none" }} 
        >
          <Icons.Add style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
          <div style={{ color: "#505050" }}>
              Add PDF
              <input
                  type="file"
                  className="playerProfilePic_home_title"
                  onChange={(e) => onFileUpload(e)}
                  hidden
              />
          </div>
        </Button>
      </Grid>
    </Grid>

  );
  
};

export default DocumentUploadForm;