import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi Stephanie</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <br />
    <Link to="/no-data/">Go to No Data</Link>
    <br />
    <Link to="/page-with-context/">Go to With Context</Link>
    <br />
    <Link to="/product/">Go to Product</Link>
    <br />
    <Link to="/all-pokemon/">Pokemon</Link>
  </Layout>
)

export default IndexPage
