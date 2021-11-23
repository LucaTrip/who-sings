import React, { useContext } from "react";
import { IoLogOutOutline } from "react-icons/io5";

import { GlobalContext } from "../context/GlobalContext";
import { Types } from "../utils/reducers";

const Header = () => {
  const context = useContext(GlobalContext);

  return (
    <div className="flex justify-end m-4 relative">
      <p className="font-semibold text-3xl absolute top-0 left-1/2 transform -translate-x-1/2">
        Who Sings?
      </p>

      <button
        onClick={() => {
          context.dispatch({ type: Types.clear_all });
        }}
      >
        <IoLogOutOutline size="35" color="red" />
      </button>
    </div>
  );
};

export default Header;
