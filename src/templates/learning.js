import React from "react";

const Learning = ({ pageContext }) => (
  <div>
    <h1>#{pageContext.id}{pageContext.date}</h1>
    <p>{pageContext.work}</p>
    <div dangerouslySetInnerHTML={{ __html: pageContext.notes }} />
  </div>
);

export default Learning;
