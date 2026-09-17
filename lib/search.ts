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

export function searchTopic(q:string):Topic|undefined{
  const text=q.trim();
  if(!text) return undefined;

  if(emergency.some(k=>text.includes(k))){
    return (topics as Topic[]).find(t=>t.risk==='emergency');
  }

  let best:{topic:Topic;score:number}|undefined;
  for(const topic of topics as Topic[]){
    let score=0;
    for(const k of topic.keywords){
      if(text.includes(k)) score += Math.max(2,k.length);
    }
    if(topic.title.includes(text)) score+=5;
    if(!best || score>best.score) best={topic,score};
  }

  return best && best.score>0 ? best.topic : undefined;
}

export const allTopics=topics as Topic[];
