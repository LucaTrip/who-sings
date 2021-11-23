import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";

import { GlobalContext } from "../context/GlobalContext";
import { Types } from "../utils/reducers";

const UserInputScreen = () => {
  const [userName, setUserName] = useState("");
  const context = useContext(GlobalContext);

  let history = useHistory();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    context.dispatch({
      type: Types.set_current_user_name,
      payload: { name: userName },
    });
    history.push("/home");
  };

  return (
    <div className="text-center mt-40">
      <h1 className="text-xl mb-7">
        Let's play together!
        <br />
        Enter your name and start the challenge
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm m-auto">
        <div className="flex items-center border-b border-blue-600 py-2">
          <input
            className="flex-1 appearance-none bg-transparent border-none text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Your name"
            aria-label="Full name"
            value={userName}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <Button text={"Start"} buttonTypology={"single"} />
        </div>
      </form>
    </div>
  );
};

export default UserInputScreen;
