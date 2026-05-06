import { notFound } from 'next/navigation';
import { posts } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';
export function generateStaticParams(){return posts.map((post)=>({slug:post.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){const post=posts.find((p)=>p.slug===params.slug); if(!post)return {}; return buildMetadata(post.seo, `/blog/${post.slug}/`);}
export default function PostPage({params}:{params:{slug:string}}){const post=posts.find((p)=>p.slug===params.slug); if(!post)notFound(); return <><section className="page-hero"><div className="page-hero-inner"><span className="sec-lbl">{post.date}</span><h1 className="hero-h1">{post.title}</h1><p className="hero-body">{post.excerpt}</p></div></section><article className="content-section"><div className="content-inner">{post.content.map((p)=><p key={p}>{p}</p>)}</div></article></>}
