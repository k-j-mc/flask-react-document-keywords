import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { getKeywords } from "../../reducers/textToKeywordsSlice";

import {
    Button,
    Grid,
    TextField,
} from "@mui/material";

import Icons from "../Icons";

import Loader from "../Loader";


const EditDocument = (props) => {

    const dispatch = useDispatch();
    const state = useSelector((state) => (state.documentToText));

    const handleSave = () => {

        const documentText = {
          "title": props.title,
            "text": state.data
        }

        dispatch(getKeywords(documentText))
        props.setActiveStep(2);

    };


    return (
        <Grid container spacing={2} className="gridCenterItems">
            <Grid item xs={10}>

                {state.status === "loading" ? (

                    <Loader />

                ) : state.status === "succeeded" && (

                    <div>

                        {props.title.length > 0 && (

                            <h2 style={{ padding: "30px 0 30px 0" }}>
                                <Icons.PictureAsPdfIcon style={{ margin: "0 0 -3px 0" }} />
                                {props.title}
                            </h2>

                        )}

                        {state.data.length > 0 && (
                            <>
                                <TextField 
                                    fullWidth 
                                    multiline
                                    id="outlined-basic" 
                                    label="Text" 
                                    variant="outlined"
                                    autoComplete="off" 
                                    defaultValue={state.data} 
                                    onChange={(e) => props.setPDFData(e.target.value)}
                                />    

                                <Button 
                                    variant="contained" 
                                    component="label"
                                    style={{ 
                                        borderRadius: "50px", 
                                        margin: "30px 0 0 10px", 
                                        padding: "10px 20px 10px 10px",
                                        backgroundColor: "rgb(186, 104, 200,0.5)",
                                    }} 
                                    onClick={() => handleSave()}
                                    sx={{ textTransform: "none" }} 
                                >

                                    <Icons.TroubleshootIcon style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                                    <div style={{ color: "#505050" }}>
                                        Analyse text
                                    </div>

                                </Button>

                            </>
                        )}

                    </div>

     
                )} 
            </Grid>
        </Grid>
    );
};

export default EditDocument;