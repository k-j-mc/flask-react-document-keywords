import React, { useState, useEffect } from "react";

import {
  Grid
} from "@mui/material";


const DocumentOutput = (props) => {

  const [keywordTags, setKeywordTags] = useState([]);


  useEffect(() => {

      const keywords = [];

      props.topKeywords.map((d, i) => {

          keywords.push(d.word);

      });

      setKeywordTags(keywords)

  }, [props.topKeywords])


  function Highlight({ children: text = "", keywordTags = [] }) {

      if (!keywordTags?.length) return text;

      const output = text.replace(/(?:\r\n|\r|\n)/g, "<br>");

      const matches = [...output.matchAll(new RegExp('\\b' + keywordTags.join('|') + '\\b', 'gi'))];

      const startText = output.slice(0, matches[0]?.index);


      return (

        <span>

          {startText}

          {matches.map((match, i) => {

            const startIndex = match.index;
            const currentText = match[0];
            const endIndex = startIndex + currentText.length;
            const nextIndex = matches[i + 1]?.index;
            const untilNextText = output.slice(endIndex, nextIndex);

            return (

              <span key={i.toString()}>

                <mark style={{ backgroundColor: "rgb(255 255 0 / 0.5)" }}>{currentText}</mark>
                {untilNextText}
              </span>
            );
          })}
        </span>
      );
    }

  return (
    <Grid container spacing={2} className="gridCenterItems">
      <Grid item xs={10}>
        <h4>Highlighted text</h4>
        <Highlight keywordTags={keywordTags}>{props.PDFData}</Highlight>
      </Grid>
    </Grid>
  );
};

export default DocumentOutput;