import React, { useState } from "react";
import Navbar from "./navbar";
import styled from "styled-components";

const Dashboard = () => {
  const [difficulty, setDifficulty] = useState("Easy");
  const [problem, setProblem] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [score, setScore] = useState(null);
  const [evaluationMessage, setEvaluationMessage] = useState("");

  // Function to generate the problem
  const generateProblem = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/generate-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch problem statement");
      }

      const data = await response.json();
      setProblem(data.problem);
      setScore(null); // Reset the score when a new problem is generated
    } catch (error) {
      console.error("Error fetching problem statement:", error);
      setProblem("An error occurred while generating the problem.");
    }
  };

  // Function to submit the GitHub link
  const submitGithubLink = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/evaluate-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ githubLink }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate the GitHub repository");
      }

      const data = await response.json();
      setScore(data.score);
      setEvaluationMessage(data.message);
    } catch (error) {
      console.error("Error evaluating GitHub repository:", error);
      setEvaluationMessage("An error occurred while evaluating the repository.");
    }
  };

  return (
    <>
    <Navbar/>
    <DashboardContainer>
      <Header>
        <Title>Hackathon Problem Generator</Title>
        <Subtitle>Select a difficulty level and generate a problem!</Subtitle>
      </Header>
      <MainContent>
        <LeftPanel>
        <div className="box1">
          <h2>Select Difficulty:</h2>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          </div>
          <button onClick={generateProblem}>Generate a Problem Statement</button>
          {problem && (
            <div>
              <h3 style={{color:"cyan",marginTop:"20px"}}>Generated Problem Statement:</h3>
              <p style={{color:"white"}}>{problem}</p>
              <h4 style={{color:"cyan",marginTop:"20px"}}>Submit Your Project:</h4>
              <input
                type="url"
                placeholder="Enter GitHub link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <button onClick={submitGithubLink} style={{color:"white"}}>Submit for Evaluation</button>
              {evaluationMessage && <p>{evaluationMessage}</p>}
              {score !== null && (
                <div>
                  <h4 style={{color:"white"}}>Your Project Score:</h4>
                  <p style={{color:"white"}}>{score} / 100</p>
                </div>
              )}
            </div>
          )}

          <img src="robot.gif" alt="" />
        </LeftPanel>
      </MainContent>
    </DashboardContainer>
    </>
  );
};

// Styled Components (unchanged from the previous code)
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color:rgb(8, 8, 8);
  color: #333;
  font-family: "Roboto", sans-serif;
  margin-top:50px;

 input{
  padding: 10px;
  border: none;
  height: 30px;
  width: 280px;
  
}
`;

export const Header = styled.header`
  background-color:rgb(8, 8, 8);
  color: white;
  text-align: center;
  padding: 20px 0;
  box-shadow: 0px 4px 6px rgba(26, 24, 24, 0.1);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  color:white;
`;

export const Subtitle = styled.p`
  margin: 5px 0 0;
  font-size: 1.2rem;
  color:white;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 20px;
`;

export const LeftPanel = styled.div`
  flex: 2;
  padding: 15px;
  background: rgba(39, 37, 40, 0.47);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  text-align:center;
  height:600px;
  
  h2{
   color: white;
  font-size: 30px;
  
  }
  select{
  background-color: #00d4ff;
  border-style: none;
  height: 30px;
  width: 140px;
  border-radius:10px;
  margin-top:7px;
  
  }
  .box1{
  display:flex;
  justify-content:center;
  align-item:center;
  gap:50px;

  }
  
button{
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: white;
  height: 30px;
  width: 210px;
  border: none;
  border-radius: 13px;
  margin-top:45px;
  margin-left:10px;

}
button:hover{
  background-color: linear-gradient(135deg, #0d8ca5, #0b4c92);
}

img {
  height: 300px;
  width: 350px;
  position: absolute; /* Enables positioning */
  top: 0; /* Aligns to the top */
  right: 0; /* Aligns to the right */
  margin: 10px; /* Optional: Adds some space around the image */
  z-index: 10; /* Ensures it stays above other elements if needed */
}

`;

export default Dashboard;
