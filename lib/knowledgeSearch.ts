import sourcesData from '@/data/sources/catalog.json';
import casesData from '@/data/cases/taoyuan-handbook.json';
import type {KnowledgeSource,ReferenceCase} from './types';

const sources=sourcesData as KnowledgeSource[];
const cases=casesData as ReferenceCase[];

const normalize=(value:string)=>
  value.toLowerCase().replace(/[\s，。！？、；：,.!?;:「」『』（）()《》]/g,'');

const queryTerms=(query:string)=>{
  const q=normalize(query);
  const stripped=q
    .replace(/(相關|請問|我要找|我想找|查詢|查)/g,'')
    .replace(/(案例|法規|規定|條文|文件|手冊)$/g,'');
  return [...new Set([q,stripped].filter(x=>x.length>=2))];
};

const scoreText=(terms:string[],value:string)=>{
  const v=normalize(value);
  if(!v) return 0;
  return Math.max(0,...terms.map(q=>{
    if(q===v) return 30;
    if(v.includes(q)) return Math.max(8,q.length*2);
    if(q.includes(v)) return Math.max(5,v.length);
    return 0;
  }));
};

export type KnowledgeMatches={
  sources:KnowledgeSource[];
  cases:ReferenceCase[];
};

export function searchKnowledge(query:string,limit=8):KnowledgeMatches{
  const terms=queryTerms(query);

  const sourceMatches=sources
    .map(source=>({
      source,
      score:Math.max(
        scoreText(terms,source.title),
        scoreText(terms,source.authority)
      )
    }))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
    .map(x=>x.source);

  const caseMatches=cases
    .map(item=>({
      item,
      score:Math.max(
        scoreText(terms,item.title),
        scoreText(terms,item.chapterTitle)
      )
    }))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
    .map(x=>x.item);

  return {sources:sourceMatches,cases:caseMatches};
}
