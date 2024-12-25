import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ChallengePage = ({ challengeId }) => {
  const [challenge, setChallenge] = useState(null);
  const [solution, setSolution] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    // Fetch challenge details from the API
    const fetchChallenge = async () => {
      try {
        const response = await fetch(`/api/challenges/${challengeId}`);
        const data = await response.json();
        setChallenge(data.challenge);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/challenges/${challengeId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ solution }),
      });
      const data = await response.json();
      setSubmissionStatus(data.message || "Submission successful!");
    } catch (error) {
      console.error("Error submitting solution:", error);
      setSubmissionStatus("Submission failed. Please try again.");
    }
  };

  if (!challenge) {
    return <LoadingMessage>Loading challenge...</LoadingMessage>;
  }

  return (
    <PageContainer>
      <Title>{challenge.title}</Title>
      <Description>{challenge.description}</Description>
      <Details>
        <DetailItem>
          <strong>Difficulty:</strong> {challenge.level}
        </DetailItem>
        <DetailItem>
          <strong>Category:</strong> {challenge.category}
        </DetailItem>
      </Details>
      <SolutionContainer>
        <SolutionLabel>Submit Your Solution:</SolutionLabel>
        <SolutionInput
          placeholder="Enter your solution here..."
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
        {submissionStatus && <SubmissionMessage>{submissionStatus}</SubmissionMessage>}
      </SolutionContainer>
    </PageContainer>
  );
};



export const PageContainer = styled.div`
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
  line-height: 1.6;
`;

export const Details = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

export const DetailItem = styled.div`
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;
`;

export const SolutionContainer = styled.div`
  margin-top: 30px;
`;

export const SolutionLabel = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
`;

export const SolutionInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  resize: vertical;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

export const SubmissionMessage = styled.p`
  margin-top: 15px;
  font-size: 1rem;
  color: green;
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #777;
`;


export default ChallengePage;
