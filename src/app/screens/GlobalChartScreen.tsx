import React, { useContext, useMemo } from "react";
import ScoreTable from "../components/ScoreTable";

import { GlobalContext } from "../context/GlobalContext";

const GlobalChartScreen = () => {
  const context = useContext(GlobalContext);

  const bestPlayersList = useMemo(() => {
    let optimizedList = [];

    for (let user of context.state.globalUsers) {
      user.matches.sort((a, b) => b.score - a.score);
    }

    for (let user of context.state.globalUsers) {
      if (user.matches.length)
        optimizedList.push({ ...user.matches[0], userName: user.name });
    }

    optimizedList.sort((a, b) => b.score - a.score);

    return optimizedList;
  }, [context.state.globalUsers]);

  return (
    <div className="text-center px-5 mt-40">
      <p className="mb-5 font-semibold text-2xl">The best players are</p>
      <ScoreTable matches={bestPlayersList} withUserName={true} />
    </div>
  );
};

export default GlobalChartScreen;
