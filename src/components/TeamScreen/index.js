import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';
import {
  fetchTeamDetails,
  fetchTeamLastEvents,
  fetchTeamNextEvents,
  fetchPlayersByTeamName,
  fetchTeams
} from '../../include/generateEndPoints';
import noImg from '../../assets/noImg.png';
import './index.css';
const TeamScreen = props => {
  const [nextEvents, setNextEvents] = useState();
  const [lastEvents, setLastEvents] = useState();
  const [teamDetails, setTeamDetails] = useState();
  const [teamPlayers, setTeamPlayers] = useState();
  const teamName = props.match.params.name;
  const teamId = props.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const asyncReq = [
          axios.get(fetchTeamNextEvents(teamId)),
          axios.get(fetchTeamLastEvents(teamId)),
          axios.get(fetchTeamDetails(teamName)),
          axios.get(fetchPlayersByTeamName(teamName)),
          axios.get(fetchTeams(teamName))
        ];
        let [
          fetchedNextEvents,
          fetchedLastEvents,
          fetchedTeamDetails,
          fetchedTeamPlayers,
          fetchedTeams
        ] = await Promise.all(asyncReq);

        setNextEvents(fetchedNextEvents.data.events);
        setLastEvents(fetchedLastEvents.data.results);
        setTeamDetails(fetchedTeamDetails.data.teams[0]);
        setTeamPlayers(fetchedTeamPlayers.data.player);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [teamId, teamName]);

  const renderPlayers = () => {
    return teamPlayers ? (
      <div className='players-container'>
        {teamPlayers
          .filter(player => player.strPosition !== 'Manager')
          .map(player => (
            <div key={player.idPlayer} className='img-container'>
              <div className='overlay'>
                <div className='player-name'>{player.strPlayer}</div>
              </div>
              <img
                className='player-img'
                src={player.strCutout !== null ? player.strCutout : noImg}
                alt={player.strPlayer}
              />
            </div>
          ))}
      </div>
    ) : (
      <ClipLoader color={'#f5f5f5'} />
    );
  };
  return <div>{renderPlayers()}</div>;
};
export default TeamScreen;
