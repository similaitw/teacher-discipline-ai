import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const readJson=async path=>JSON.parse(await readFile(new URL(`../${path}`, import.meta.url),'utf8'));

const required=['id','title','risk','category','quick','shortAnswer','keywords','principles','canDo','avoid','alternatives','reason','sources'];
const risks=new Set(['green','yellow','red','emergency','unknown']);

test('核心 topics 結構完整', async()=>{
  const topics=await readJson('data/topics/topics.json');
  assert.ok(topics.length>=20);
  for(const topic of topics){
    for(const key of required) assert.ok(key in topic, `${topic.id} missing ${key}`);
    assert.ok(risks.has(topic.risk), `${topic.id} invalid risk`);
    assert.ok(['principles','general-measures','physical','rest-learning','property-search','speech-privacy','safety-emergency','formal-discipline','appeals-rights','bullying','gender','guidance-protection','special-education','teacher-accountability','yilan-local','cases'].includes(topic.category), `${topic.id} invalid category`);
    assert.equal(typeof topic.quick,'boolean', `${topic.id} quick must be boolean`);
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
  assert.equal(topics.find(x=>x.id==='collective-punishment')?.risk,'red');
  assert.match(topics.find(x=>x.id==='safety-search')?.shortAnswer ?? '',/安全檢查/);
  assert.equal(topics.find(x=>x.id==='low-achievement')?.risk,'red');
});

test('教育部來源均為 verified，宜蘭未驗證來源不得冒充 verified', async()=>{
  const moe=await readJson('data/regulations/moe/sources.json');
  const yilan=await readJson('data/regulations/yilan/sources.json');
  assert.ok(moe.length>=2);
  assert.ok(moe.every(x=>x.status==='verified' && x.sourceUrl.startsWith('https://edu.law.moe.gov.tw/')));
  assert.ok(yilan.every(x=>x.status!=='verified'));
});


test('完整知識庫分類與來源目錄完整', async()=>{
  const categories=await readJson('data/categories/categories.json');
  const sources=await readJson('data/sources/catalog.json');
  assert.equal(categories.length,16);
  assert.ok(sources.length>=27);
  assert.ok(sources.filter(x=>String(x.status).startsWith('verified')).length>=24);
  const categoryIds=new Set(categories.map(x=>x.id));
  for(const source of sources){
    assert.ok(source.categoryIds.length>0, `${source.id} missing categories`);
    for(const id of source.categoryIds) assert.ok(categoryIds.has(id), `${source.id} invalid category ${id}`);
    if(source.status==='verified') assert.ok(source.url, `${source.id} verified source must have URL`);
  }
  const yilan=sources.filter(x=>x.authority==='宜蘭縣政府');
  assert.ok(yilan.length>=2);
  assert.ok(yilan.every(x=>x.status==='needsOfficialSource'));
});

test('桃園手冊 53 案索引完整且未冒充內文已驗證', async()=>{
  const cases=await readJson('data/cases/taoyuan-handbook.json');
  assert.equal(cases.length,53);
  const counts=Object.fromEntries(['corporal','improper','bullying','teaching'].map(
    ch=>[ch,cases.filter(x=>x.chapter===ch).length]
  ));
  assert.deepEqual(counts,{corporal:7,improper:24,bullying:7,teaching:15});
  assert.ok(cases.every(x=>x.detailStatus==='toc_only'));
  assert.ok(cases.every(x=>Number.isInteger(x.page) && x.page>0));
});

test('教師查詢主題已擴充，不以首頁快捷數量代表知識庫大小', async()=>{
  const topics=await readJson('data/topics/topics.json');
  assert.ok(topics.length>=50);
  assert.ok(topics.filter(x=>x.quick).length<=12);
  const categoryIds=new Set((await readJson('data/categories/categories.json')).map(x=>x.id));
  assert.ok(topics.every(x=>categoryIds.has(x.category)));
});
