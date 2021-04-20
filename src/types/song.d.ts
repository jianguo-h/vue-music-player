export interface ISong {
  FileName?: string;
  SongName?: string;
  SingerName?: string;
}

export interface IPlayLrc {
  startTime: string;
  curLrc: string;
  index: number;
}
