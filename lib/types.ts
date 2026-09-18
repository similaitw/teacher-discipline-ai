export type Risk='green'|'yellow'|'red'|'emergency'|'unknown';

export type Topic={
  id:string;
  title:string;
  risk:Risk;
  shortAnswer:string;
  keywords:string[];
  principles:string[];
  canDo:string[];
  avoid:string[];
  alternatives:string[];
  reason:string;
  sources:{
    authority:string;
    document:string;
    section:string;
    url:string;
    lastVerified:string;
  }[];
};
