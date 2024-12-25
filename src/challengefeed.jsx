import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChallengeFeed = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // Fetch challenges from the API
    const fetchChallenges = async () => {
      try {
        const response = await fetch("/api/challenges");
        const data = await response.json();
        setChallenges(data.challenges || []);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, []);

  return (
    <FeedContainer>
      <Title>Challenge Feed</Title>
      <ChallengeList>
        {challenges.length > 0 ? (
          challenges.map((challenge, index) => (
            <ChallengeCard key={index}>
              <ChallengeTitle>{challenge.title}</ChallengeTitle>
              <ChallengeDescription>{challenge.description}</ChallengeDescription>
              <ChallengeTag>Difficulty: {challenge.level}</ChallengeTag>
            </ChallengeCard>
          ))
        ) : (
          <NoChallenges>No challenges available</NoChallenges>
        )}
      </ChallengeList>
    </FeedContainer>
  );
};



export const FeedContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 500px;
  overflow-y: auto;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ChallengeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const ChallengeCard = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const ChallengeTitle = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #007bff;
`;

export const ChallengeDescription = styled.p`
  margin: 10px 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

export const ChallengeTag = styled.span`
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  background: #007bff;
  color: #fff;
  border-radius: 15px;
  font-size: 0.9rem;
`;

export const NoChallenges = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;
`;


export default ChallengeFeed;
