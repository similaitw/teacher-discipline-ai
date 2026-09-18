import sourcesData from '@/data/sources/catalog.json';
import casesData from '@/data/cases/taoyuan-handbook.json';
import type {KnowledgeSource,ReferenceCase} from './types';

const sources=sourcesData as KnowledgeSource[];
const cases=casesData as ReferenceCase[];

const normalize=(value:string)=>
  value.toLowerCase().replace(/[\s，。！？、；：,.!?;:「」『』（）()《》]/g,'');

const scoreText=(query:string,value:string)=>{
  const q=normalize(query);
  const v=normalize(value);
  if(!q || !v) return 0;
  if(q===v) return 30;
  if(v.includes(q)) return Math.max(8,q.length*2);
  if(q.includes(v)) return Math.max(5,v.length);
  return 0;
};

export type KnowledgeMatches={
  sources:KnowledgeSource[];
  cases:ReferenceCase[];
};

export function searchKnowledge(query:string,limit=8):KnowledgeMatches{
  const sourceMatches=sources
    .map(source=>({
      source,
      score:Math.max(
        scoreText(query,source.title),
        scoreText(query,source.authority),
        ...(source.categoryIds??[]).map(id=>scoreText(query,id))
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
        scoreText(query,item.title),
        scoreText(query,item.chapterTitle)
      )
    }))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
    .map(x=>x.item);

  return {sources:sourceMatches,cases:caseMatches};
}
