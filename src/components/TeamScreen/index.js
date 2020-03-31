import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import { createTeamObject } from '../../include/createObject';
import {
  fetchTeamDetails,
  fetchTeamLastEvents,
  fetchTeamNextEvents,
  fetchPlayersByTeamName,
  fetchTeams
} from '../../include/generateEndPoints';
import {
  addTeam,
  removeTeam,
  fetchFavorites
} from '../../stateManager/actions/favorites';
import Event from './Event';
import PlayersList from './PlayersList';
import Header from './Header';
import FanArt from './FanArt';
import PlayerCard from '../PlayerCard';
import { createLogosArray } from '../../stateManager/actions/logos';
import noImg from '../../assets/noImg.png';
import './index.css';

const TeamScreen = props => {
  const [eventsToggler, setEventsToggler] = useState(false);
  const [currPlayer, setCurrPlayer] = useState();
  const [nextEvents, setNextEvents] = useState();
  const [lastEvents, setLastEvents] = useState();
  const [details, setDetails] = useState();
  const [players, setPlayers] = useState();
  const [teams, setTeams] = useState();
  const userId = useSelector(state => state.auth.userId);
  const logos = useSelector(state => state.logos);
  const favoritesArr = useSelector(state => state.favorites.teams);
  const teamName = props.match.params.name;
  const teamId = props.match.params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let [
          fetchedNextEvents,
          fetchedLastEvents,
          fetchedDetails,
          fetchedPlayers,
          fetchedTeams
        ] = await Promise.all([
          axios.get(fetchTeamNextEvents(teamId)),
          axios.get(fetchTeamLastEvents(teamId)),
          axios.get(fetchTeamDetails(teamName)),
          axios.get(fetchPlayersByTeamName(teamName)),
          axios.get(fetchTeams(teamName))
        ]);

        setNextEvents(fetchedNextEvents.data.events);
        setLastEvents(fetchedLastEvents.data.results);
        setDetails(fetchedDetails.data.teams[0]);
        setPlayers(fetchedPlayers.data.player);
        setTeams(fetchedTeams.data.teams);
        dispatch(createLogosArray(fetchedTeams.data.teams));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    dispatch(fetchFavorites());
  }, [teamId, teamName, dispatch]);
  const checkIfFavorite = () => {
    if (favoritesArr) {
      const isFavorite = favoritesArr.find(
        favorite =>
          favorite.userId === userId && favorite.teamId === details.idTeam
      );
      return isFavorite;
    }
  };
  const getFavoriteId = () => {
    const team = favoritesArr.find(
      favorite =>
        favorite.userId === userId && favorite.teamId === details.idTeam
    );
    return team.id;
  };
  const toggleFavorite = () => {
    const { idTeam, strTeam, strTeamBadge } = details;
    checkIfFavorite()
      ? dispatch(removeTeam(getFavoriteId()))
      : dispatch(
          addTeam(createTeamObject(userId, idTeam, strTeam, strTeamBadge))
        );
  };
  const renderHeader = () => {
    return details ? (
      <Header
        key={details.idTeam}
        logo={details.strTeamLogo}
        facebook={details.strFacebook}
        twitter={details.strTwitter}
        instagram={details.strInstagram}
        youtube={details.strYoutube}
        isFavorite={checkIfFavorite()}
        toggleFavorite={() => toggleFavorite()}
        toggleEvents={() => setEventsToggler(!eventsToggler)}
        showEvents={eventsToggler}
      ></Header>
    ) : null;
  };
  const renderPlayerCard = playerId => {
    return <PlayerCard id={playerId} close={() => setCurrPlayer(null)} />;
  };
  const renderErrorPage = () => {
    const isExist = teams
      ? teams.find(team => team.idTeam === teamId && team.strTeam === teamName)
      : true;
    if (!isExist) {
      return <Redirect to='/404' />;
    }
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
            <Event
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
            ></Event>
          );
        })}
      </div>
    ) : null;
  };
  const renderNextEvents = () => {
    return nextEvents && logos && details ? (
      <div className='events-container'>
        {nextEvents.map(event => {
          return (
            <Event
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
            ></Event>
          );
        })}
      </div>
    ) : null;
  };
  const renderEvents = () => {
    return (
      <Slide right>
        <div className={'events-wrapper'}>
          {renderLastEvents()}
          {renderNextEvents()}
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
              show={() => setCurrPlayer(player.idPlayer)}
              img={player.strCutout !== null ? player.strCutout : noImg}
              name={player.strPlayer}
            />
          ))}
      </div>
    ) : null;
  };

  return (
    <div className='team-screen'>
      {renderHeader()}
      {eventsToggler ? renderEvents() : null}
      {renderPlayers()}
      {renderFanArt()}
      {currPlayer ? renderPlayerCard(currPlayer) : null}
      {renderErrorPage()}
    </div>
  );
};
export default TeamScreen;
