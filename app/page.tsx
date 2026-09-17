'use client';

import {useState} from 'react';
import {AnswerCard} from '@/components/AnswerCard';
import {allTopics,searchTopic} from '@/lib/search';
import type {Topic} from '@/lib/types';

export default function Page(){
  const [q,setQ]=useState('');
  const [result,setResult]=useState<Topic|undefined>();
  const [searched,setSearched]=useState(false);

  const run=(text=q)=>{
    setQ(text);
    setResult(searchTopic(text));
    setSearched(true);
  };

  return <main className="wrap">
    <div className="hero">
      <h1>教師管教 AI 幫手</h1>
      <p className="sub">教育部 × 宜蘭縣通用版</p>
    </div>

    <div className="card">
      <div className="meta">🔒 請勿輸入學生姓名、身分證字號、診斷或家庭敏感資料。</div>
      <h2>你現在遇到什麼管教問題？</h2>
      <div className="ask">
        <input
          aria-label="輸入管教情境"
          value={q}
          onChange={e=>setQ(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&run()}
          placeholder="例如：學生一直講話，可以叫他站到下課嗎？"
        />
        <button onClick={()=>run()}>查詢</button>
      </div>
      <div className="chips">
        {allTopics.map(t=>
          <button className="chip" onClick={()=>run(t.title)} key={t.id}>
            {t.title.replace('可以','').replace('嗎？','')}
          </button>
        )}
      </div>
    </div>

    {result&&<AnswerCard topic={result}/>}
    {searched&&!result&&
      <section className="card risk-unknown">
        <h2>需要進一步確認</h2>
        <p>目前知識庫沒有足夠來源支持具體結論。請改用更明確的情境描述，或交由學校行政／法規來源進一步確認。</p>
      </section>
    }

    <p className="meta">
      全國法規核心：教育部《學校訂定教師輔導與管教學生辦法注意事項》（2024-02-05）
      與《國民小學及國民中學學生獎懲準則》（2024-04-30）。
      資料最後驗證 2026-09-18；宜蘭縣地方來源持續補正官方全文。
    </p>
  </main>;
}
