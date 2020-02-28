import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { fetchPlayerDetails } from '../../include/generateEndPoints';

const PlayerScreen = props => {
  const [details, setDetails] = useState();
  const playerName = props.match.params.name;
  const playerId = props.match.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = fetchPlayerDetails(playerId);
        const res = await axios.get(url);
        setDetails(res.data.players[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [playerName, playerId]);
  const renderPlayer = () => {
    console.log(details);
    return details ? (
      <div>
        <h2>{details.strPlayer}</h2>
        <img src={details.strThumb} alt={details.strPlayer} />
      </div>
    ) : (
      <ClipLoader color='#fff' />
    );
  };
  return <div>{renderPlayer()}</div>;
};

export default PlayerScreen;
