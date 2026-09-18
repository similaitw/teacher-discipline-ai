'use client';

import {FormEvent, useState} from 'react';
import {AnswerCard} from '@/components/AnswerCard';
import {KnowledgeLibrary} from '@/components/KnowledgeLibrary';
import {KnowledgeMatches} from '@/components/KnowledgeMatches';
import {searchKnowledge} from '@/lib/knowledgeSearch';
import type {KnowledgeMatches as MatchResult} from '@/lib/knowledgeSearch';
import {moreTopics,quickTopics,searchTopic} from '@/lib/search';
import type {Topic} from '@/lib/types';

const topicLabel=(title:string)=>
  title.replace(/^可以/,'').replace(/嗎？$/,'').replace(/？$/,'');

export default function Page(){
  const [q,setQ]=useState('');
  const [result,setResult]=useState<Topic|undefined>();
  const [searched,setSearched]=useState(false);
  const [matches,setMatches]=useState<MatchResult>({sources:[],cases:[]});

  const run=(text=q)=>{
    const trimmed=text.trim();
    setQ(text);
    setResult(trimmed ? searchTopic(trimmed) : undefined);
    setMatches(trimmed ? searchKnowledge(trimmed) : {sources:[],cases:[]});
    setSearched(Boolean(trimmed));
  };

  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    run();
  };

  return <main className="wrap">
    <header className="hero">
      <p className="eyebrow">教育部 × 宜蘭縣通用版</p>
      <h1>教師管教 AI 幫手</h1>
      <p className="sub">用老師平常會問的話，快速查管教界線、風險與官方依據。</p>
    </header>

    <section className="card" aria-labelledby="ask-title">
      <p className="privacy-note" role="note">
        🔒 請勿輸入學生姓名、身分證字號、診斷或家庭敏感資料。
      </p>
      <h2 id="ask-title">你現在遇到什麼管教問題？</h2>

      <form className="ask" onSubmit={submit}>
        <label className="sr-only" htmlFor="discipline-query">輸入管教情境</label>
        <input
          id="discipline-query"
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="例如：學生一直講話，可以叫他站到下課嗎？"
          autoComplete="off"
        />
        <button type="submit" disabled={!q.trim()}>查詢</button>
      </form>

      <div className="quick-section">
        <p className="section-label">常用情境</p>
        <div className="chips" role="group" aria-label="常用管教問題">
          {quickTopics.map(t=>
            <button
              type="button"
              className="chip"
              onClick={()=>run(t.title)}
              key={t.id}
            >
              {topicLabel(t.title)}
            </button>
          )}
        </div>
      </div>

      <details className="more-topics">
        <summary>更多常見情境（{moreTopics.length}）</summary>
        <div className="chips" role="group" aria-label="更多管教問題">
          {moreTopics.map(t=>
            <button
              type="button"
              className="chip secondary"
              onClick={()=>run(t.title)}
              key={t.id}
            >
              {topicLabel(t.title)}
            </button>
          )}
        </div>
      </details>
    </section>

    <div aria-live="polite" aria-atomic="true">
      {result ? <AnswerCard topic={result}/> : null}
      {searched&&!result&&matches.sources.length===0&&matches.cases.length===0 ?
        <section className="card risk-unknown" aria-labelledby="unknown-title">
          <p className="risk-label">來源不足／需確認</p>
          <h2 id="unknown-title">需要進一步確認</h2>
          <p>目前知識庫沒有足夠來源支持具體結論。請改用更明確的情境描述，或從下方完整知識庫依分類查找。</p>
        </section>
      : null}
    </div>

    {searched ? <KnowledgeMatches matches={matches}/> : null}

    <KnowledgeLibrary />

    <footer className="site-footer">
      <p>
        全國法規核心：教育部《學校訂定教師輔導與管教學生辦法注意事項》（2024-02-05）、
        《國民小學及國民中學學生獎懲準則》（2024-04-30）與《教師法施行細則》。
      </p>
      <p>資料最後驗證：2026-09-18。宜蘭縣地方來源仍持續補正官方全文。</p>
      <p><strong>提醒：</strong>本工具協助快速查詢，不取代正式獎懲、霸凌認定、通報或法律程序。</p>
    </footer>
  </main>;
}
