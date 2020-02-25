import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { fetchTeams } from '../../include/generateEndPoints';
// import { createLogosArray } from '../../stateManager/actions/logos';
import './index.css';
// import { useDispatch } from 'react-redux';

const TeamsList = () => {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState(null);
  // const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = fetchTeams();
        const res = await axios.get(url);
        setTeams(res.data.teams);
        setLoading(false);
        // dispatch(createLogosArray(res.data.teams));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const renderTeams = () => {
    return teams ? (
      <div className='teams-container'>
        {teams.map(team => (
          <Link key={team.idTeam} to={`/Team/${team.idTeam}/${team.strTeam}`}>
            <img
              className='team-img'
              src={team.strTeamBadge}
              alt={team.strTeam}
            ></img>
          </Link>
        ))}
      </div>
    ) : (
      <div className='spinner'>
        <ClipLoader color={'#f5f5f5'} size={100} loading={loading} />
      </div>
    );
  };

  return renderTeams();
};
export default TeamsList;
