import React, { useContext, useState } from "react";

import { GlobalContext } from "../context/GlobalContext";
import { Types } from "../utils/reducers";

type Props = {
  artist_name: string;
  track_id: number;
  randomTrackId: number;
  disabled: boolean;
  album_name: string;
  onHandleArtistSelected: () => void;
};

const Card: React.FC<Props> = ({
  artist_name,
  track_id,
  album_name,
  randomTrackId,
  disabled,
  onHandleArtistSelected,
}) => {
  const [bgColorCard, setBgColorCard] = useState("bg-white");
  const [textColorCard, setTextColorCard] = useState("text-black");

  const context = useContext(GlobalContext);

  const checkIfArtistIsCorrect = () => {
    let pointToAdd = 0;
    if (track_id === randomTrackId) {
      setBgColorCard("bg-green-500");
      pointToAdd = 1;
    } else {
      setBgColorCard("bg-red-500");
    }
    setTextColorCard("text-white");

    setTimeout(() => {
      context.dispatch({
        type: Types.game_artist_selected,
        payload: { pointToAdd },
      });
    }, 1000);
  };

  return (
    <button
      disabled={disabled}
      onClick={() => {
        onHandleArtistSelected();
        checkIfArtistIsCorrect();
      }}
      className={`${bgColorCard} ${textColorCard} flex-1 rounded-lg overflow-hidden bg-white m-5 p-6 shadow-md transform transition duration-300 hover:scale-105 max-w-sm`}
    >
      <p className="text-center font-semibold text-lg">
        <span className="italic text-xl">{artist_name}</span>
        <br />
        <span className="text-gray-400">in</span>
        <br />
        <span className="italic text-xl">{album_name}</span>
      </p>
    </button>
  );
};

export default Card;
