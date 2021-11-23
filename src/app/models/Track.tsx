export interface Track {
  track: {
    artist_name: string;
    track_id: number;
    artist_id: number;
    album_name: string;
  };
  disabled: boolean;
}

export interface TrackResponse {
  message: {
    body: {
      track_list: Track[];
    };
  };
}

export interface SnippetResponse {
  message: {
    body: {
      snippet: {
        snippet_body: string;
      };
    };
  };
}
