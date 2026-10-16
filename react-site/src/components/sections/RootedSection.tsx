import styles from "./RootedSection.module.css";
import {
  NKY_VIEWBOX,
  nkyCounties,
  nkyCountyLabels,
  nkyPlaces,
  ohioRiver,
  ohioRiverLabelPath,
} from "./nky-map-paths";

export default function RootedSection() {
  return (
    <section className={styles.rooted} aria-labelledby="rooted-heading">
      <div className={styles.inner}>
        <div>
          <p className={styles.eyebrow}>Northern Kentucky</p>
          <h2 id="rooted-heading" className={styles.heading}>
            Local care for<br />
            <em>Northern Kentucky pets.</em>
          </h2>
          <p className={styles.lede}>
            We are a <strong>locally owned veterinary practice</strong> with teams in Fort Thomas
            and Independence. We care for dogs and cats across Northern Kentucky, including
            Bellevue, Newport, Cold Spring, Alexandria, Florence, Erlanger, and the surrounding
            communities. Our neighbors trust us for routine visits, new concerns, and the everyday
            questions that come with caring for a pet.
          </p>
        </div>

          <div className={styles.mapCard}>
            <div className={styles.panel}><NkyMap /></div>
          </div>
      </div>
    </section>
  );
}

function NkyMap() {
  const toneClass = { clinic: styles.countyClinic, home: styles.countyHome, other: "" };
  const { cincinnati, clinics } = nkyPlaces;
  return (
    <svg viewBox={NKY_VIEWBOX} role="img" aria-labelledby="map-nky-title">
      <title id="map-nky-title">
        Map of Northern Kentucky and Greater Cincinnati showing clinics in Fort Thomas and
        Independence, Kentucky
      </title>
      <defs>
        <clipPath id="nky-clip">
          <rect width="520" height="420" rx="2" />
        </clipPath>
        <path id="nky-river-label" d={ohioRiverLabelPath} fill="none" />
      </defs>
      <g clipPath="url(#nky-clip)">
        {nkyCounties.map((c) => (
          <path key={c.id} d={c.d} className={`${styles.county} ${toneClass[c.tone]}`} />
        ))}
        <path d={ohioRiver} className={styles.river} />

        {nkyCountyLabels.map((l) => (
          <text
            key={l.name}
            x={l.x}
            y={l.y}
            className={`${styles.countyLabel} ${l.home ? styles.countyLabelHome : ""}`}
          >
            {l.name} <tspan>{l.state}</tspan>
          </text>
        ))}

        <text className={styles.riverLabel}>
          <textPath href="#nky-river-label" startOffset="2%">
            OHIO RIVER
          </textPath>
        </text>

        <g className={styles.city}>
          <circle cx={cincinnati.x} cy={cincinnati.y} r={3.5} />
          <text x={cincinnati.x - 8} y={cincinnati.y - 8} textAnchor="end">
            Cincinnati
          </text>
        </g>

        {clinics.map((p) => (
          <g key={p.name} className={styles.pin}>
            <path
              d={`M${p.x} ${p.y} c-7 -9 -11 -14 -11 -20 a11 11 0 0 1 22 0 c0 6 -4 11 -11 20z`}
            />
            <circle cx={p.x} cy={p.y - 20} r={4} className={styles.pinDot} />
            <text x={p.x + 16} y={p.y - 22} className={styles.pinName}>
              {p.name}
            </text>
            <text x={p.x + 16} y={p.y - 7} className={styles.pinSub}>
              {p.county}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
