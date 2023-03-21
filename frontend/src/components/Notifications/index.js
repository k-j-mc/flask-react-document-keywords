import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";


const Notifications = () => {

    const state = useSelector((state) => (state.notifications));
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if(state.status === "succeeded"){

            enqueueSnackbar(state.data.message, { variant: state.data.variant, preventDuplicate: true });

        };
    }, [state]);
  
};

export default Notifications;