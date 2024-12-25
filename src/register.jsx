import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Signin() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    skills: "",
    foi: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const skills = formData.get("skills");
    const foi = formData.get("foi");

    try {
      const res = await axios.post("http://localhost:5001/api/user/register", {
        username,
        email,
        password,
        skills,
        foi,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="card">
        <div className="left">
          <img
            src="https://t3.ftcdn.net/jpg/08/57/94/28/360_F_857942877_4wpnYJVWAiso1dgVnoVuVnqwFcHLuTCp.jpg"
            alt="side-img"
          />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <h1>InnovateHub</h1>
            </div>
            <input
              type="text"
              name="username"
              required
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            <input
              type="text"
              name="skills"
              required
              placeholder="Skills"
              onChange={handleChange}
            />
            <input
              type="text"
              name="foi"
              required
              placeholder="Field of Interest"
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
            <span>
              Already have an account? <Link to="/login">Login.</Link>
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212; /* Light black background color */

  .card {
    display: flex;
    flex-direction: row;
    background-color: #1e1e1e; /* Dark black for card */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.5);
    width: 900px;
    height: 600px;
  }

  .left {
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #1e1e1e;

    .brand {
      text-align: center;
      margin-bottom: 20px;
      padding-top:-20px;
      h1 {
        color: #ffffff;
        font-size: 2rem;
      }
    }

    input {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #edcef8; /* Default grey underline */
  padding: 0.5rem 0;
  color: #ffffff;
  width: 100%;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  outline: none;
  transition: border-bottom 0.3s ease;

  &:focus {
    border-bottom: 2px solid transparent;
    background: linear-gradient(90deg, #9b5de5, #8338ec);
    -webkit-background-clip: text; /* Clip the gradient text */
    color: white;
    position: relative;
  }

  &:focus::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #9b5de5, #8338ec); /* Purple gradient */
  }
}

    }

    button {
      background: linear-gradient(135deg, #007bff, #00d4ff); /* Blue gradient */
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      width: 100%;
      text-transform: uppercase;
      transition: background 0.3s ease;
      &:hover {
        background: linear-gradient(90deg, #1e5adf, #4c8bf5);
      }
    }

    span {
      font-size: 0.9rem;
      color: #aaaaaa;
      margin-top: 2rem;
      text-align: center;
      margin-left:100px;
      a {
        color: #4c8bf5;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Signin;
