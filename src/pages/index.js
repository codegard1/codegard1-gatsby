import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <SEO description={data.site.siteMetadata.description} />
    <h1>Hi {data.site.siteMetadata.author}</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>{data.site.siteMetadata.description}</p>
    <div style={{ maxWidth: `100px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <h2>Contents</h2>
    <Link to="/page-2/">Page 2</Link>
    <br />
    <Link to="/no-data/">Page with No Data</Link>
    <br />
    <Link to="/page-with-context/">Page With Context</Link>
    <br />
    <Link to="/posts/">Posts</Link>
    <br />
    <Link to="/products/">Products</Link>

  </Layout>
)

export default IndexPage

export const pageQuery = graphql`
    query HomePageQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `