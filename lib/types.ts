export type Risk='green'|'yellow'|'red'|'emergency'|'unknown';
export type TopicCategory='daily'|'rights'|'safety'|'escalation';

export type Topic={
  id:string;
  title:string;
  risk:Risk;
  category:TopicCategory;
  quick:boolean;
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
