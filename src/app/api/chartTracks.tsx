import axiosInstance from "./client";
import { SnippetResponse, TrackResponse } from "../models/Track";

const endpointTopChart = "/chart.tracks.get";
const endpointTrackSnippet = "/track.snippet.get";

const getChartTracks = () =>
  axiosInstance.get<TrackResponse>(endpointTopChart, {
    params: {
      page: Math.floor(Math.random() * 14) + 1,
      chart_name: "top",
      page_size: 3,
      country: "it",
      f_has_lyrics: 1,
    },
  });

const getSmallLyric = (track_id: number) =>
  axiosInstance.get<SnippetResponse>(endpointTrackSnippet, {
    params: { track_id },
  });

export default { getChartTracks, getSmallLyric };
