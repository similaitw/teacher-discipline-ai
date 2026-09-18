import type {ReactNode} from 'react';
import './globals.css';

export const metadata={
  title:'教師管教 AI 幫手',
  description:'教育部 × 宜蘭縣通用版'
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
