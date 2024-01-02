export interface Datums {
  datums: Datum[];
}

export interface Datum {
  code: string;
  name: string;
  port?: Port;
  city?: City;
  country: Country;
  region?: Region;
  domestic: boolean;
  awardTicket: boolean;
  starAwardTicket: boolean;
  hideInBooker: boolean;
  spaOrSpaArrival: boolean;
  ports: string[];
  coordinate?: Coordinate;
  type: string;
  multi: boolean;
}

export interface Port {
  code: string;
  name: string;
  data: Data;
}

export interface Data {
  predictions?: string[];
}

export interface City {
  code: string;
  name: string;
  data: Data2;
}

export interface Data2 {
  predictions: string[];
}

export interface Country {
  code: string;
  name: string;
  data: Data3;
}

export interface Data3 {
  predictions?: string[];
}

export interface Region {
  code: string;
  name: string;
  data: Data4;
}

export interface Data4 {}

export interface Coordinate {
  lat: number;
  lon: number;
}
