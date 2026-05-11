<?php
/**
 * Shared renderer for the three location SEO landing pages.
 *
 * Set $vmc_location_page before requiring this file.
 */

$vmc_location_page = isset( $vmc_location_page ) ? $vmc_location_page : 'fort_thomas';

$ft_phone    = vmc_get( 'vmc_ft_phone', '(859) 442-4420' );
$ind_phone   = vmc_get( 'vmc_ind_phone', '(859) 356-2242' );
$ft_address  = vmc_get( 'vmc_ft_address', '2000 Memorial Parkway, Fort Thomas, KY 41075' );
$ind_address = vmc_get( 'vmc_ind_address', '4147 Madison Pike, Independence, KY 41051' );

$ft_phone_href  = preg_replace( '/[^0-9+]/', '', $ft_phone );
$ind_phone_href = preg_replace( '/[^0-9+]/', '', $ind_phone );

$ft_image   = get_template_directory_uri() . '/assets/images/about-fort-thomas.jpg';
$ind_image  = get_template_directory_uri() . '/assets/images/about-independence.jpg';
$team_image = get_template_directory_uri() . '/assets/images/VMC Social Media.jpg';

$service_cards = [
    [ 'Wellness', 'Life-stage exams, vaccines, parasite prevention, nutrition guidance, and preventive care planning for dogs and cats.' ],
    [ 'Dental care', 'Oral exams, cleanings, dental treatment planning, and home-care guidance to protect comfort and long-term health.' ],
    [ 'Surgery', 'Soft tissue surgery with careful preparation, anesthesia monitoring, recovery support, and clear discharge instructions.' ],
    [ 'Diagnostics', 'Practical testing and medical workups when symptoms, chronic issues, or new health concerns need a clearer answer.' ],
    [ 'Sick visits', 'Medical care for vomiting, skin issues, limping, coughing, appetite changes, behavior changes, and other concerns.' ],
];

$shared_new_patient_steps = [
    [ 'Request your visit', 'Choose Fort Thomas or Independence, share your main concern, and select a preferred time window for your first appointment.' ],
    [ 'Complete registration', 'Use the online new patient form to submit records, vaccine history, medications, and key health notes before you arrive.' ],
    [ 'Attend your first exam', 'Your veterinarian reviews history, performs a full exam, and explains recommendations with clear next-step options.' ],
    [ 'Follow your care plan', 'Get a practical plan for treatments, prevention, and follow-up so care stays manageable for your schedule and budget.' ],
];

$location_pages = [
    'fort_thomas' => [
        'template'   => 'fort-thomas',
        'keyword'    => 'vet in Fort Thomas KY',
        'eyebrow'    => 'Vet in Fort Thomas, KY',
        'h1'         => 'Vet in Fort Thomas KY for local dogs, cats, and families.',
        'intro'      => 'Veterinary Medical Center is a vet in Fort Thomas KY families choose when they want local, independently owned veterinary care on Memorial Parkway. Led by Dr. Kristi Baker, VMC combines full-service dog and cat medicine with a personal, women-led, community-rooted approach that feels different from a corporate clinic.',
        'phone'      => $ft_phone,
        'phone_href' => $ft_phone_href,
        'address'    => $ft_address,
        'map_query'  => rawurlencode( $ft_address ),
        'image'      => $ft_image,
        'image_alt'  => 'vet in Fort Thomas KY Veterinary Medical Center exterior on Memorial Parkway',
        'second_image' => $team_image,
        'second_alt' => 'vet in Fort Thomas KY team at women-led Veterinary Medical Center',
        'meta'       => 'Need a vet in Fort Thomas KY? Visit locally owned VMC on Memorial Parkway for trusted dog and cat care near Highlands High School.',
        'seo_title'  => 'Vet in Fort Thomas KY | 5 Trusted Reasons Local Families Choose VMC',
        'areas'      => [ 'Fort Thomas KY', 'Highland Heights KY', 'Bellevue KY', 'Newport KY', 'Dayton KY', 'Cold Spring KY', 'Southgate KY', 'Campbell County KY' ],
        'area_links' => [
            [ 'label' => 'Highland Heights', 'url' => '/vet-highland-heights-ky/' ],
            [ 'label' => 'Bellevue', 'url' => '/vet-bellevue-ky/' ],
            [ 'label' => 'Newport', 'url' => '/vet-newport-ky/' ],
            [ 'label' => 'Cold Spring', 'url' => '/vet-cold-spring-ky/' ],
        ],
        'trust'      => [
            'Locally owned and women-led by Dr. Kristi Baker',
            'Not corporate owned or managed from outside the community',
            'Relationship-based veterinary care for long-term pet health',
            'Convenient Memorial Parkway location for daily routines',
        ],
        'community_heading' => 'A vet in Fort Thomas KY rooted in the same community you call home.',
        'community'  => [
            'Dr. Kristi Baker lives in Fort Thomas. Her two children were born and raised here, and they attend Fort Thomas schools. That local connection gives Veterinary Medical Center a practical understanding of the families, routes, schools, and routines that shape daily life in Fort Thomas.',
            'The Fort Thomas office is on Memorial Parkway near Highlands High School and across from the Northern Kentucky Water District. For many families, that means a wellness visit, dental follow-up, sick visit, or vaccine appointment can happen on the way to work, after school, or during the same errands already built into the day.',
            'When you search for a vet in Fort Thomas KY, distance matters, but trust matters more. VMC gives local pet owners both: a convenient veterinary clinic in Northern Kentucky and a locally owned veterinary hospital that wants to know your pet over time.',
        ],
        'location_heading' => 'Visit Our Fort Thomas Location',
        'new_patient_heading' => 'What to expect as a new patient in Fort Thomas.',
        'new_patient_steps' => $shared_new_patient_steps,
        'conversion_sections' => [
            [ 'heading' => 'Choosing the right vet in Fort Thomas', 'body' => 'If you are comparing options, start with convenience, communication style, and long-term continuity. The best fit is a clinic that can support wellness visits now and medical decisions later without making every appointment feel rushed.' ],
            [ 'heading' => 'Why local, independent care matters', 'body' => 'Independent ownership means decisions stay close to Fort Thomas families and pets. You get clearer accountability, a team that knows local routines, and care recommendations based on your pet instead of corporate quotas.' ],
            [ 'heading' => 'Convenience for Fort Thomas pet owners', 'body' => 'Our Memorial Parkway location helps families stack vet care into existing school, work, and errand routes. That practical access makes preventive care easier to keep on schedule year-round.' ],
            [ 'heading' => 'Simple next steps for new patients', 'body' => 'Use the registration form before your first visit, gather previous records, and request an appointment online. If your pet is uncomfortable today, call directly so our team can guide the fastest path to care.' ],
        ],
        'faq' => [
            [ 'How do I choose a vet in Fort Thomas KY?', 'Choose a veterinary team that is easy to reach, locally accountable, clear in communication, and able to support your pet through wellness, medical care, dental care, surgery, and senior life.' ],
            [ 'Where is VMC Fort Thomas located?', 'Veterinary Medical Center Fort Thomas is located at 2000 Memorial Parkway, Fort Thomas, KY 41075, near Highlands High School and across from the Northern Kentucky Water District.' ],
            [ 'Is Veterinary Medical Center locally owned?', 'Yes. VMC is independently owned and women-led by Dr. Kristi Baker. It is not a corporate-owned veterinary clinic.' ],
            [ 'Do you accept new patients?', 'Yes. New patients are welcome. You can request an appointment and complete the new patient registration form before your first visit.' ],
            [ 'What services do you offer in Fort Thomas?', 'VMC Fort Thomas offers wellness care, dental care, surgery, diagnostics, sick visits, medical care, senior support, and comfort-focused dog and cat veterinary care.' ],
            [ 'What should I bring to my first visit?', 'Bring prior records, vaccine history, medication details, and your questions. You can also review the first-visit guide before your appointment.' ],
        ],
    ],
    'independence' => [
        'template'   => 'independence',
        'keyword'    => 'vet in Independence KY',
        'eyebrow'    => 'Vet in Independence, KY',
        'h1'         => 'Vet in Independence KY for central Northern Kentucky pets.',
        'intro'      => 'Veterinary Medical Center is a vet in Independence KY families choose for full-service dog and cat care on Madison Pike. VMC Independence gives central Northern Kentucky families a locally owned, women-led veterinary hospital with clear communication, practical access, and relationship-based care.',
        'phone'      => $ind_phone,
        'phone_href' => $ind_phone_href,
        'address'    => $ind_address,
        'map_query'  => rawurlencode( $ind_address ),
        'image'      => $ind_image,
        'image_alt'  => 'vet in Independence KY Veterinary Medical Center exterior on Madison Pike',
        'second_image' => $team_image,
        'second_alt' => 'vet in Independence KY team at locally owned Veterinary Medical Center',
        'meta'       => 'Need a vet in Independence KY? Visit locally owned VMC on Madison Pike for full-service dog and cat care in Northern Kentucky.',
        'seo_title'  => 'Vet in Independence KY | Trusted Local Care Without the Corporate Feel',
        'areas'      => [ 'Independence KY', 'Covington KY', 'Taylor Mill KY', 'Latonia KY', 'Erlanger KY', 'Florence KY', 'Edgewood KY', 'Kenton County KY' ],
        'area_links' => [
            [ 'label' => 'Covington', 'url' => '/vet-covington-ky/' ],
            [ 'label' => 'Taylor Mill', 'url' => '/vet-taylor-mill-ky/' ],
            [ 'label' => 'Erlanger', 'url' => '/vet-erlanger-ky/' ],
            [ 'label' => 'Florence', 'url' => '/vet-florence-ky/' ],
        ],
        'trust'      => [
            'Locally owned and women-led veterinary hospital',
            'Not corporate owned or built around rushed visits',
            'Full-service care for dogs and cats on Madison Pike',
            'Accessible for Independence and central Northern Kentucky families',
        ],
        'community_heading' => 'A vet in Independence KY for families who want local care close to home.',
        'community'  => [
            'VMC Independence is built for central Northern Kentucky families who want veterinary care that is convenient without feeling impersonal. The Madison Pike location serves Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, Edgewood, Kenton County, and nearby neighborhoods.',
            'When families search for a vet in Independence KY, they are often looking for a team that can help with everyday wellness as well as changing medical needs. VMC Independence supports puppies, kittens, adult pets, senior pets, nervous pets, and cats who need a calmer plan.',
            'This location has its own local story because Independence deserves more than copied neighborhood copy. VMC Independence reflects the same independently owned, women-led values as the broader practice, but the page is written for families who need accessible veterinary care in central Northern Kentucky.',
        ],
        'location_heading' => 'Visit Our Independence Location',
        'new_patient_heading' => 'What to expect as a new patient in Independence.',
        'new_patient_steps' => $shared_new_patient_steps,
        'conversion_sections' => [
            [ 'heading' => 'Choosing the right vet in Independence', 'body' => 'Look for a veterinary team that explains options clearly, makes follow-up simple, and stays accessible for both routine and urgent concerns. Good fit matters more than flashy marketing when your pet needs consistent care.' ],
            [ 'heading' => 'Why local, independent care matters', 'body' => 'Local ownership gives your family direct access to a team accountable to Northern Kentucky communities. Care plans stay relationship-based and practical rather than standardized around corporate scripts.' ],
            [ 'heading' => 'Convenience for Independence pet owners', 'body' => 'Madison Pike access helps families across central NKY reach appointments without unnecessary detours. That convenience makes it easier to keep wellness, dental, and medication follow-up on track.' ],
            [ 'heading' => 'Simple next steps for new patients', 'body' => 'Start with online registration, request your first appointment, and upload any prior records you have available. If your pet is currently uncomfortable, call us so we can advise on same-day options.' ],
        ],
        'faq' => [
            [ 'How do I choose a vet in Independence KY?', 'Look for a veterinary clinic that is nearby, locally accountable, clear about recommendations, and able to support wellness, dental care, surgery, diagnostics, and sick visits.' ],
            [ 'Where is VMC Independence located?', 'Veterinary Medical Center Independence is located at 4147 Madison Pike, Independence, KY 41051.' ],
            [ 'Is this a locally owned veterinary clinic?', 'Yes. Veterinary Medical Center is independently owned, women-led, and rooted in Northern Kentucky. It is not corporate owned.' ],
            [ 'Do you accept new patients in Independence?', 'Yes. New patients are welcome at VMC Independence. You can request an appointment and complete the new patient registration form before your visit.' ],
            [ 'What services do you offer?', 'VMC Independence offers wellness care, dental care, surgery, diagnostics, sick visits, medical care, senior pet support, and comfort-focused dog and cat care.' ],
            [ 'What communities does your Independence office serve?', 'The Independence office serves pets from Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, Edgewood, Kenton County, and surrounding communities.' ],
        ],
    ],
    'cincinnati' => [
        'template'   => 'cincinnati',
        'keyword'    => 'vet near Cincinnati',
        'eyebrow'    => 'Vet Near Cincinnati',
        'h1'         => 'Vet near Cincinnati with easy access from downtown.',
        'intro'      => 'Veterinary Medical Center Fort Thomas is a vet near Cincinnati for pet owners who want full-service dog and cat care without downtown parking stress. The Fort Thomas office is just across the river, right off I-471, and about 10 minutes from downtown Cincinnati for many drivers.',
        'phone'      => $ft_phone,
        'phone_href' => $ft_phone_href,
        'address'    => $ft_address,
        'map_query'  => rawurlencode( $ft_address ),
        'image'      => $ft_image,
        'image_alt'  => 'vet near Cincinnati at Veterinary Medical Center in Northern Kentucky',
        'second_image' => $team_image,
        'second_alt' => 'vet near Cincinnati with easy parking at Veterinary Medical Center Fort Thomas',
        'meta'       => 'Need a vet near Cincinnati? VMC Fort Thomas is about 10 minutes from downtown via I-471 with easy access and local care.',
        'seo_title'  => 'Vet Near Cincinnati | 7 Smart Reasons Pet Owners Choose VMC in NKY',
        'areas'      => [ 'Downtown Cincinnati OH', 'Mount Adams OH', 'Over-the-Rhine OH', 'Newport KY', 'Bellevue KY', 'Fort Thomas KY', 'Highland Heights KY', 'Northern Kentucky' ],
        'area_links' => [
            [ 'label' => 'Downtown Cincinnati', 'url' => '/vet-near-downtown-cincinnati/' ],
            [ 'label' => 'Mount Adams', 'url' => '/vet-near-mount-adams-cincinnati/' ],
            [ 'label' => 'Over-the-Rhine', 'url' => '/vet-near-otr-cincinnati/' ],
            [ 'label' => 'Newport', 'url' => '/vet-newport-ky/' ],
        ],
        'trust'      => [
            'About 10 minutes from downtown Cincinnati for many drivers',
            'Right off I-471 with easier access than many downtown clinics',
            'No downtown street parking hassle for pet appointments',
            'Locally owned and women-led veterinary care just across the river',
        ],
        'community_heading' => 'A vet near Cincinnati without the downtown clinic hassle.',
        'community'  => [
            'For Cincinnati pet owners, location can make or break whether routine care stays on schedule. VMC Fort Thomas is close to downtown Cincinnati but avoids many common downtown frustrations, including tight streets, circling for parking, and carrying a nervous pet through busy city blocks.',
            'The Fort Thomas office is right off I-471 and Memorial Parkway. For many families, a vet near Cincinnati that is just across the river is easier than navigating a downtown appointment, especially for cats, senior pets, anxious dogs, and families trying to fit care around work.',
            'VMC Fort Thomas is a strong nearby alternative for Cincinnati pet owners who want a local vet near Cincinnati, a women-led animal hospital, and full-service veterinary care in Northern Kentucky without giving up convenience.',
        ],
        'location_heading' => 'Visit Our Cincinnati-Close Fort Thomas Location',
        'new_patient_heading' => 'What to expect as a new patient near Cincinnati.',
        'new_patient_steps' => $shared_new_patient_steps,
        'conversion_sections' => [
            [ 'heading' => 'Choosing the right vet near Cincinnati', 'body' => 'A nearby clinic should reduce friction, not add it. Many Cincinnati pet owners prefer quick I-471 access, easy parking, and a team that explains options without downtown time pressure.' ],
            [ 'heading' => 'Why local, independent care matters', 'body' => 'Independent ownership keeps care recommendations centered on pets and families, not volume targets. You get continuity with a women-led team that builds relationships over time.' ],
            [ 'heading' => 'Convenience for Cincinnati pet owners', 'body' => 'Fort Thomas gives many downtown and riverfront families a shorter, lower-stress route for routine care. That convenience is especially helpful for anxious pets, senior pets, and busy weekday schedules.' ],
            [ 'heading' => 'Simple next steps for new patients', 'body' => 'Complete registration online, request a visit window, and share prior records so your first exam can focus on decisions instead of paperwork. Call directly for urgent symptoms or time-sensitive questions.' ],
        ],
        'faq' => [
            [ 'How close is VMC Fort Thomas to downtown Cincinnati?', 'For many drivers, VMC Fort Thomas is about 10 minutes from downtown Cincinnati via I-471, depending on traffic and starting point.' ],
            [ 'Why choose a vet near Cincinnati instead of a downtown clinic?', 'Many pet owners choose VMC Fort Thomas because it is close to Cincinnati while avoiding downtown street parking, tight urban routes, and extra appointment friction.' ],
            [ 'Where is the Cincinnati-close location?', 'The Cincinnati-close VMC location is at 2000 Memorial Parkway, Fort Thomas, KY 41075, just across the river in Northern Kentucky.' ],
            [ 'Do you accept Cincinnati pet owners as new patients?', 'Yes. Cincinnati pet owners are welcome. You can request an appointment and complete new patient registration before your first visit.' ],
            [ 'What services do you offer near Cincinnati?', 'VMC Fort Thomas offers wellness care, dental care, surgery, diagnostics, sick visits, medical care, senior pet support, and comfort-focused dog and cat veterinary care.' ],
            [ 'Is VMC locally owned?', 'Yes. Veterinary Medical Center is locally owned, women-led, and not corporate owned.' ],
        ],
    ],
];

$page = $location_pages[ $vmc_location_page ];
$map_location_label = $page['template'] === 'cincinnati' ? 'Fort Thomas' : str_replace( '_', ' ', $vmc_location_page );
$primary_cta = get_field( 'loc_primary_button' ) ?: 'Request Appointment';
$secondary_cta = get_field( 'loc_secondary_button' ) ?: 'Get Directions';
$intro_eyebrow = get_field( 'loc_intro_eyebrow' ) ?: 'Local Veterinary Care';
$intro_heading = get_field( 'loc_intro_heading' ) ?: 'A local page built for real pet owner decisions.';
$intro_body = get_field( 'loc_intro_body' ) ?: 'Use this page to compare options, review services, and choose the next step with a locally owned team.';
$quick_body = get_field( 'loc_quick_body' ) ?: 'Use these links for fast scheduling, preparation, and follow-up.';
$resource_heading = get_field( 'loc_resource_heading' ) ?: 'Helpful resources for new and returning patients.';
$resource_body = get_field( 'loc_resource_body' ) ?: 'If you are comparing clinics, these pages make it easier to move from research to action.';

get_header();
?>

<style>
.loc-page{background:var(--cream)}
.loc-sec{padding:88px var(--pad)}
.loc-sec-white{background:var(--white)}
.loc-sec-cream{background:var(--cream)}
.loc-sec-warm{background:var(--warm)}
.loc-wrap{width:100%;max-width:1280px;margin:0 auto}
.loc-copy{max-width:860px;margin-top:14px;font-size:15.5px;line-height:1.86;color:var(--mid)}
.loc-card,.loc-panel,.loc-image-card,.loc-faq-card,.loc-map-card,.loc-service-card,.loc-cta-card{background:var(--white);border:1px solid rgba(0,0,0,.06);border-radius:8px;box-shadow:0 20px 56px rgba(0,0,0,.06)}
.loc-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);background:var(--cream)}
.loc-hero-copy{padding:118px 64px 82px 68px;display:flex;flex-direction:column;justify-content:center}
.loc-hero .hero-h1{max-width:14ch;font-size:clamp(42px,5.5vw,68px)}
.loc-hero .hero-body{max-width:680px}
.loc-hero-side{padding:110px 52px 72px 24px;background:var(--warm);display:flex;align-items:center}
.loc-panel{width:100%;padding:30px}
.loc-panel h2,.loc-card h2,.loc-card h3,.loc-service-card h3,.loc-faq-card summary,.loc-map-card h3,.loc-cta-card h2{font-family:'Playfair Display',serif;color:var(--dark)}
.loc-panel h2{font-size:32px;line-height:1.08;margin-bottom:14px}
.loc-panel p,.loc-card p,.loc-service-card p,.loc-faq-card p,.loc-map-card p,.loc-cta-card p{font-size:14.5px;line-height:1.82;color:var(--mid)}
.loc-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:26px}
.loc-grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px;margin-top:34px}
.loc-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px;margin-top:34px}
.loc-card,.loc-service-card,.loc-cta-card{padding:28px}
.loc-card h2,.loc-cta-card h2{font-size:34px;line-height:1.1;margin-bottom:14px}
.loc-card h3,.loc-service-card h3,.loc-map-card h3{font-size:25px;line-height:1.12;margin-bottom:10px}
.loc-image-card{overflow:hidden}
.loc-image-card img{width:100%;height:100%;min-height:390px;object-fit:cover}
.loc-image-caption{padding:18px 22px;font-size:13px;line-height:1.7;color:var(--mid);background:var(--white)}
.loc-list{margin-top:16px;padding:0;list-style:none}
.loc-list li{padding:10px 0;border-bottom:1px solid rgba(0,0,0,.08);font-size:14px;line-height:1.7;color:var(--mid)}
.loc-list li:last-child{border-bottom:none;padding-bottom:0}
.loc-list a{color:var(--red);font-weight:700;text-decoration:none}
.loc-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px}
.loc-chip{display:inline-flex;align-items:center;min-height:38px;padding:8px 13px;border:1px solid rgba(0,0,0,.08);border-radius:8px;background:var(--cream);font-size:13px;color:var(--mid)}
.loc-map{width:100%;height:310px;border:0;display:block;background:var(--warm)}
.loc-map-body{padding:28px}
.loc-meta{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:20px}
.loc-meta div{padding:14px;border-radius:8px;background:var(--cream);border:1px solid rgba(0,0,0,.05)}
.loc-meta strong{display:block;margin-bottom:4px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.loc-meta span,.loc-meta a{font-size:13px;line-height:1.7;color:var(--mid)}
.loc-faq-card{padding:0;overflow:hidden}
.loc-faq-card summary{cursor:pointer;padding:24px 28px;font-size:23px;line-height:1.14}
.loc-faq-card p{padding:0 28px 24px;margin:0}
.loc-step-card{padding:24px}
.loc-step-card .num{display:inline-flex;width:30px;height:30px;border-radius:999px;background:var(--red);color:#fff;align-items:center;justify-content:center;font-weight:700;margin-bottom:10px}
.loc-step-card h3{font-size:24px;line-height:1.12;margin-bottom:10px}
.loc-highlight-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:26px}
.loc-highlight-card{padding:22px;background:var(--white);border:1px solid rgba(0,0,0,.07);border-radius:8px}
.loc-highlight-card h3{font-size:21px;line-height:1.2;margin-bottom:8px;font-family:'Playfair Display',serif;color:var(--dark)}
.loc-highlight-card p{font-size:14.5px;line-height:1.78;color:var(--mid)}
@media(max-width:1100px){
  .loc-hero,.loc-grid-2,.loc-grid-3,.loc-highlight-grid{grid-template-columns:1fr}
  .loc-hero{min-height:0;padding-top:70px}
  .loc-hero-copy{padding:56px 24px 34px}
  .loc-hero-side{padding:0 24px 56px}
}
@media(max-width:700px){
  .loc-sec{padding:56px 24px}
  .loc-meta{grid-template-columns:1fr}
  .loc-actions{flex-direction:column;align-items:flex-start}
}
</style>

<div class="loc-page loc-<?php echo esc_attr( $page['template'] ); ?>">
  <section class="loc-hero">
    <div class="loc-hero-copy">
      <div class="eyebrow"><span class="eyebrow-dash"></span><?php echo esc_html( get_field( 'loc_hero_eyebrow' ) ?: $page['eyebrow'] ); ?></div>
      <h1 class="hero-h1"><?php echo esc_html( get_field( 'loc_hero_heading' ) ?: $page['h1'] ); ?></h1>
      <p class="hero-body"><?php echo esc_html( get_field( 'loc_hero_body' ) ?: $page['intro'] ); ?></p>
      <div class="loc-actions">
        <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-hero')"><?php echo esc_html( $primary_cta ); ?></button>
        <a class="btn-ghost" href="#directions"><?php echo esc_html( $secondary_cta ); ?></a>
      </div>
    </div>
    <aside class="loc-hero-side">
      <div class="loc-panel">
        <h2><?php echo esc_html( get_field( 'loc_panel_heading' ) ?: 'Start with a local team that knows the area.' ); ?></h2>
        <p><?php echo esc_html( get_field( 'loc_panel_body' ) ?: 'Call, register, or request an appointment. VMC makes the next step clear for new and returning pet families.' ); ?></p>
        <ul class="loc-list">
          <li><a href="tel:<?php echo esc_attr( $page['phone_href'] ); ?>"><?php echo esc_html( $page['phone'] ); ?></a></li>
          <li><a href="<?php echo esc_url( home_url( '/new-patient-registration-form/' ) ); ?>">Complete New Patient Registration</a></li>
          <li><button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-panel')"><?php echo esc_html( $primary_cta ); ?></button></li>
        </ul>
      </div>
    </aside>
  </section>

  <section class="loc-sec loc-sec-white">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl"><?php echo esc_html( $intro_eyebrow ); ?></span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $intro_heading ); ?></h2>
      <p class="loc-copy"><?php echo esc_html( $intro_body ); ?></p>
      <div class="loc-actions">
        <a class="btn-ghost" href="<?php echo esc_url( home_url( '/new-patient-registration-form/' ) ); ?>">New Patient Registration</a>
        <a class="btn-ghost" href="<?php echo esc_url( vmc_patient_portal_page_url() ); ?>" onclick="openPortalModal('portal','loc-seo'); return false;">Patient Portal &amp; Booking</a>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-white" style="padding-top:0">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">Why Choose Us</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $page['keyword'] ); ?> care with continuity and practical guidance.</h2>
      <p class="loc-copy">Veterinary Medical Center helps families who want clear communication, thoughtful treatment planning, and a team that follows through. Our goal is steady care from first visits through senior support, with recommendations that make sense for real households.</p>
      <div class="loc-grid-2">
        <article class="loc-image-card">
          <img src="<?php echo esc_url( get_field( 'loc_image' ) ?: $page['image'] ); ?>" alt="<?php echo esc_attr( get_field( 'loc_image_alt' ) ?: $page['image_alt'] ); ?>" loading="eager">
          <div class="loc-image-caption"><?php echo esc_html( get_field( 'loc_image_caption' ) ?: 'A local VMC location for families searching ' . $page['keyword'] . '.' ); ?></div>
        </article>
        <article class="loc-card">
          <h3>What makes VMC different</h3>
          <ul class="loc-list"><?php foreach ( $page['trust'] as $item ) : ?><li><?php echo esc_html( $item ); ?></li><?php endforeach; ?></ul>
          <p>Learn more <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">about VMC</a>, compare our <a href="<?php echo esc_url( home_url( '/services/' ) ); ?>">veterinary services</a>, or review the <a href="<?php echo esc_url( home_url( '/first-vet-visit-northern-kentucky/' ) ); ?>">first visit guide</a>.</p>
        </article>
      </div>
      <div class="loc-actions">
        <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-why')">Book Online</button>
        <a class="btn-ghost" href="<?php echo esc_url( home_url( '/about/' ) ); ?>">Learn About VMC</a>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-warm">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">Services</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $page['keyword'] ); ?> services for dogs and cats.</h2>
      <p class="loc-copy">VMC provides full-service veterinary care in Northern Kentucky, including the everyday visits and more complicated medical decisions that pets need over a lifetime.</p>
      <div class="loc-grid-3">
        <?php foreach ( $service_cards as $service ) : ?>
          <article class="loc-service-card">
            <h3><?php echo esc_html( $service[0] ); ?></h3>
            <p><?php echo esc_html( $service[1] ); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
      <div class="loc-actions">
        <a class="btn-ghost" href="<?php echo esc_url( home_url( '/services/' ) ); ?>">Explore Services</a>
        <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-services')">Request Appointment</button>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-white">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">New Patients</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $page['new_patient_heading'] ); ?></h2>
      <div class="loc-grid-2">
        <?php foreach ( $page['new_patient_steps'] as $index => $step ) : ?>
          <article class="loc-card loc-step-card">
            <span class="num"><?php echo esc_html( $index + 1 ); ?></span>
            <h3><?php echo esc_html( $step[0] ); ?></h3>
            <p><?php echo esc_html( $step[1] ); ?></p>
          </article>
        <?php endforeach; ?>
      </div>
      <div class="loc-actions">
        <a class="btn-red" href="<?php echo esc_url( home_url( '/new-patient-registration-form/' ) ); ?>">Get Started as a New Patient</a>
        <a class="btn-ghost" href="tel:<?php echo esc_attr( $page['phone_href'] ); ?>">Call Now</a>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-white">
    <div class="loc-wrap rv">
      <div class="loc-grid-2">
        <article class="loc-card">
          <div class="sec-eye"><span class="sec-lbl">Local Credibility</span><span class="sec-rule"></span></div>
          <h2><?php echo esc_html( $page['community_heading'] ); ?></h2>
          <?php foreach ( $page['community'] as $paragraph ) : ?><p><?php echo esc_html( $paragraph ); ?></p><?php endforeach; ?>
          <div class="loc-chips"><?php foreach ( $page['areas'] as $area ) : ?><span class="loc-chip"><?php echo esc_html( $area ); ?></span><?php endforeach; ?></div>
        </article>
        <article class="loc-image-card">
          <img src="<?php echo esc_url( $page['second_image'] ); ?>" alt="<?php echo esc_attr( $page['second_alt'] ); ?>" loading="lazy">
          <div class="loc-image-caption">Women-led, locally owned veterinary care for families searching <?php echo esc_html( $page['keyword'] ); ?>.</div>
        </article>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-warm">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">Areas We Serve</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2">Areas we serve around <?php echo esc_html( $map_location_label ); ?>.</h2>
      <p class="loc-copy">We care for pets across nearby neighborhoods and surrounding communities, not only one zip code. If you are searching for a <?php echo esc_html( $page['keyword'] ); ?> option with practical access, review nearby service areas and choose the location that best fits your routine.</p>
      <?php if ( ! empty( $page['area_links'] ) ) : ?>
        <div class="loc-actions">
          <?php foreach ( $page['area_links'] as $nearby ) : ?>
            <a class="btn-ghost" href="<?php echo esc_url( home_url( $nearby['url'] ) ); ?>">Vet in <?php echo esc_html( $nearby['label'] ); ?></a>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <section class="loc-sec loc-sec-cream" id="directions">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">Location</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $page['location_heading'] ); ?></h2>
      <div class="loc-grid-2">
        <article class="loc-map-card">
          <iframe class="loc-map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=<?php echo esc_attr( $page['map_query'] ); ?>&z=15&output=embed" title="Map to Veterinary Medical Center <?php echo esc_attr( $map_location_label ); ?>"></iframe>
          <div class="loc-map-body">
            <h3><?php echo esc_html( $page['address'] ); ?></h3>
            <p>Call <a href="tel:<?php echo esc_attr( $page['phone_href'] ); ?>"><?php echo esc_html( $page['phone'] ); ?></a> or request an appointment online.</p>
            <div class="loc-meta">
              <div><strong>Phone</strong><a href="tel:<?php echo esc_attr( $page['phone_href'] ); ?>"><?php echo esc_html( $page['phone'] ); ?></a></div>
              <div><strong>Directions</strong><a href="https://maps.google.com/?q=<?php echo esc_attr( $page['map_query'] ); ?>" target="_blank" rel="noopener">Get Directions</a></div>
            </div>
            <div class="loc-actions">
              <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-map-primary')"><?php echo esc_html( $primary_cta ); ?></button>
              <a class="btn-ghost" href="https://maps.google.com/?q=<?php echo esc_attr( $page['map_query'] ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $secondary_cta ); ?></a>
            </div>
          </div>
        </article>
        <article class="loc-card">
          <h3><?php echo esc_html( $resource_heading ); ?></h3>
          <p><?php echo esc_html( $resource_body ); ?></p>
          <p><?php echo esc_html( $quick_body ); ?></p>
          <p>Use the <a href="<?php echo esc_url( home_url( '/new-patient-registration-form/' ) ); ?>">new patient registration form</a> before your appointment, <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">contact our team</a> with questions, browse the <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>">VMC blog</a>, or compare broader local search guidance on our <a href="<?php echo esc_url( home_url( '/northern-kentucky-vet-near-me/' ) ); ?>">Northern Kentucky vet near me page</a>.</p>
          <div class="loc-actions">
            <a class="btn-ghost" href="https://www.avma.org/resources-tools/pet-owners" target="_blank" rel="noopener">AVMA Pet Owner Resources</a>
            <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-map')"><?php echo esc_html( $primary_cta ); ?></button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-white">
    <div class="loc-wrap rv">
      <div class="sec-eye"><span class="sec-lbl">FAQ</span><span class="sec-rule"></span></div>
      <h2 class="sec-h2"><?php echo esc_html( $page['keyword'] ); ?> questions.</h2>
      <div class="loc-grid-2">
        <?php foreach ( $page['faq'] as $index => $faq ) : ?>
          <details class="loc-faq-card" <?php echo 0 === $index ? 'open' : ''; ?>>
            <summary><?php echo esc_html( $faq[0] ); ?></summary>
            <p><?php echo esc_html( $faq[1] ); ?></p>
          </details>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="loc-sec loc-sec-warm">
    <div class="loc-wrap rv">
      <article class="loc-cta-card">
        <h2>Simple next steps for pet families in <?php echo esc_html( $map_location_label ); ?>.</h2>
        <div class="loc-highlight-grid">
          <?php foreach ( $page['conversion_sections'] as $section ) : ?>
            <article class="loc-highlight-card">
              <h3><?php echo esc_html( $section['heading'] ); ?></h3>
              <p><?php echo esc_html( $section['body'] ); ?></p>
            </article>
          <?php endforeach; ?>
        </div>
        <?php if ( get_field( 'loc_seo_body' ) ) : ?>
          <div class="loc-copy"><?php echo wp_kses_post( get_field( 'loc_seo_body' ) ); ?></div>
        <?php endif; ?>
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
          <?php if ( trim( wp_strip_all_tags( get_the_content() ) ) ) : ?>
            <div class="loc-copy"><?php the_content(); ?></div>
          <?php endif; ?>
        <?php endwhile; endif; ?>
        <div class="loc-actions">
          <button class="btn-red" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-final')">Request Appointment</button>
          <button class="btn-ghost" onclick="openAptModal('location-<?php echo esc_attr( $page['template'] ); ?>-final-book')">Book Online</button>
          <a class="btn-outline" href="tel:<?php echo esc_attr( $page['phone_href'] ); ?>">Call Now</a>
        </div>
      </article>
    </div>
  </section>
</div>

<?php
$schema_faqs = [];
foreach ( $page['faq'] as $faq ) {
    $schema_faqs[] = [
        '@type'          => 'Question',
        'name'           => wp_strip_all_tags( $faq[0] ),
        'acceptedAnswer' => [ '@type' => 'Answer', 'text' => wp_strip_all_tags( $faq[1] ) ],
    ];
}

$street_address = trim( explode( ',', $page['address'] )[0] );
$locality = $page['template'] === 'cincinnati' ? 'Fort Thomas' : ( $page['template'] === 'fort-thomas' ? 'Fort Thomas' : 'Independence' );

$schema = [
    '@context' => 'https://schema.org',
    '@graph'   => [
        [
            '@type'       => 'WebPage',
            '@id'         => get_permalink() . '#webpage',
            'url'         => get_permalink(),
            'name'        => $page['h1'],
            'description' => $page['meta'],
            'about'       => [ '@type' => 'Thing', 'name' => $page['keyword'] ],
        ],
        [
            '@type'            => 'VeterinaryCare',
            '@id'              => get_permalink() . '#vmc-location',
            'name'             => $page['template'] === 'independence' ? 'Veterinary Medical Center - Independence' : 'Veterinary Medical Center - Fort Thomas',
            'url'              => get_permalink(),
            'telephone'        => $page['phone'],
            'address'          => [
                '@type'           => 'PostalAddress',
                'streetAddress'   => $street_address,
                'addressLocality' => $locality,
                'addressRegion'   => 'KY',
                'addressCountry'  => 'US',
            ],
            'areaServed'       => $page['areas'],
            'medicalSpecialty' => 'Veterinary medicine',
        ],
        [ '@type' => 'FAQPage', '@id' => get_permalink() . '#faq', 'mainEntity' => $schema_faqs ],
    ],
];

echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT ) . '</script>' . "\n";

get_footer();
