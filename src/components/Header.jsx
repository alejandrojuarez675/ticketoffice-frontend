import React from "react";
import '../styles/Header.module.css';

export default function header () {
  return (
    <header>
        <span> logo </span>
        <h1>Ticket Office</h1>
        <nav>
            <ul>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Sign In</a></li>
                <li><a href="#">Register</a></li>
            </ul>
        </nav>
    </header>
  );
}
