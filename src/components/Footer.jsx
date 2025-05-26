import React from "react";
import '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer>
            <span> logo </span>
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Ticket Office. All rights reserved.</p>
                <nav>
                <ul>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
                </nav>
            </div>
        </footer>
    );
}
export default Footer;