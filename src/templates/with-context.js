import React from "react"

const WithContext = ({ pageContext }) => (
  <section>
    <h1>{pageContext.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }} />
    <h1>{pageContext.additionalData}</h1>
  </section>
)

export default WithContext
