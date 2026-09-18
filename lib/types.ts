export type Risk='green'|'yellow'|'red'|'emergency'|'unknown';

export type TopicCategory=
  | 'principles'
  | 'general-measures'
  | 'physical'
  | 'rest-learning'
  | 'property-search'
  | 'speech-privacy'
  | 'safety-emergency'
  | 'formal-discipline'
  | 'appeals-rights'
  | 'bullying'
  | 'gender'
  | 'guidance-protection'
  | 'special-education'
  | 'teacher-accountability'
  | 'yilan-local'
  | 'cases';

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

export type KnowledgeCategory={
  id:TopicCategory;
  title:string;
  description:string;
  icon:string;
};

export type KnowledgeSource={
  id:string;
  title:string;
  authority:string;
  sourceType:string;
  status:string;
  categoryIds:TopicCategory[];
  url:string;
  amendedDate?:string;
  promulgatedDate?:string;
  issuedDate?:string;
  documentNumber?:string;
  note?:string;
  lastVerified:string;
};

export type ReferenceCase={
  id:string;
  sourceId:string;
  chapter:string;
  chapterTitle:string;
  caseNumber:number;
  title:string;
  page:number;
  categoryIds:TopicCategory[];
  detailStatus:'toc_only'|'verified_detail';
  note:string;
};
