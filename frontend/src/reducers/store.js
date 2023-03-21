import { configureStore } from "@reduxjs/toolkit";

import documentToTextReducer from "./documentToTextSlice";
import textToKeywordsReducer from "./textToKeywordsSlice";
import resultsDataReducer from "./resultsDataSlice";
import notificationsReducer from "./notificationsSlice";

export default configureStore({
  reducer: {
    documentToText: documentToTextReducer,
    textToKeywords: textToKeywordsReducer,
    resultsData: resultsDataReducer,
    notifications: notificationsReducer,
  },
})