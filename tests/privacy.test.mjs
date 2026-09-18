import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const sourceFiles=[
  'app/page.tsx',
  'components/AnswerCard.tsx',
  'lib/search.ts'
];

test('查詢流程不寫入瀏覽器儲存或 analytics', async()=>{
  const contents=await Promise.all(
    sourceFiles.map(path=>readFile(new URL(`../${path}`, import.meta.url),'utf8'))
  );
  const code=contents.join('\n');
  for(const forbidden of ['localStorage','sessionStorage','sendBeacon','gtag(','analytics.track']){
    assert.equal(code.includes(forbidden),false,`forbidden persistence/analytics token: ${forbidden}`);
  }
});

test('緊急路由不使用過度寬鬆的單字「攻擊」或「暴力」', async()=>{
  const code=await readFile(new URL('../lib/search.ts', import.meta.url),'utf8');
  assert.equal(/^[\s]*['"]攻擊['"][,\]]/m.test(code),false);
  assert.equal(/^[\s]*['"]暴力['"][,\]]/m.test(code),false);
  assert.match(code,/['"]打架['"]/);
  assert.match(code,/['"]攻擊同學['"]/);
});
