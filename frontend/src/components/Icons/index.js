import React, { forwardRef } from "react";

import Add from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";


const Icons = {
  
  Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
  AddCircle: forwardRef((props, ref) => <AddCircleIcon {...props} ref={ref} />),
  BubbleChartIcon: forwardRef((props, ref) => <BubbleChartIcon {...props} ref={ref} />),
  PictureAsPdfIcon: forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
  Restart: forwardRef((props, ref) => <RestartAltIcon {...props} ref={ref} />),
  TroubleshootIcon: forwardRef((props, ref) => <TroubleshootIcon {...props} ref={ref} />),

};


export default Icons;