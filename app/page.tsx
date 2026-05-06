import { BlogPreview, Hero, Locations, NewPatients, Reviews, ServicesGrid, Team, Why } from '@/components/Sections';
import { getPage } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

const page = getPage('')!;
export const metadata = buildMetadata(page.seo, '/');

export default function HomePage() {
  return <><Hero page={page}/><div className="home-band home-band--cream"><Reviews/></div><div className="home-band home-band--white"><Why/></div><div className="home-band home-band--cream"><ServicesGrid/></div><div className="home-band home-band--white"><Locations/></div><div className="home-band home-band--cream"><Team/></div><div className="home-band home-band--white"><NewPatients/></div><div className="home-band home-band--cream"><BlogPreview/></div><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({'@context':'https://schema.org','@type':'VeterinaryCare',name:'Veterinary Medical Center',url:'https://vmcnky.com',areaServed:'Northern Kentucky'})}} /></>;
}
