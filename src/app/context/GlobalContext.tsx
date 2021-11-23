import React, { createContext, Dispatch, useReducer } from "react";

import { ActionMap, Types } from "../utils/reducers";

import { User, Match } from "../models/User";

interface InitialStateType {
  currentUserName: string | null;
  totalQuizStep: number;
  currentQuizStep: number;
  currentScore: number;
  lastMatches: Match[];
  globalUsers: User[];
}

interface CustomContext {
  state: InitialStateType;
  dispatch: Dispatch<GlobalActions>;
}

type GlobalPayload = {
  [Types.set_current_user_name]: {
    name: string;
  };
  [Types.game_artist_selected]: {
    pointToAdd: number;
  };
  [Types.restart_game]: {};
  [Types.clear_all]: {};
};

export type GlobalActions =
  ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>];

const initialState: InitialStateType = {
  currentUserName: null,
  totalQuizStep: 5,
  currentQuizStep: 1,
  currentScore: 0,
  lastMatches: [],
  globalUsers: [],
};

const defaultDispatch: Dispatch<GlobalActions> = () => null;

const GlobalContext = createContext<CustomContext>({
  state: initialState,
  dispatch: defaultDispatch,
});

const globalReducer = (state: InitialStateType, action: GlobalActions) => {
  switch (action.type) {
    case Types.set_current_user_name:
      let incomingName = action.payload!.name;
      let userMatches = _saveNewUser(incomingName);

      return {
        ...state,
        currentUserName: action.payload!.name,
        lastMatches: userMatches,
        globalUsers: _getSavedUsers(),
      };

    case Types.game_artist_selected:
      let finalScore = state.currentScore + action.payload!.pointToAdd;
      let futureStep = state.currentQuizStep + 1;
      let finalLastMatches = state.lastMatches;

      if (futureStep > state.totalQuizStep) {
        finalLastMatches = _updateUserGame(state.currentUserName!, finalScore)!;
      }

      return {
        ...state,
        currentQuizStep: futureStep,
        currentScore: finalScore,
        lastMatches: finalLastMatches,
        globalUsers: _getSavedUsers(),
      };

    case Types.restart_game:
      return {
        ...initialState,
        currentUserName: state.currentUserName,
        lastMatches: state.lastMatches,
        globalUsers: state.globalUsers,
      };

    case Types.clear_all:
      return { ...initialState };

    default:
      return state;
  }
};

const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

/**
 *
 */
const _saveNewUser = (incomingName: string) => {
  let addNewUser = true,
    userFound: User | undefined;
  let formatUsers = _getSavedUsers();

  if (formatUsers.length) {
    userFound = formatUsers.find(
      (user) => user.name.toLowerCase() === incomingName.toLowerCase()
    );
    if (userFound) addNewUser = false;
  }

  let newUser: User = {
    name: incomingName,
    matches: [],
  };

  if (addNewUser) {
    formatUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(formatUsers));
  }

  return userFound?.matches || [];
};

/**
 *
 */
const _updateUserGame = (userName: string, score: number) => {
  let formatUsers = _getSavedUsers();

  let userFound = formatUsers.find(
    (user) => user.name.toLowerCase() === userName.toLowerCase()
  );

  if (userFound) {
    userFound.matches.push({ timestamp: new Date().getTime(), score });
    localStorage.setItem("users", JSON.stringify(formatUsers));
  }

  return userFound?.matches;
};

/**
 *
 */
const _getSavedUsers = (): User[] => {
  let rawUsers = localStorage.getItem("users");

  if (rawUsers) return JSON.parse(rawUsers);
  return [];
};

export { GlobalProvider, GlobalContext };
