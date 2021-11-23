import React, { useContext, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useHistory } from "react-router";

import { GlobalContext } from "../context/GlobalContext";
import { Match } from "../models/User";
import Button from "../components/Button";
import ScoreTable from "../components/ScoreTable";

const AccountScreen = () => {
  const context = useContext(GlobalContext);
  const [orderedList] = useState<Match[]>(
    context.state.lastMatches.sort((a, b) => b.timestamp - a.timestamp)
  );

  const history = useHistory();

  return (
    <div className="text-center px-5 mt-40">
      <div className="flex items-center justify-center">
        <IoPersonCircleOutline size="150" color="black" />
        <p className="text-2xl font-semibold ml-2">
          {context.state.currentUserName}
        </p>
      </div>

      <div>
        <Button
          text={"Play new match"}
          buttonTypology={"multiple"}
          onHandleClick={() => history.push("/game")}
        />
        <Button
          text={"See global chart"}
          buttonTypology={"multiple"}
          onHandleClick={() => history.push("/chart")}
        />
      </div>

      {!orderedList.length ? (
        <p className="text-center my-5 text-2xl font-semibold">
          You haven't played any games yet. Try playing!
        </p>
      ) : (
        <ScoreTable matches={orderedList} />
      )}
    </div>
  );
};

export default AccountScreen;
