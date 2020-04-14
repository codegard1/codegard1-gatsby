import React from "react";
import { Link, graphql } from "gatsby";
import PostLink from "../components/post-link"

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const PostsPage = ({ data: { allMarkdownRemark: { edges } } }) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />);

  return (
    <Layout>
      <SEO title="Posts" />
      <SEO description="List of blog posts" />
      <h1>Posts</h1>
    ...
      <div>{Posts}</div>
    </Layout>
  );
}

export default PostsPage;

export const pageQuery = graphql`
query {
  allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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