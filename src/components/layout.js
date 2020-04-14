/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import Header from "./header"
import "./layout.css"
import "office-ui-fabric-react/dist/css/fabric.min.css";
import { initializeIcons } from "@uifabric/icons";

/* Initialize Fabric Icons */
initializeIcons();

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Fabric>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </div>
    </Fabric>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
