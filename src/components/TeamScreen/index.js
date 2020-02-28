import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';
import Slide from 'react-reveal/Slide';
import {
  fetchTeamDetails,
  fetchTeamLastEvents,
  fetchTeamNextEvents,
  fetchPlayersByTeamName,
  fetchTeams
} from '../../include/generateEndPoints';
import TeamEvents from './TeamEvents';
import PlayersList from './PlayersList';
import TeamHeader from './TeamHeader';
import FanArt from './FanArt';
import { createLogosArray } from '../../stateManager/actions/logos';
import noImg from '../../assets/noImg.png';
import './index.css';

const TeamScreen = props => {
  const [eventsToggler, setEventsToggler] = useState(false);
  const [nextEvents, setNextEvents] = useState();
  const [lastEvents, setLastEvents] = useState();
  const [details, setDetails] = useState();
  const [players, setPlayers] = useState();
  const logos = useSelector(state => state.logos);
  const teamName = props.match.params.name;
  const teamId = props.match.params.id;
  const dispatch = useDispatch();

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
          fetchedDetails,
          fetchedPlayers,
          fetchedTeams
        ] = await Promise.all(asyncReq);

        setNextEvents(fetchedNextEvents.data.events);
        setLastEvents(fetchedLastEvents.data.results);
        setDetails(fetchedDetails.data.teams[0]);
        setPlayers(fetchedPlayers.data.player);
        dispatch(createLogosArray(fetchedTeams.data.teams));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [teamId, teamName, dispatch]);
  const renderHeader = () => {
    console.log(details);
    return details ? (
      <TeamHeader
        key={details.idTeam}
        banner={details.strTeamLogo}
        facebook={details.strFacebook}
        twitter={details.strTwitter}
        instagram={details.strInstagram}
        youtube={details.strYoutube}
      ></TeamHeader>
    ) : (
      <ClipLoader color={'#fff'} />
    );
  };
  const renderFanArt = () => {
    return details ? (
      <FanArt
        imgs={[
          details.strTeamFanart1,
          details.strTeamFanart2,
          details.strTeamFanart3,
          details.strTeamFanart4
        ]}
      />
    ) : null;
  };

  const renderLastEvents = () => {
    return lastEvents && logos && details ? (
      <div className='events-container'>
        {lastEvents.map(event => {
          return (
            <TeamEvents
              key={event.idEvent}
              currTeam={details.idTeam}
              homeTeam={{
                id: event.idHomeTeam,
                name: event.strHomeTeam,
                score: event.intHomeScore
              }}
              awayTeam={{
                id: event.idAwayTeam,
                name: event.strAwayTeam,
                score: event.intAwayScore
              }}
              date={event.dateEvent}
            ></TeamEvents>
          );
        })}
      </div>
    ) : null;
  };
  const renderNextEvents = () => {
    return nextEvents && logos && details ? (
      <div className='events-container'>
        {nextEvents.reverse().map(event => {
          return (
            <TeamEvents
              key={event.idEvent}
              currTeam={details.idTeam}
              homeTeam={{
                id: event.idHomeTeam,
                name: event.strHomeTeam
              }}
              awayTeam={{
                id: event.idAwayTeam,
                name: event.strAwayTeam
              }}
              date={event.dateEvent}
            ></TeamEvents>
          );
        })}
      </div>
    ) : null;
  };
  const renderEvents = () => {
    return (
      <Slide right opposite collapse when={eventsToggler}>
        <div className={'events-wrapper'}>
          {renderNextEvents()}
          {renderLastEvents()}
        </div>
      </Slide>
    );
  };
  const renderPlayers = () => {
    return players ? (
      <div className='players-container'>
        {players
          .filter(player => player.strPosition !== 'Manager')
          .map(player => (
            <PlayersList
              key={player.idPlayer}
              id={player.idPlayer}
              img={player.strCutout !== null ? player.strCutout : noImg}
              name={player.strPlayer}
            />
          ))}
      </div>
    ) : (
      <ClipLoader color={'#fff'} />
    );
  };
  return (
    <div>
      <div
        className='events-toggle'
        onClick={() => {
          setEventsToggler(!eventsToggler);
        }}
      >
        <p className='toggle-btn'>
          {eventsToggler ? 'Hide Events' : 'Show Events'}
        </p>
      </div>
      {renderHeader()}
      {renderEvents()}
      {renderPlayers()}
      {renderFanArt()}
    </div>
  );
};
export default TeamScreen;
