import React, { useState, useEffect } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { sendNotification } from "./reducers/notificationsSlice";

import { SnackbarProvider } from 'notistack';

import HomePage from "./pages/HomePage";

import Notifications from "./components/Notifications";
import NavBar from "./components/NavBar";
import Loader from "./components/Loader";

import './App.css';


const App = () => {

  const dispatch = useDispatch();


  const [loaded, setLoaded] = useState(false);



  useEffect(() => {
      axios("/analysis/handshake")
        .then(response => {
          if(response.status === 200) {

            return response;

          }

        })
        .then(response => {
          setLoaded(true);
        })
        .catch(error => {
          dispatch(sendNotification({ "message": error.response.data, "variant": "error" }));
        });

    }, []);


  return (

    <div>
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={2000}
      >

        <NavBar />
        <Notifications />

        {loaded === false ? (

          <div className="gridCenterItems">
            <Loader />
          </div>

        ) : (

          <HomePage />

        )}
      </SnackbarProvider>
    </div>
  );
}

export default App;
