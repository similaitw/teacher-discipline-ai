import categoriesData from '@/data/categories/categories.json';
import sourcesData from '@/data/sources/catalog.json';
import casesData from '@/data/cases/taoyuan-handbook.json';
import {allTopics} from '@/lib/search';
import type {KnowledgeCategory,KnowledgeSource,ReferenceCase,TopicCategory} from '@/lib/types';

const categories=categoriesData as KnowledgeCategory[];
const sources=sourcesData as KnowledgeSource[];
const cases=casesData as ReferenceCase[];

const sourceStatusLabel=(status:string)=>{
  if(status==='verified') return '官方已驗證';
  if(status==='verified_with_effective_date_caution') return '官方已驗證／注意生效日';
  if(status==='needsOfficialSource') return '地方來源待官方全文';
  if(status==='reference_only') return '案例參考';
  return status;
};

const caseChapterOrder=['體罰','不當管教','霸凌','教學不力'];

function CategoryBody({categoryId}:{categoryId:TopicCategory}){
  const categoryTopics=allTopics.filter(t=>t.category===categoryId);
  const categorySources=sources.filter(s=>s.categoryIds.includes(categoryId));
  const categoryCases=cases.filter(c=>c.categoryIds.includes(categoryId));

  if(categoryId==='cases'){
    return <div className="library-body">
      <h4>桃園市正向管教手冊：53 案索引</h4>
      <p className="library-note">
        目前 53 案已依目錄完整建檔；詳細案例內容會在逐頁影像核對後才標成「內文已驗證」。
      </p>
      {caseChapterOrder.map(chapter=>{
        const rows=cases.filter(c=>c.chapterTitle===chapter);
        return <details className="case-group" key={chapter}>
          <summary>{chapter}（{rows.length} 案）</summary>
          <ol>
            {rows.map(c=><li key={c.id}>
              <span>{c.title}</span>
              <small>手冊 p.{String(c.page).padStart(3,'0')}｜目錄索引</small>
            </li>)}
          </ol>
        </details>;
      })}
    </div>;
  }

  return <div className="library-body">
    {categoryTopics.length>0 && <>
      <h4>老師可直接查（{categoryTopics.length}）</h4>
      <ul className="library-list">
        {categoryTopics.map(t=><li key={t.id}>
          <span className={`risk-dot risk-dot-${t.risk}`} aria-hidden="true"/>
          {t.title}
        </li>)}
      </ul>
    </>}

    {categorySources.length>0 && <>
      <h4>依據文件（{categorySources.length}）</h4>
      <ul className="source-list">
        {categorySources.map(s=><li key={s.id}>
          {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.title}</a> : <span>{s.title}</span>}
          <small>{s.authority}｜{sourceStatusLabel(s.status)}</small>
          {s.note ? <small>{s.note}</small> : null}
        </li>)}
      </ul>
    </>}

    {categoryCases.length>0 && <>
      <h4>相關手冊案例（{categoryCases.length}）</h4>
      <ul className="case-mini-list">
        {categoryCases.slice(0,8).map(c=><li key={c.id}>{c.title} <small>p.{c.page}</small></li>)}
      </ul>
      {categoryCases.length>8 ? <p className="library-note">另有 {categoryCases.length-8} 案可在「案例、判決與手冊」完整查看。</p> : null}
    </>}
  </div>;
}

export function KnowledgeLibrary(){
  const verifiedSources=sources.filter(s=>s.status.startsWith('verified')).length;

  return <section className="card knowledge-library" aria-labelledby="knowledge-title">
    <div className="library-head">
      <div>
        <p className="eyebrow">完整資料庫</p>
        <h2 id="knowledge-title">完整知識庫｜依 16 大類查詢</h2>
      </div>
      <div className="library-stats" aria-label="知識庫統計">
        <span><strong>{allTopics.length}</strong> 主題</span>
        <span><strong>{sources.length}</strong> 文件</span>
        <span><strong>{cases.length}</strong> 案例</span>
        <span><strong>{categories.length}</strong> 分類</span>
      </div>
    </div>

    <p className="library-note">
      其中 {verifiedSources} 份文件已連到可驗證官方來源；宜蘭縣找不到官方公開全文的資料會明確標示「待官方全文」，不拿來直接下法規結論。
    </p>

    <div className="category-list">
      {categories.map(category=>{
        const t=allTopics.filter(x=>x.category===category.id).length;
        const s=sources.filter(x=>x.categoryIds.includes(category.id)).length;
        const c=cases.filter(x=>x.categoryIds.includes(category.id)).length;
        return <details className="category-card" key={category.id}>
          <summary>
            <span className="category-icon" aria-hidden="true">{category.icon}</span>
            <span className="category-copy">
              <strong>{category.title}</strong>
              <small>{category.description}</small>
              <small>{t} 主題 · {s} 文件{c ? ` · ${c} 案例` : ''}</small>
            </span>
          </summary>
          <CategoryBody categoryId={category.id}/>
        </details>;
      })}
    </div>
  </section>;
}
