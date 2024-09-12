export interface IChannel {
  id: number;
  uuid: string;
  title: string;
  slot: number;
}

export interface ISection {
  id: number;
  title: string;
  order: number;
  channels: IChannel[];
}

export interface ISectionChannel {
  sectionTitle: string;
  channelTitle: string;
  uuid: string;
}
