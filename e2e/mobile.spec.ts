import {test,expect} from '@playwright/test';

test('375px 手機核心查詢流程', async({page})=>{
  await page.goto('/');

  await expect(page.getByRole('heading',{name:'教師管教 AI 幫手'})).toBeVisible();

  const viewportWidth=await page.evaluate(()=>window.innerWidth);
  const scrollWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  expect(viewportWidth).toBe(375);
  expect(scrollWidth).toBeLessThanOrEqual(viewportWidth);

  await page.getByRole('button',{name:'罰站'}).click();
  await expect(page.getByRole('heading',{name:'可以罰站嗎？'})).toBeVisible();
  await expect(page.getByText(/每次不得超過一堂課/)).toBeVisible();

  const input=page.getByLabel('輸入管教情境');

  await input.fill('學生上課一直滑手機，我可以先收起來嗎？');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByRole('heading',{name:'可以沒收學生手機或物品嗎？'})).toBeVisible();
  await expect(page.getByText(/暫時保管/).first()).toBeVisible();

  await input.fill('兩個學生現在正在打架');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByText('緊急安全事件')).toBeVisible();
  await expect(page.getByRole('heading',{name:'學生正在打架怎麼辦？'})).toBeVisible();

  await input.fill('同學在群組網路攻擊我，這算霸凌嗎？');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByRole('heading',{name:'這算霸凌嗎？'})).toBeVisible();
  await expect(page.getByText('來源不足／需確認')).toBeVisible();

  await input.fill('學生甲今天又遲到');
  await page.reload();
  await expect(page.getByLabel('輸入管教情境')).toHaveValue('');
});

test('體罰紅線入口可直接查', async({page})=>{
  await page.goto('/');
  await page.getByRole('button',{name:/罰蹲/}).click();
  await expect(page.getByText('高風險／避免採用')).toBeVisible();
  await expect(page.getByText(/依法屬於體罰/)).toBeVisible();
});


test('M2 連坐、安全檢查與標點搜尋', async({page})=>{
  await page.goto('/');
  const input=page.getByLabel('輸入管教情境');

  await input.fill('一個人犯錯，為什麼要全班一起留下？');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByRole('heading',{name:'可以一人犯錯，全班一起受罰嗎？'})).toBeVisible();
  await expect(page.getByText(/不得因個人或少數人/)).toBeVisible();

  await input.fill('我懷疑學生有危險物品，可以搜書包嗎？');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByRole('heading',{name:'老師可以搜學生書包、抽屜或身體嗎？'})).toBeVisible();
  await expect(page.getByText(/第29、30點/).first()).toBeVisible();

  await input.fill('學生，考太差！可以罰嗎？');
  await page.getByRole('button',{name:'查詢'}).click();
  await expect(page.getByRole('heading',{name:'學生只是成績差，可以處罰嗎？'})).toBeVisible();

  await page.getByText(/更多常見情境/).click();
  await expect(page.getByRole('button',{name:/道歉或寫反省/})).toBeVisible();
});
