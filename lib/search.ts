import topics from '@/data/topics/topics.json';
import type {Topic} from './types';

const emergency=[
  '打架',
  '互毆',
  '持械',
  '拿刀',
  '拿棍棒',
  '自傷',
  '自殺',
  '他傷',
  '攻擊同學',
  '攻擊老師',
  '正在攻擊',
  '暴力衝突'
];

const normalize=(value:string)=>
  value
    .toLowerCase()
    .replace(/[\s，。！？、；：,.!?;:「」『』（）()]/g,'');

export function searchTopic(q:string):Topic|undefined{
  const raw=q.trim();
  if(!raw) return undefined;
  const text=normalize(raw);

  if(emergency.some(k=>text.includes(normalize(k)))){
    return (topics as Topic[]).find(t=>t.risk==='emergency');
  }

  let best:{topic:Topic;score:number}|undefined;
  for(const topic of topics as Topic[]){
    let score=0;
    const title=normalize(topic.title);

    if(title===text) score+=20;
    else if(title.includes(text) || text.includes(title)) score+=6;

    for(const keyword of topic.keywords){
      const k=normalize(keyword);
      if(!k) continue;
      if(text===k) score+=10;
      else if(text.includes(k)) score+=Math.max(3,k.length);
    }

    if(!best || score>best.score) best={topic,score};
  }

  return best && best.score>=3 ? best.topic : undefined;
}

export const allTopics=topics as Topic[];
export const quickTopics=allTopics.filter(t=>t.quick);
export const moreTopics=allTopics.filter(t=>!t.quick);
