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

const disciplineIntent=[
  '可以',
  '可不可以',
  '能不能',
  '能否',
  '怎麼處理',
  '怎麼辦',
  '處理',
  '管教',
  '處罰',
  '懲罰',
  '禁止',
  '限制',
  '留下',
  '留置',
  '沒收',
  '保管',
  '公布',
  '公開',
  '要求',
  '罰'
];

const genericKeywords=new Set(['中午','午餐','姓名','家庭','群組','物品','言語']);

export function searchTopic(q:string):Topic|undefined{
  const text=q.trim();
  if(!text) return undefined;

  if(emergency.some(k=>text.includes(k))){
    return (topics as Topic[]).find(t=>t.risk==='emergency');
  }

  const hasIntent=disciplineIntent.some(k=>text.includes(k));
  let best:{topic:Topic;score:number;matches:string[]}|undefined;

  for(const topic of topics as Topic[]){
    let score=0;
    const matches:string[]=[];

    for(const k of topic.keywords){
      if(text.includes(k)){
        matches.push(k);
        score += Math.max(2,k.length);
      }
    }

    if(topic.title.includes(text)) score+=5;

    if(!best || score>best.score){
      best={topic,score,matches};
    }
  }

  if(!best || best.score<=0) return undefined;

  const hasStrongMatch=best.matches.some(k=>k.length>=3 && !genericKeywords.has(k));
  const hasMultipleMatches=best.matches.length>=2;
  const hasIntentSupportedMatch=hasIntent && best.matches.length>=1;

  return (hasStrongMatch || hasMultipleMatches || hasIntentSupportedMatch) ? best.topic : undefined;
}

export const allTopics=topics as Topic[];
