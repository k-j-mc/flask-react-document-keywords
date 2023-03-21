import React, { useEffect, useState } from "react";

import {
    Grid
} from "@mui/material";

import NavigationStepper from "../components/NavigationStepper";
import ResultsPage from "./ResultsPage";


const HomePage = (props) => {

    const [activeStep, setActiveStep] = useState(0);

    const [completedSteps, setCompletedSteps] = useState(0);

    const [title, setTitle] = useState("");

    const [topKeywords, setTopKeywords] = useState([]);
    const [suggestionKeywords, setSuggestionKeywords] = useState([]);
    const [removedKeyword, setRemovedKeyword] = useState([]);

    const [PDFData, setPDFData] = useState("");

    useEffect(() => {

        setCompletedSteps(activeStep);

    }, [activeStep])


    return (
        <Grid container spacing={2} className="gridCenterItems">
            <Grid item xs={10}>
                <NavigationStepper 
                    activeStep={activeStep} 
                    setActiveStep={setActiveStep} 

                    completedSteps={completedSteps} 

                    title={title}
                    setTitle={setTitle}

                    PDFData={PDFData}
                    setPDFData={setPDFData}

                    topKeywords={topKeywords}
                    setTopKeywords={setTopKeywords}

                    suggestionKeywords={suggestionKeywords}
                    setSuggestionKeywords={setSuggestionKeywords}

                    removedKeyword={removedKeyword}
                    setRemovedKeyword={setRemovedKeyword}
                />

                {activeStep === 3 && (
                    <ResultsPage 
                        activeStep={activeStep} 
                        setActiveStep={setActiveStep} 

                        title={title}
                        setTitle={setTitle}

                        topKeywords={topKeywords}
                        setTopKeywords={setTopKeywords}

                        suggestionKeywords={suggestionKeywords}
                        setSuggestionKeywords={setSuggestionKeywords}

                        removedKeyword={removedKeyword}
                        setRemovedKeyword={setRemovedKeyword}

                        PDFData={PDFData}
                    />
                )} 

            </Grid>
        </Grid>
    );
};

export default HomePage;