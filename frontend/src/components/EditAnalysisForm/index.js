import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendNotification } from "../../reducers/notificationsSlice";

import {
    Button,
    Chip,
    Grid,
} from "@mui/material";

import Icons from "../Icons/";

import Loader from "../Loader";


const EditAnalysisForm = (props) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => (state.textToKeywords));

  useEffect(() => {
    if (state.status === "succeeded" && props.topKeywords.length === 0) {

      props.setTopKeywords(state.data.slice(0, 29))
      props.setSuggestionKeywords(state.data.slice(30, state.data.length))
      dispatch(sendNotification({ "message": "Document successfully analysed!", "variant": "success" }));

    } else if (state.status === "failed") {

      dispatch(sendNotification({ "message": "Document failed to analyse", "variant": "error" }));

    };
  }, [state]);


  const handleChipDelete = (e) => {

    const chipToRemove = e.word;
    const chipData = e;
    props.setTopKeywords(props.topKeywords.filter(item => item.word !== chipToRemove));
  
    const keywordToRemove = [...props.removedKeyword].concat(chipData);
    const sortRemovedKeywords = keywordToRemove.sort((a, b) => (b.value > a.value) ? 1 : -1);
    props.setRemovedKeyword(sortRemovedKeywords);

  };

      
  const handleChipReturn = (e) => {

    const chipToReturn = e.word;
    const chipData = e;
    props.setRemovedKeyword(props.removedKeyword.filter(item => item.word !== chipToReturn))
  
    if(chipData.index < 30) {

      const returnKeyword = [...props.topKeywords].concat(chipData);
      const sortReturnKeywords = returnKeyword.sort((a, b) => (b.value > a.value) ? 1 : -1);
      props.setTopKeywords(sortReturnKeywords);

    } else {

      props.setSuggestionKeywords(props.suggestionKeywords.filter(item => item.word !== chipToReturn));

      const returnSuggestionKeyword = [...props.topKeywords].concat(chipData);
      const sortReturnSuggestionKeywords = returnSuggestionKeyword.sort((a, b) => (b.value > a.value) ? 1 : -1);
      props.setTopKeywords(sortReturnSuggestionKeywords);
    };
  
  };
  

  const handleSave = () => {
  
    props.setActiveStep(3);

  };


  return (
    <Grid container spacing={2} className="gridCenterItems">
      <Grid item xs={10}>

        {state.status === "loading" ? (

          <Loader />

        ) : state.status === "succeeded" && (
          <>
            <h4>Top Keywords</h4>

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs>

                  {props.topKeywords.map((d, i) => (

                  <Chip
                    key={d.index.toString()}
                    label={d.word}
                    color="info"
                    style={{ margin: "5px", backgroundColor: "#42a5f5" }}
                    onDelete={() => handleChipDelete(d)}
                  />
                  ))}

                </Grid>
              </Grid>
            {props.suggestionKeywords.length > 0 && (
              <>
                <h5>Suggested Keywords</h5>
                
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs>

                    {props.suggestionKeywords.map((d, i) => (
                

                      <Chip
                        key={d.index.toString()}
                        label={d.word}
                        color="info"
                        style={{ margin: "5px", backgroundColor: "#ba68c8" }}
                        onDelete={() => handleChipReturn(d)}
                        deleteIcon={<Icons.AddCircle />}
                      />
                  
                    ))}
                  </Grid>
                </Grid>
              </>
            )}

            {props.removedKeyword.length > 0 && (
              <>
                <h5>Removed Keywords</h5>

                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item xs>

                    {props.removedKeyword.map((d, i) => (

                      <Chip
                        key={d.index.toString()}
                        label={d.word}
                        style={{ margin: "5px" }}
                        onDelete={() => handleChipReturn(d)}
                        deleteIcon={<Icons.AddCircle />}
                      />

                    ))}

                  </Grid>
                </Grid>
              </>
            )}

            {props.activeStep === 2 && (
              <Button 
                variant="contained" 
                component="label"
                style={{ 
                  borderRadius: "50px", 
                  margin: "30px 0 0 10px", 
                  padding: "10px 20px 10px 10px",
                  backgroundColor: "rgba(99,255,107,0.5)",
                }} 
                onClick={() => handleSave()}
                sx={{ textTransform: "none" }} 
              >
                <Icons.BubbleChartIcon style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                <div style={{ color: "#505050" }}>
                  View Results
                </div>
              </Button>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default EditAnalysisForm;