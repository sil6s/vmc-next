import { ServicesGrid } from '@/components/Sections';
import { buildMetadata } from '@/lib/metadata';
export const metadata = buildMetadata({title:'Veterinary Services in Northern Kentucky | VMC',description:'Explore wellness exams, vaccines, dental care, surgery, urgent care, and cat-friendly veterinary services.'}, '/services/');
export default function ServicesPage(){return <><section className="page-hero"><div className="page-hero-inner"><h1 className="hero-h1">Veterinary Services</h1><p className="hero-body">Full-service care for dogs and cats at VMC Fort Thomas and Independence.</p></div></section><div className="home-band home-band--cream"><ServicesGrid/></div></>}
