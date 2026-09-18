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

  const actionOverrides:{terms:string[];topicId:string}[]=[
    {terms:['搜書包','翻書包','檢查書包','搜身','檢查身體','翻抽屜','搜抽屜'],topicId:'safety-search'},
    {terms:['罰蹲','伏地挺身','罰跑','青蛙跳','開合跳'],topicId:'corporal-punishment'},
    {terms:['全班一起','全班受罰','連坐','全班處罰'],topicId:'collective-punishment'}
  ];
  for(const rule of actionOverrides){
    if(rule.terms.some(term=>text.includes(normalize(term)))){
      return (topics as Topic[]).find(t=>t.id===rule.topicId);
    }
  }

  let best:{topic:Topic;score:number}|undefined;
  for(const topic of topics as Topic[]){
    let score=0;
    const title=normalize(topic.title);

    if(title===text) score+=30;
    else if(title.includes(text) || text.includes(title)) score+=8;

    for(const keyword of topic.keywords){
      const k=normalize(keyword);
      if(!k) continue;

      // 精確且較長的詞比「物品」「活動」等泛用短詞更有辨識力。
      const specificity=Math.max(2,k.length*2);
      if(text===k) score+=specificity+12;
      else if(text.includes(k)) score+=specificity;
    }

    if(!best || score>best.score) best={topic,score};
  }

  return best && best.score>=4 ? best.topic : undefined;
}

export const allTopics=topics as Topic[];
export const quickTopics=allTopics.filter(t=>t.quick);
export const moreTopics=allTopics.filter(t=>!t.quick);
