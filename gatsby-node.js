/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');

exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {

  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const result = await graphql(`
  {
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]}, 
      limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
    }
  }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additional data can be passed via context
    });
  });

  createPage({
    path: "/no-data/",
    component: require.resolve("./src/templates/no-data.js"),
  });

  createPage({
    path: "/page-with-context/",
    component: require.resolve("./src/templates/with-context.js"),
    context: {
      title: "We Don’t Need No Stinkin’ GraphQL!",
      content: "<p>This is page content.</p><p>No GraphQL required!</p>",
      additionalData: "Yolo",
    },
  });

  const products = require("./src/data/products.json")
  products.forEach(product => {
    createPage({
      path: `/product/${product.slug}/`,
      component: require.resolve("./src/templates/product.js"),
      context: {
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
      },
    })
  })

  const learnings = require("./src/data/learnings.json");
  learnings.forEach(learning => {
    createPage({
      path: `/learning/${learning.key}/`,
      component: require.resolve("./src/templates/learning.js"),
      context: {
        id: learning.key,
        work: learning.work || "",
        notes: learning.notes || "",
        date: learning.date
      }
    });
  });



}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
  type LearningJson implements Node @dontInfer{
    key: ID
    date: Date
    work: [Work]
    notes: [Note]
  }
  type Work {
    work: String
  }
  type Note {
    note: String
  }
  `
}