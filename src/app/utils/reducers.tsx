export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload?: M[Key];
      };
};

export enum Types {
  set_current_user_name = "setCurrentUserName",
  game_artist_selected = "gameArtistSelected",
  restart_game = "restartGame",
  clear_all = "clearAll",
}
