import React from "react";

import Card from "../components/Card";

const HomeScreen = () => {
  return (
    <div className="container mx-auto mt-40">
      <div className="flex flex-wrap">
        {["game", "account"].map((item) => (
          <Card key={item} name={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
