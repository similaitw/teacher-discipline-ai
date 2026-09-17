import type {Topic} from '@/lib/types';

const labels={
  green:'低風險／通常可採',
  yellow:'有條件／需審慎',
  red:'高風險／避免採用',
  emergency:'緊急安全事件',
  unknown:'來源不足／需確認'
} as const;

export function AnswerCard({topic}:{topic:Topic}){
  const headingId=`topic-${topic.id}`;

  return <section className={`card risk-${topic.risk}`} aria-labelledby={headingId}>
    <p className="risk-label">{labels[topic.risk]}</p>
    <h2 id={headingId}>{topic.title}</h2>
    <p className="answer-summary"><strong>{topic.shortAnswer}</strong></p>

    <div className="cols">
      <div>
        <h3>✅ 可以這樣做</h3>
        <ul>{topic.canDo.map(x=><li key={x}>{x}</li>)}</ul>
      </div>
      <div>
        <h3>⚠️ 避免這樣做</h3>
        <ul>{topic.avoid.map(x=><li key={x}>{x}</li>)}</ul>
      </div>
    </div>

    <h3>💡 較安全的替代方式</h3>
    <ul>{topic.alternatives.map(x=><li key={x}>{x}</li>)}</ul>

    <h3>判斷理由</h3>
    <p>{topic.reason}</p>

    <h3>法規來源</h3>
    <div className="sources">
      {topic.sources.map(s=>
        <p className="source-item" key={`${s.url}-${s.section}`}>
          <a href={s.url} target="_blank" rel="noreferrer">
            {s.authority}｜{s.document}｜{s.section}
            <span className="sr-only">（另開新視窗）</span>
          </a><br/>
          <span>最後驗證：{s.lastVerified}</span>
        </p>
      )}
    </div>
  </section>;
}
