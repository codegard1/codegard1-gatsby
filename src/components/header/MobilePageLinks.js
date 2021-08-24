import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
  return (
    <div className="mobile-pages-main">
      <div className="text-center">
        <p className="d-inline p-3">
          <Link to="/"><span className="text-dark">Blog Home</span></Link></p>
        <p className="d-inline p-2">
          <Link to="/about"><span className="text-dark">About</span></Link></p>
        <p className="d-inline p-2">
          <Link to="/archive"><span className="text-dark">Archive</span></Link></p>
        <p className="d-inline p-2">
          <Link to="/blackjack"><span className="text-dark">Blackjack</span></Link></p>
        <p className="d-inline p-3">
          <Link to="/gallery"><span className="text-dark">Gallery</span></Link>
        </p>
      </div>
    </div>
  )
}

export default MobilePages


