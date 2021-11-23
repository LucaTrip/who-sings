import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

import { GlobalContext } from "../context/GlobalContext";

import chartTracksApi from "../api/chartTracks";
import { Track } from "../models/Track";
import Game from "../components/Game";
import Button from "../components/Button";
import { Types } from "../utils/reducers";

const getRandomInt = (max: number) => Math.floor(Math.random() * max) || 0;

const GameScreen = () => {
  const [lyric, setLyric] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [randomTrackId, setRandomTrackId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mainIntervalId, setMainIntervalId] = useState<any>();
  const [countdown, setCountdown] = useState(5);

  const context = useContext(GlobalContext);

  const history = useHistory();

  const handleRequest = async () => {
    try {
      setIsError(false);
      setIsLoading(true);

      const chartTracksResponse = await chartTracksApi.getChartTracks();
      let trackList = chartTracksResponse.data.message.body.track_list;
      setTracks(() =>
        trackList.map((item) => {
          item.disabled = false;
          return item;
        })
      );

      let trackId = trackList[getRandomInt(3)].track.track_id;
      setRandomTrackId(trackId);

      const snippetResponse = await chartTracksApi.getSmallLyric(trackId);
      setLyric(snippetResponse.data.message.body.snippet.snippet_body);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let intervalId: any;

    if (context.state.currentQuizStep <= context.state.totalQuizStep) {
      handleRequest();

      setCountdown(5);
      let tempCountdownValue = 5;

      intervalId = setInterval(() => {
        setCountdown((prevVal) => {
          tempCountdownValue = prevVal - 1;
          return tempCountdownValue;
        });

        if (tempCountdownValue === 0) {
          context.dispatch({
            type: Types.game_artist_selected,
            payload: { pointToAdd: 0 },
          });
          setCountdown(5);
        }
      }, 1000);
      setMainIntervalId(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [context]);

  const onHandleArtistSelected = () => {
    clearInterval(mainIntervalId);

    setTracks((prevTracks) =>
      prevTracks.map((item) => {
        item.disabled = true;
        return item;
      })
    );
  };

  return (
    <div className="text-center px-5 mt-40">
      {context.state.currentQuizStep <= context.state.totalQuizStep ? (
        <Game
          isLoading={isLoading}
          isError={isError}
          lyric={lyric}
          tracks={tracks}
          randomTrackId={randomTrackId}
          currentStep={context.state.currentQuizStep}
          totalStep={context.state.totalQuizStep}
          onHandleArtistSelected={onHandleArtistSelected}
          countdown={countdown}
        />
      ) : (
        <div className="text-2xl">
          <p>Game finished!</p>
          <p>
            This is your total score <b>{context.state.currentUserName}</b>
          </p>
          <p className="italic text-5xl my-5">{context.state.currentScore}</p>
          <div>
            <Button
              text={"Retry"}
              onHandleClick={() => {
                context.dispatch({ type: Types.restart_game });
              }}
              buttonTypology={"multiple"}
            />
            <Button
              text={"My Account"}
              buttonTypology={"multiple"}
              onHandleClick={() => {
                history.push("/account");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
