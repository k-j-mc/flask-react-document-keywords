import React, { useEffect, useRef } from "react";

import {
  Grid
} from "@mui/material";

import "./visualiser.css"

import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";


const ResultsVisualiser = (props) => {

  const chart = useRef(null);

  useEffect(() => {
  
    var x = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
    x.data = props.data;

    var networkSeries = x.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    networkSeries.showOnInit = false;
    networkSeries.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());

    networkSeries.dataFields.value = "value";
    networkSeries.dataFields.name = "word";

    x.zoomable = true;
    networkSeries.manyBodyStrength = - 5;
    networkSeries.fontSize = 20;

    networkSeries.nodes.template.label.text = "{word}";
    networkSeries.nodes.template.label.truncate = true;
    networkSeries.nodes.template.label.horizontalCenter = "middle";
    networkSeries.nodes.template.label.verticalCenter = "middle";

    networkSeries.tooltip.label.wrap = true;
    networkSeries.tooltip.label.maxWidth = 300;
    networkSeries.nodes.template.tooltipHTML = `<center>{word}<br/>Weight: {value}</center>`;
    
    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [props.data]);

  
  return (
    <Grid container spacing={2} className="gridCenterItems">
      <Grid item xs={10}>
        <h4>Keyword chart</h4>
        <div id="chartdiv" />
      </Grid>
    </Grid>
  );
};

export default ResultsVisualiser;