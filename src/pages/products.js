import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const ProductsPage = ({ data: { allProductsJson: { edges } } }) => {
  const Products = edges
.map(edge => (
<div><Link to={`/product/${edge.node.slug}`}>{edge.node.title}</Link></div>));

  return (
    <Layout>
      <SEO title="Products" />
      <SEO description="List of products" />
      <h1>Products</h1>
    ...
      <div>{Products}</div>
    </Layout>
  );
}

export default ProductsPage;

export const pageQuery = graphql`
query {
  allProductsJson {
    edges {
      node {
        slug
        title
        id
      }
    }
  }
}
`