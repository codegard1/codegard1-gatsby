import React from "react"
import {
    FaLinkedin,
    FaGithubSquare,
    FaStackOverflow,
    FaSoundcloud,
    // FaFreeCodeCamp,
    // FaTwitterSquare
} from "react-icons/fa"
import "./sidebar.css"


const SocialLinks = ({ contacts }) => {
    return (
        <div className="side-social-links float-left mt-3 mb-3">
            <a className="text-secondary p-2"
                href={contacts.linkedin}>
                <span title="Linked In">
                    <FaLinkedin size={26} style={{ color: "secondary" }} />
                </span>
            </a>
            <a className="text-secondary p-2"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{ color: "secondary" }} />
                </span>
            </a>
            <a className="text-secondary p-2"
                href={contacts.stackoverflow}>
                <span title="Stack Overflow">
                    <FaStackOverflow size={26} style={{ color: "secondary" }} />
                </span>
            </a>
            <a className="text-secondary p-2"
                href={contacts.soundcloud}>
                <span title="Soundcloud">
                    <FaSoundcloud size={26} style={{ color: "secondary" }} />
                </span>
            </a>
        </div>
    )
}

export default SocialLinks