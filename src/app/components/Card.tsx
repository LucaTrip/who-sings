import React from "react";
import { useHistory } from "react-router";

type Props = {
  name: string;
};

const Card: React.FC<Props> = ({ name }) => {
  let history = useHistory();

  return (
    <div className="my-10 px-10 w-full md:w-1/2 lg:my-4 lg:px-4 transform transition duration-300 hover:scale-105">
      <button
        onClick={() => history.push(`/${name}`)}
        className="overflow-hidden rounded-md shadow-md bg-white flex items-start justify-center h-full w-full"
      >
        <div className="flex flex-col p-4">
          <h1 className="text-2xl font-bold capitalize mb-4">
            {name === "game" ? name + " 🔥" : name + " 🥷"}
          </h1>
          {name === "game" ? (
            <div>
              <p className="">
                Who sings? Is a quiz card with one line of lyrics and you have 3
                artists to choose from.
                <br />
                You have to choose which singer's lyrics are and you have 5
                levels to score a maximum of 5 points.
              </p>
            </div>
          ) : (
            <p className="">
              See your account and the points of the last games
            </p>
          )}
        </div>
      </button>
    </div>
  );
};

export default Card;
