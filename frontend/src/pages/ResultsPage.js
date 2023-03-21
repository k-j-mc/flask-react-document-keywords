import React from "react";

import {
    Button,
    Grid
} from "@mui/material";

import Icons from "../components/Icons";

import EditAnalysisForm from "../components/EditAnalysisForm";
import ResultsVisualiser from "../components/ResultsVisualiser";
import DocumentOutput from "../components/DocumentOutput";


const ResultsPage = (props) => {

    return (

        <Grid>
            <ResultsVisualiser 
                data={props.topKeywords}
            />

            <EditAnalysisForm 

                topKeywords={props.topKeywords}
                setTopKeywords={props.setTopKeywords}

                suggestionKeywords={props.suggestionKeywords}
                setSuggestionKeywords={props.setSuggestionKeywords}

                removedKeyword={props.removedKeyword}
                setRemovedKeyword={props.setRemovedKeyword}
            />

            <DocumentOutput 
                topKeywords={props.topKeywords}
                PDFData={props.PDFData}
            />

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
                onClick={() => props.setActiveStep(0)}
            >
                <Icons.Restart style={{ padding: "0 10px 0 5px", color: "#505050" }}  />
                <div style={{ color: "#505050" }}>
                    Start again
                </div>
            </Button>

        </Grid>
    );
};


export default ResultsPage;