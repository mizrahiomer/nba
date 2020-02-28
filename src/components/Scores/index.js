import React, { useState, useEffect } from 'react';
import Ticker from 'react-ticker';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';
import { fetchLastEvents } from '../../include/generateEndPoints';
import './index.css';

const Scores = () => {
  const [scores, setScores] = useState();
  const [move, setMove] = useState(true);
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const url = fetchLastEvents();
        const res = await axios.get(url);
        setScores(res.data.events);
      } catch (e) {
        console.log(e);
      }
    };

    fetchScores();
  }, []);

  const renderTicker = () => {
    return (
      <div className='scores'>
        {scores ? (
          <Ticker move={move} offset='run-in' speed={10}>
            {() =>
              scores.map(score => {
                const scoreDetails = `${score.strEventAlternate} : ${score.intAwayScore} - ${score.intHomeScore}
               `;

                return (
                  <span
                    onMouseOver={() => {
                      setMove(false);
                    }}
                    onMouseLeave={() => {
                      setMove(true);
                    }}
                    className='score'
                    key={score.idEvent}
                  >
                    {scoreDetails}
                  </span>
                );
              })
            }
          </Ticker>
        ) : (
          <ClipLoader color={'#fff'} />
        )}
      </div>
    );
  };
  return renderTicker();
};
export default Scores;
