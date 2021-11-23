import React, { useContext, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import ArtistCard from "../components/ArtistCard";
import { GlobalContext } from "../context/GlobalContext";
import { Track } from "../models/Track";
import { Types } from "../utils/reducers";

type Props = {
  isLoading: boolean;
  isError: boolean;
  lyric: string;
  tracks: Track[];
  randomTrackId: number;
  currentStep: number;
  totalStep: number;
  countdown: number;
  onHandleArtistSelected: () => void;
};
const Game: React.FC<Props> = ({
  isLoading,
  isError,
  lyric,
  tracks,
  randomTrackId,
  currentStep,
  totalStep,
  countdown,
  onHandleArtistSelected,
}) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <Loader
            type="MutatingDots"
            color="dodgerblue"
            secondaryColor="dodgerblue"
            width={100}
            height={100}
            visible={isLoading}
          />
        </div>
      ) : null}

      {isError ? (
        <p className="text-xl text-center">Somethings went wrong</p>
      ) : null}

      {!isLoading && !isError ? (
        <div>
          <p className="text-xl">Who sings this piece?</p>
          <p className="my-10 italic text-5xl text-blue-500">
            "... {lyric} ..."
          </p>
          <div className="flex flex-col justify-center sm:flex-row">
            {tracks.map((item) => (
              <ArtistCard
                disabled={item.disabled}
                key={item.track.track_id}
                {...item.track}
                randomTrackId={randomTrackId}
                onHandleArtistSelected={onHandleArtistSelected}
              />
            ))}
          </div>

          <div className="text-6xl text-center flex w-full items-center justify-center">
            <div className="w-24 mx-1 p-2 bg-white text-blue-500 rounded-lg">
              <div className="font-mono leading-none" x-text="seconds">
                {countdown}
              </div>
              <div className="font-mono uppercase text-sm leading-none">
                Seconds
              </div>
            </div>
          </div>

          <p className="text-right pr-5 font-semibold text-xl">
            {currentStep} / {totalStep}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
