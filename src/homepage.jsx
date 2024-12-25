import React from "react";
import Navbar from "./navbar";
import { Banner } from "./banner";
import "./banner.css"



function Home(){
  return(
    <>
    <Navbar/>
    <Banner/>
    <h1>Our Features</h1>
    <div className="mid">
      
      <div className="mid1">
        <span>🎯</span>
        <h3>AI-Generated Challenges</h3>
        <p>Get challenges tailored to your skills and industry trends.</p>

      </div>
      <div className="mid1">
        <span>🤖</span>
        <h3>Real-Time AI Mentor</h3>
        <p>Debug faster, code smarter, and stay motivated with our AI-powered assistant.</p>

      </div>
      <div className="mid1">
        <span>🤝</span>
        <h3>Smart Team Formation</h3>
        <p>Find and collaborate with teammates who complement your strengths.</p>

      </div>
      <div className="mid1">
        <span> 📈</span>
        <h3>Dynamic Scoring System</h3>
        <p>Receive instant feedback and adaptive scores for your submissions.</p>

      </div>
      

    </div>

    <div className="image">
      <div className="img1">
        <img src="https://media.hackerearth.com/blog/wp-content/uploads/2019/09/Capture_HAckathon_wordpress.jpg" alt="" />
      </div>
      <div className="img1">
        <img src="https://images.wondershare.com/mockitt/hackathon/ui-ux-hackathon.jpg" alt="" />
      </div>
      <div className="img1">
        <img src="https://contentstatic.techgig.com/photo/msid-75253545/5-Mistakes-to-avoid-while-participating-in-a-hackathon.jpg" alt="" />
      </div>
    </div>
<h1>Hear from Our Innovators</h1>
  <div className="testimonial">
    <div className="two">
    <div className="test1">
      <p className="name">Sarah M.</p>
      <p className="feedback">
      This platform helped me land my dream job. The challenges were so engaging!
      </p>
      <p className="title">
      Software Engineer
      </p>
    </div>
    <div className="test1">
      <p className="name">Sarah M.</p>
      <p className="feedback">
      This platform helped me land my dream job. The challenges were so engaging!
      </p>
      <p className="title">
      Software Engineer
      </p>
    </div>
    </div>
    <div className="test1" style={{marginLeft:"550px"}}>
      <p className="name">Sarah M.</p>
      <p className="feedback">
      This platform helped me land my dream job. The challenges were so engaging!
      </p>
      <p className="title">
      Software Engineer
      </p>
    </div>
  </div>

  <div className="about">
    <h3 style={{marginTop:"20px",fontSize:"30px"}}>About Us</h3>
    <p style={{marginTop:"10px"}}>At InnovateHub, we empower innovators worldwide to solve real-world challenges through cutting-edge, AI-driven virtual hackathons. Our platform personalizes every experience with tailored challenges, dynamic scoring, and real-time AI mentorship, making innovation accessible to everyone.

Join a global community, collaborate seamlessly, and tackle future-ready themes like AI, fintech, and climate change. Whether you're a developer, designer, or entrepreneur, InnovateHub is your gateway to learning, growth, and making an impact.</p>
<h5>Innovate. Collaborate. Elevate.</h5>
<p className="line">Join us today and shape the future!</p>
  </div>

  <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/features">Features</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">🐙</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
        </div>
      </div>
      <div className="footer-copyright">
        © 2024 InnovateHub. All rights reserved.
      </div>
    </footer>

    
    </>
  );
}

export default Home;