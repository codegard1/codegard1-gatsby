import { Icon } from "office-ui-fabric-react/lib/Icon";
// import { Link } from "office-ui-fabric-react/lib/Link";
import React from "react"
import { Link, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostLink from "../components/post-link";

const IndexPage = ({ data }) => {
  const Posts = data.allMarkdownRemark.edges
  .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  .map(edge => (<div><PostLink key={edge.node.id} post={edge.node} />{edge.node.excerpt}</div>));

return(
  <Layout>
    <SEO title="Home" />
    <SEO description={data.site.siteMetadata.description} />



    <h1>Hello, I'm Chris</h1>

    <ul>
      <li>
        I'm a SharePoint Developer at &nbsp;<OutboundLink href="https://www.ramsa.com">RAMSA</OutboundLink>
      </li>
      <li>
        I make business applications in SharePoint with a heavy emphasis on custom code and re-usable solutions.
      </li>
      <li>
        I'm beginning to move away from SharePoint <em>per se</em> and more towards Azure, the Power Platform, and Office 365.
      </li>
      <li>
        Unfortunately I can't update this site very often. Please forgive the lack of cutting-edge technology.
      </li>
    </ul>

    <h1>Contact Me</h1>
    <p>
      By Email:{" "}
      <OutboundLink href="mailto:c.odegard@gmail.com">c.odegard[at]gmail.com</OutboundLink>
      <br />
      Or find me on these sites:&nbsp;&nbsp;
      <OutboundLink href="https://www.linkedin.com/in/codegard1">
        LinkedIn
      </OutboundLink>
      &nbsp;&nbsp;
      <OutboundLink href="https://github.com/codegard1">
        Github
      </OutboundLink>
    </p>

    <h1>Posts</h1>
    <div>
      {Posts}
    </div>

    <h1>Projects</h1>
    <p>This is what I'm doing currently:</p>
    <ul>
      <li>Starting to learn <OutboundLink href="https://opendylan.org/">Dylan</OutboundLink> for fun and as a change of pace</li>
      <li>Contributing to the <OutboundLink href="https://github.com/dylan-lang/vscode-dylan">Dylan Extension for VS Code</OutboundLink></li>
      <li>Teaching myself computer science by reading textbooks</li>
      <li>
        Building a CRM system in SharePoint, integrating Deltek Vision with
        BDCS, and making extensive use of the Term Store
      </li>
      <li>Learning server management by managing my own little server farm at home</li>
      <li>
        Writing lots of PowerShell scripts to automate moving data in SharePoint
      </li>
    </ul>
    <p>
      Some of my other interests include, but are not limited to:
    </p>
    <ul>
      <li>PowerShell</li>
      <li>Knowledge Management</li>
      <li>
        <OutboundLink href="http://powerbi.microsoft.com">Power BI</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://nodejs.org/en/">NodeJS</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://facebook.github.io/react/">React</OutboundLink>
      </li>
      <li>
        <OutboundLink href="http://dev.office.com/fabric#/components">Fabric UI</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview">SharePoint Framework</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://www.nintex.com/">Nintex Workflows</OutboundLink>
      </li>
      <li>
        <OutboundLink href="http://jquery.com/">jQuery</OutboundLink>
      </li>
      <li>
        <OutboundLink href="https://leanpub.com/understandinges6/read">ES6</OutboundLink>
      </li>
    </ul>

  </Layout>
);
}

export default IndexPage

export const pageQuery = graphql`
    query HomePageQuery {
  site {
    siteMetadata {
      title
      author
    }
  }
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          path
          title
        }
      }
    }
  }
    }
  `