import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch teams from the API
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/teams");
        const data = await response.json();
        setTeams(data.teams || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <TeamContainer>
      <Title>Team Management</Title>
      {loading ? (
        <LoadingMessage>Loading teams...</LoadingMessage>
      ) : teams.length > 0 ? (
        <TeamList>
          {teams.map((team, index) => (
            <TeamCard key={index}>
              <TeamName>Team {index + 1}</TeamName>
              <MemberList>
                {team.map((member, i) => (
                  <Member key={i}>
                    {member.name} ({member.skills.join(", ")})
                  </Member>
                ))}
              </MemberList>
            </TeamCard>
          ))}
        </TeamList>
      ) : (
        <NoTeams>No teams available</NoTeams>
      )}
    </TeamContainer>
  );
};



export const TeamContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.8rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TeamCard = styled.div`
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

export const TeamName = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
`;

export const MemberList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Member = styled.li`
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

export const NoTeams = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 20px;
`;


export default TeamManagement;
