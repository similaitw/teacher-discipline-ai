import type {KnowledgeMatches as Matches} from '@/lib/knowledgeSearch';

const status=(value:string)=>{
  if(value==='verified') return '官方已驗證';
  if(value==='verified_with_effective_date_caution') return '官方已驗證／注意生效日';
  if(value==='needsOfficialSource') return '待官方全文';
  if(value==='reference_only') return '案例參考';
  return value;
};

export function KnowledgeMatches({matches}:{matches:Matches}){
  if(matches.sources.length===0 && matches.cases.length===0) return null;

  return <section className="card related-knowledge" aria-labelledby="related-title">
    <p className="eyebrow">延伸查到的資料</p>
    <h2 id="related-title">相關文件與案例</h2>

    {matches.sources.length>0 && <>
      <h3>法規／文件</h3>
      <ul className="source-list">
        {matches.sources.map(s=><li key={s.id}>
          {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a> : <span>{s.title}</span>}
          <small>{s.authority}｜{status(s.status)}</small>
        </li>)}
      </ul>
    </>}

    {matches.cases.length>0 && <>
      <h3>案例索引</h3>
      <ul className="case-mini-list">
        {matches.cases.map(c=><li key={c.id}>
          {c.title}
          <small>{c.chapterTitle}｜桃園手冊 p.{c.page}｜目前為目錄索引</small>
        </li>)}
      </ul>
    </>}
  </section>;
}
