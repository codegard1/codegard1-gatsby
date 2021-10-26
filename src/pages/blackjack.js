import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Sidebar from "../components/sidebar/Sidebar";

// Please ensure that this builds successfully before deploying
import Table from "../components/blackjack/Table";

const BlackJackPage = ({ data }) => {
  return (
    <Layout>
      <SEO
        title="Blackjack"
        keywords={[
          `gatsby`,
          `javascript`,
          `react`,
          `web development`,
          `blackjack`,
        ]}
      />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          <h2>Chris's Blackjack</h2>
          <p>
            <a
              href="https://github.com/codegard1/blackjack"
              target="_blank"
              rel="noreferrer"
            >
              Here's the github repo
            </a>
            <br />
            <a
              href="https://blackjack.ciaervo.com"
              target="_blank"
              rel="noreferrer"
            >
              Here's a more experimental version of the app
            </a>{" "}
            (may not work well)
          </p>
          <Table />
        </div>
      </div>
    </Layout>
  );
};

export default BlackJackPage;
