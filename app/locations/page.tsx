import { Locations } from '@/components/Sections';
import { buildMetadata } from '@/lib/metadata';
export const metadata = buildMetadata({title:'VMC Locations | Fort Thomas & Independence KY',description:'Visit Veterinary Medical Center in Fort Thomas or Independence, Kentucky.'}, '/locations/');
export default function LocationsPage(){return <><section className="page-hero"><div className="page-hero-inner"><h1 className="hero-h1">Locations</h1><p className="hero-body">Two convenient Northern Kentucky clinics for dogs and cats.</p></div></section><div className="home-band home-band--white"><Locations/></div></>}
