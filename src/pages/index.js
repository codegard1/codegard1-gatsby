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
    .map(edge => (
      <div>
        <p><Link to={edge.node.frontmatter.path}>{edge.node.frontmatter.title} &nbsp;&nbsp; {edge.node.frontmatter.date}</Link>
          <br />
          {edge.node.excerpt}
          <br />
          <Link to={edge.node.frontmatter.path}>more...</Link>
        </p>
      </div>)
    );

  return (
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

      <h1>Blog</h1>
      <div>
        {Posts}
      </div>



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