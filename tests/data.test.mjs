import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const readJson=async path=>JSON.parse(await readFile(new URL(`../${path}`, import.meta.url),'utf8'));

const required=['id','title','risk','shortAnswer','keywords','principles','canDo','avoid','alternatives','reason','sources'];
const risks=new Set(['green','yellow','red','emergency','unknown']);

test('核心 topics 結構完整', async()=>{
  const topics=await readJson('data/topics/topics.json');
  assert.ok(topics.length>=10);
  for(const topic of topics){
    for(const key of required) assert.ok(key in topic, `${topic.id} missing ${key}`);
    assert.ok(risks.has(topic.risk), `${topic.id} invalid risk`);
    assert.ok(topic.sources.length>0, `${topic.id} must have source`);
    for(const s of topic.sources){
      assert.match(s.url,/^https:\/\/edu\.law\.moe\.gov\.tw\//);
      assert.match(s.lastVerified,/^\d{4}-\d{2}-\d{2}$/);
    }
  }
});

test('緊急模式與手機暫時保管資料存在', async()=>{
  const topics=await readJson('data/topics/topics.json');
  assert.equal(topics.find(x=>x.id==='student-fight')?.risk,'emergency');
  const phone=topics.find(x=>x.id==='phone-property');
  assert.equal(phone?.risk,'yellow');
  assert.match(phone?.shortAnswer ?? '',/暫時保管/);
  const corporal=topics.find(x=>x.id==='corporal-punishment');
  assert.equal(corporal?.risk,'red');
  assert.match(corporal?.shortAnswer ?? '',/體罰/);
});

test('教育部來源均為 verified，宜蘭未驗證來源不得冒充 verified', async()=>{
  const moe=await readJson('data/regulations/moe/sources.json');
  const yilan=await readJson('data/regulations/yilan/sources.json');
  assert.ok(moe.length>=2);
  assert.ok(moe.every(x=>x.status==='verified' && x.sourceUrl.startsWith('https://edu.law.moe.gov.tw/')));
  assert.ok(yilan.every(x=>x.status!=='verified'));
});
