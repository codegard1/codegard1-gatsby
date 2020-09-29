import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/sidebar/Sidebar"

import Table from "../components/blackjack/Table";

const BlackJackPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blackjack" keywords={[`gatsby`, `javascript`, `react`, `web development`, `blackjack`]} />
      <div className="index-main">
        <div className="sidebar px-4 py-2">
          <Sidebar />
        </div>
        <div className="post-list-main">
          <Table/>
          <div className="mt-4 text-center">
          Centered text
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BlackJackPage;

