export interface User {
  name: string;
  matches: Match[];
}

export interface Match {
  timestamp: number;
  score: number;
  userName?: string;
}
