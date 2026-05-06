import Image from 'next/image';
import { notFound } from 'next/navigation';
import { locations, tel } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';
export function generateStaticParams(){return locations.map((location)=>({slug:location.slug}));}
export function generateMetadata({params}:{params:{slug:string}}){const loc=locations.find((l)=>l.slug===params.slug); if(!loc)return {}; return buildMetadata(loc.seo, `/locations/${loc.slug}/`);}
export default function LocationPage({params}:{params:{slug:string}}){const loc=locations.find((l)=>l.slug===params.slug); if(!loc)notFound(); return <><section className="page-hero"><div className="page-hero-inner"><span className="sec-lbl">{loc.keyword}</span><h1 className="hero-h1">{loc.title}</h1><p className="hero-body">{loc.acf.intro}</p></div></section><section className="content-section"><div className="content-inner detail-grid"><div><Image src={loc.image} alt={loc.imageAlt} width={900} height={520}/><p>{loc.acf.intro}</p><a className="btn-red" href={tel(loc.tel)}>{loc.phone}</a></div><aside className="detail-card"><h2>{loc.address}</h2><h3>Why local families choose VMC</h3><ul>{loc.acf.highlights.map((item)=><li key={item}>{item}</li>)}</ul><h3>Nearby communities</h3><p>{loc.acf.areas.join(', ')}</p></aside></div></section></>}
