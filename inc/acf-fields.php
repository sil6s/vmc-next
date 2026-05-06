<?php
/**
 * ACF Local Field Groups — VMC Homepage SEO Sections
 * Registered programmatically so they work without WP Admin UI configuration.
 * All fields have default_value fallbacks used when no ACF value is saved.
 */

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
    return;
}

$_home = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'template-vmc-home-hybrid.php',
]];

// ══════════════════════════════════════════════════════════
// 1. Location SEO Sections
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_location_seo',
    'title'           => 'Home – Location SEO Sections',
    'menu_order'      => 20,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        // Fort Thomas
        [
            'key'           => 'field_ls_ft_heading',
            'label'         => 'Fort Thomas Heading',
            'name'          => 'ls_ft_heading',
            'type'          => 'text',
            'default_value' => 'Veterinarian in Fort Thomas, KY',
        ],
        [
            'key'           => 'field_ls_ft_body',
            'label'         => 'Fort Thomas Body',
            'name'          => 'ls_ft_body',
            'type'          => 'textarea',
            'rows'          => 6,
            'default_value' => 'Veterinary Medical Center\'s Fort Thomas location provides comprehensive veterinary care for dogs and cats in Fort Thomas and surrounding Northern Kentucky communities. Our team offers wellness exams, vaccinations, dental care, and surgery from a convenient location on Memorial Parkway. Families from Fort Thomas, Highland Heights, Bellevue, Newport, and nearby neighborhoods trust our experienced veterinarians to deliver personalized, relationship-based care. Whether you are looking for a routine wellness visit or need support for a more complex health issue, our Fort Thomas clinic is here to help with same-week appointments and a Fear-Free Certified approach to every visit.',
        ],
        [
            'key'           => 'field_ls_ft_neighborhoods',
            'label'         => 'Fort Thomas Nearby Communities',
            'name'          => 'ls_ft_neighborhoods',
            'type'          => 'text',
            'default_value' => 'Highland Heights, Bellevue, Newport, Campbell County, Southgate, Dayton',
        ],
        [
            'key'           => 'field_ls_ft_services',
            'label'         => 'Fort Thomas Key Services',
            'name'          => 'ls_ft_services',
            'type'          => 'text',
            'default_value' => 'Wellness Exams, Vaccinations, Dental Care, Soft Tissue Surgery, Urgent Care',
        ],
        // Independence
        [
            'key'           => 'field_ls_ind_heading',
            'label'         => 'Independence Heading',
            'name'          => 'ls_ind_heading',
            'type'          => 'text',
            'default_value' => 'Vet Clinic in Independence, KY',
        ],
        [
            'key'           => 'field_ls_ind_body',
            'label'         => 'Independence Body',
            'name'          => 'ls_ind_body',
            'type'          => 'textarea',
            'rows'          => 6,
            'default_value' => 'Our Independence location on Madison Pike serves pet families throughout central Northern Kentucky who want access to full-service veterinary care close to home. From routine wellness exams and pet vaccinations to dental cleanings and surgery, our experienced veterinarians are equipped to support your pet through every stage of life. We serve families in Independence, Covington, Florence, Erlanger, and nearby Kenton County communities. With same-week appointments and a Fear-Free Certified approach, we make high-quality veterinary care accessible and comfortable for dogs and cats across Northern Kentucky.',
        ],
        [
            'key'           => 'field_ls_ind_neighborhoods',
            'label'         => 'Independence Nearby Communities',
            'name'          => 'ls_ind_neighborhoods',
            'type'          => 'text',
            'default_value' => 'Covington, Florence, Erlanger, Kenton County, Edgewood, Taylor Mill',
        ],
        [
            'key'           => 'field_ls_ind_services',
            'label'         => 'Independence Key Services',
            'name'          => 'ls_ind_services',
            'type'          => 'text',
            'default_value' => 'Wellness Exams, Preventive Care, Pet Dental Cleaning, Surgery, Behavior Consultations',
        ],
        // Areas Served
        [
            'key'           => 'field_ls_areas_heading',
            'label'         => 'Areas Served Heading',
            'name'          => 'ls_areas_heading',
            'type'          => 'text',
            'default_value' => 'Serving Covington, Newport, Florence & Nearby Northern Kentucky Communities',
        ],
        [
            'key'           => 'field_ls_areas_body',
            'label'         => 'Areas Served Body',
            'name'          => 'ls_areas_body',
            'type'          => 'textarea',
            'rows'          => 5,
            'default_value' => 'Veterinary Medical Center serves pet families throughout Northern Kentucky and the Greater Cincinnati area. With two convenient locations, we are accessible to residents of Fort Thomas, Independence, Covington, Newport, Florence, Erlanger, Bellevue, Highland Heights, Cold Spring, Alexandria, and many more communities across the region. Whether you are searching for a trusted veterinarian near Cincinnati or a neighborhood vet clinic closer to home, our team is here to provide the same high standard of care at every visit.',
        ],
        [
            'key'           => 'field_ls_areas_list',
            'label'         => 'Areas Served Cities (comma-separated)',
            'name'          => 'ls_areas_list',
            'type'          => 'text',
            'default_value' => 'Fort Thomas, Independence, Covington, Newport, Florence, Erlanger, Bellevue, Highland Heights, Cold Spring, Alexandria, Taylor Mill, Edgewood, Southgate, Dayton, Silver Grove',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 11. Online Booking + Portal Landing Page
// ══════════════════════════════════════════════════════════
$portal_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'template-patient-portal-online-booking.php',
]];

acf_add_local_field_group([
    'key'             => 'group_portal_booking_page',
    'title'           => 'Patient Portal / Online Booking Page',
    'menu_order'      => 110,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $portal_template ],
    'fields'          => [
        [ 'key' => 'field_portal_h1', 'label' => 'H1', 'name' => 'portal_h1', 'type' => 'text', 'default_value' => 'Northern Kentucky & Cincinnati Patient Portal and Online Booking' ],
        [ 'key' => 'field_portal_intro', 'label' => 'Intro', 'name' => 'portal_intro', 'type' => 'textarea', 'rows' => 4, 'default_value' => 'Welcome to the Veterinary Medical Center patient portal and online booking page for Northern Kentucky and Cincinnati pet families. Use this secure page any time you need to sign in, request an appointment, review reminders, or complete the next step in your pet’s care plan.' ],
        [ 'key' => 'field_portal_external_link_label', 'label' => 'Portal Button Label', 'name' => 'portal_external_link_label', 'type' => 'text', 'default_value' => 'Open Patient Portal & Online Booking' ],
        [ 'key' => 'field_portal_external_link_url', 'label' => 'Portal External URL', 'name' => 'portal_external_link_url', 'type' => 'url', 'default_value' => 'https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2' ],
        [ 'key' => 'field_portal_body', 'label' => 'Long-form SEO Body', 'name' => 'portal_body', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 1, 'default_value' => '<h2>Fast, secure online booking for Northern Kentucky and Cincinnati pet owners</h2><p>If you are searching for a practical and secure way to manage veterinary appointments, this patient portal and online booking page is designed for you. Veterinary Medical Center supports pet families in Fort Thomas, Independence, and nearby Cincinnati neighborhoods with one simple destination for portal access. Instead of hunting through old emails, bookmarks, or social media links, you can return to this page to start in seconds.</p><p>Our goal is to make scheduling feel easier. Many clients are balancing school drop-off, commutes, work meetings, and home responsibilities. A reliable online booking workflow helps you plan wellness exams, follow-up visits, and routine care in a way that fits your day. Existing clients can use the patient portal to sign in, review messages, and continue ongoing care communication with our team.</p><h2>When to use the patient portal</h2><p>Use this page when you need to request an appointment online, access your portal login, or quickly move from a reminder message to action. Northern Kentucky and Cincinnati pet owners often return here for preventive care planning, medication discussions, and next-step visits after diagnostics. We recommend bookmarking this page so your household always has one trusted location for online access.</p><p>For brand-new families, the portal is only one part of getting started. You can also review our <a href=\"/new-patients/\">new patient page</a> and complete the <a href=\"/new-patient-registration-form/\">new patient registration form</a> before your first visit. Returning clients can combine portal access with direct support by phone if needed.</p><h3>Helpful links for faster care coordination</h3><ul><li><a href=\"/contact/\">Contact our team</a> if you need scheduling help.</li><li><a href=\"/services/\">Explore veterinary services</a> for wellness, dental, surgery, and urgent concerns.</li><li><a href=\"https://www.avma.org/resources-tools/pet-owners\" target=\"_blank\" rel=\"noopener\">AVMA pet owner resources</a> for education and prevention guidance.</li></ul><p>Veterinary Medical Center serves families across Northern Kentucky and Cincinnati with clear communication and relationship-based care. This page exists to reduce confusion and help you get where you need to go quickly. When in doubt, use the button above to open the official portal, then call us if you would like help choosing the right appointment type.</p>' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 12. Online Pharmacy Landing Page
// ══════════════════════════════════════════════════════════
$pharmacy_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'template-online-vet-pharmacy.php',
]];

acf_add_local_field_group([
    'key'             => 'group_online_pharmacy_page',
    'title'           => 'Online Vet Pharmacy Page',
    'menu_order'      => 111,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $pharmacy_template ],
    'fields'          => [
        [ 'key' => 'field_pharmacy_h1', 'label' => 'H1', 'name' => 'pharmacy_h1', 'type' => 'text', 'default_value' => 'Northern Kentucky & Cincinnati Online Vet Pharmacy' ],
        [ 'key' => 'field_pharmacy_intro', 'label' => 'Intro', 'name' => 'pharmacy_intro', 'type' => 'textarea', 'rows' => 4, 'default_value' => 'Use our Northern Kentucky and Cincinnati online vet pharmacy page to request eligible refills, browse trusted products, and ship medications directly to your home when available.' ],
        [ 'key' => 'field_pharmacy_external_link_label', 'label' => 'Pharmacy Button Label', 'name' => 'pharmacy_external_link_label', 'type' => 'text', 'default_value' => 'Open Online Vet Pharmacy' ],
        [ 'key' => 'field_pharmacy_external_link_url', 'label' => 'Pharmacy External URL', 'name' => 'pharmacy_external_link_url', 'type' => 'url', 'default_value' => 'https://nky-vet.ourvet.com/' ],
        [ 'key' => 'field_pharmacy_body', 'label' => 'Long-form SEO Body', 'name' => 'pharmacy_body', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 1, 'default_value' => '<h2>Trusted online vet pharmacy access for Northern Kentucky and Cincinnati</h2><p>Welcome to the Veterinary Medical Center online pharmacy page. If you are looking for a Northern Kentucky and Cincinnati online vet pharmacy that feels straightforward and reliable, this is your direct link hub. We created this page so clients can find the right pharmacy URL quickly, avoid outdated links, and request care products from one familiar source.</p><p>Our online pharmacy experience helps pet owners who need convenience without sacrificing confidence. Families can request eligible medications, browse preventive products, and manage refill timing from home. This is especially helpful for multi-pet households, busy work schedules, and owners who want to keep monthly prevention routines consistent throughout the year.</p><h2>Why local veterinary pharmacy coordination matters</h2><p>Even when shopping online, your veterinary relationship still matters. A connected online pharmacy allows your care team to review requests, confirm appropriateness, and support safe use based on your pet’s history. That coordination can reduce mistakes and improve continuity for chronic conditions, long-term prevention, and ongoing treatment plans.</p><p>Use this page whenever you need quick pharmacy access. We also recommend saving it to your browser bookmarks and sharing it with other family members responsible for pet care. If a medication appears delayed or unavailable, our team can help you choose a backup path by phone.</p><h3>Related resources for pet families</h3><ul><li><a href=\"/patient-portal-online-booking/\">Patient portal and online booking</a> for appointments and follow-up care.</li><li><a href=\"/contact/\">Contact us</a> for refill questions or medication timing support.</li><li><a href=\"/services/\">Veterinary services</a> to review treatment options for your dog or cat.</li><li><a href=\"https://www.fda.gov/animal-veterinary/animal-health-literacy/fda-and-pet-medications\" target=\"_blank\" rel=\"noopener\">FDA pet medication guidance</a> for medication safety education.</li></ul><p>Veterinary Medical Center serves pet owners in Northern Kentucky and nearby Cincinnati with practical, relationship-based care. Our online vet pharmacy page keeps pharmacy access clear so you can spend less time searching and more time focused on your pet’s health.</p>' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 10. New Patients Page – Booking/Portal/Form Options
// ══════════════════════════════════════════════════════════
$new_patients_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'page-new-patients.php',
]];

acf_add_local_field_group([
    'key'             => 'group_np_booking_options',
    'title'           => 'New Patients – Booking & Contact Options',
    'menu_order'      => 95,
    'position'        => 'side',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [
            'key'           => 'field_np_request_appointment_url',
            'label'         => 'Request Appointment URL',
            'name'          => 'request_appointment_url',
            'type'          => 'url',
            'default_value' => home_url('/patient-portal-online-booking/'),
            'instructions'  => 'Primary booking software link for new patient requests.',
        ],
        [
            'key'           => 'field_np_portal_url',
            'label'         => 'Patient Portal URL',
            'name'          => 'portal_url',
            'type'          => 'url',
            'default_value' => home_url('/patient-portal-online-booking/'),
            'instructions'  => 'Portal link (typically best for existing patients).',
        ],
        [
            'key'           => 'field_np_contact_form_shortcode',
            'label'         => 'Contact Form Shortcode',
            'name'          => 'contact_form_shortcode',
            'type'          => 'text',
            'default_value' => '',
            'instructions'  => 'Example: [gravityform id="1" title="false" description="false"]',
        ],
        [
            'key'           => 'field_np_booking_note',
            'label'         => 'Booking Note',
            'name'          => 'booking_note',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'After you book online, call, or message us, please complete the New Patient Registration Form before your visit (unless you are already an existing patient). If you have any issues, call either clinic or fill out the contact form — we would love to have you.',
        ],
        [
            'key'           => 'field_np_final_cta_eyebrow',
            'label'         => 'Final CTA Eyebrow',
            'name'          => 'final_cta_eyebrow',
            'type'          => 'text',
            'default_value' => 'Need Help Getting Started?',
        ],
        [
            'key'           => 'field_np_final_cta_heading',
            'label'         => 'Final CTA Heading',
            'name'          => 'final_cta_heading',
            'type'          => 'text',
            'default_value' => 'Book, call, or message us — then complete your new patient form.',
        ],
        [
            'key'           => 'field_np_final_cta_body',
            'label'         => 'Final CTA Body',
            'name'          => 'final_cta_body',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'Once your appointment is requested or scheduled, please complete the New Patient Registration Form before your visit unless you are already an existing patient. If anything feels unclear, call Fort Thomas or Independence, or use the form below. We would love to welcome you and your pet.',
        ],
        [
            'key'           => 'field_np_final_cta_form_btn',
            'label'         => 'Final CTA Form Button Label',
            'name'          => 'final_cta_form_btn',
            'type'          => 'text',
            'default_value' => 'Complete New Patient Form',
        ],
        [
            'key'           => 'field_np_bottom_seo_eyebrow',
            'label'         => 'Bottom SEO Eyebrow',
            'name'          => 'np_bottom_seo_eyebrow',
            'type'          => 'text',
            'default_value' => 'New Patients in Northern Kentucky',
        ],
        [
            'key'           => 'field_np_bottom_seo_heading',
            'label'         => 'Bottom SEO Heading',
            'name'          => 'np_bottom_seo_heading',
            'type'          => 'text',
            'default_value' => 'new patient veterinarian Northern Kentucky families can trust',
        ],
        [
            'key'           => 'field_np_bottom_seo_intro',
            'label'         => 'Bottom SEO Intro',
            'name'          => 'np_bottom_seo_intro',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'If you are searching for a new patient veterinarian Northern Kentucky pet owners rely on, Veterinary Medical Center is here to help at both our Fort Thomas and Independence locations. As a veterinarian Northern Kentucky team focused on clear communication, we guide you through forms, records, and first-visit expectations so you and your pet feel confident from day one.',
        ],
        [
            'key'           => 'field_np_bottom_seo_body_1',
            'label'         => 'Bottom SEO Body Paragraph 1',
            'name'          => 'np_bottom_seo_body_1',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'Many families looking for a vet accepting new patients Northern Kentucky choose us because appointments are practical, organized, and tailored to your pet\'s needs. If you have searched for a new patient vet near me, our two locations make it easier to find a convenient time and place for care.',
        ],
        [
            'key'           => 'field_np_bottom_seo_body_2',
            'label'         => 'Bottom SEO Body Paragraph 2',
            'name'          => 'np_bottom_seo_body_2',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'Our new patient veterinarian Northern Kentucky experience includes preventive planning, medical history review, and treatment recommendations you can understand. As your veterinarian Northern Kentucky partner, we support both routine wellness and more complex concerns with compassionate, evidence-based care.',
        ],
        [
            'key'           => 'field_np_bottom_seo_points',
            'label'         => 'Bottom SEO Bullet Points (one per line)',
            'name'          => 'np_bottom_seo_points',
            'type'          => 'textarea',
            'rows'          => 6,
            'default_value' => "new patient veterinarian Northern Kentucky appointments at Fort Thomas and Independence\nvet accepting new patients Northern Kentucky with same-week availability when possible\nnew patient vet near me support for paperwork, records transfer, and first-visit planning\nveterinarian Northern Kentucky guidance for dogs, cats, preventive care, and ongoing health needs",
        ],
        [
            'key'           => 'field_np_bottom_seo_cta_label',
            'label'         => 'Bottom SEO CTA Label',
            'name'          => 'np_bottom_seo_cta_label',
            'type'          => 'text',
            'default_value' => 'Request Your First Visit',
        ],
        [
            'key'           => 'field_np_bottom_seo_cta_url',
            'label'         => 'Bottom SEO CTA URL',
            'name'          => 'np_bottom_seo_cta_url',
            'type'          => 'url',
            'default_value' => home_url('/request-appointment/'),
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 2. Service SEO Blocks
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_service_seo',
    'title'           => 'Home – Service SEO Blocks',
    'menu_order'      => 30,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_sseo_heading',
            'label'         => 'Section Heading',
            'name'          => 'service_seo_heading',
            'type'          => 'text',
            'default_value' => 'Veterinary Services for Dogs & Cats in Northern Kentucky',
        ],
        [
            'key'           => 'field_sseo_intro',
            'label'         => 'Section Intro',
            'name'          => 'service_seo_intro',
            'type'          => 'textarea',
            'rows'          => 3,
            'default_value' => 'At Veterinary Medical Center, we offer a full range of veterinary services for dogs and cats at both our Fort Thomas and Independence locations. From routine wellness exams to specialized dental care and surgery, our experienced team is equipped to support your pet\'s health at every stage of life.',
        ],
        [
            'key'        => 'field_sseo_items',
            'label'      => 'Service Blocks',
            'name'       => 'service_seo_items',
            'type'       => 'repeater',
            'min'        => 0,
            'max'        => 8,
            'layout'     => 'block',
            'sub_fields' => [
                [ 'key' => 'field_ssi_title', 'label' => 'Title',        'name' => 'ssi_title', 'type' => 'text' ],
                [ 'key' => 'field_ssi_slug',  'label' => 'Icon Slug',    'name' => 'ssi_slug',  'type' => 'text', 'instructions' => 'wellness, dental, surgery, urgent, feline, behavioral' ],
                [ 'key' => 'field_ssi_what',  'label' => 'What It Is',   'name' => 'ssi_what',  'type' => 'textarea', 'rows' => 3 ],
                [ 'key' => 'field_ssi_when',  'label' => 'When Needed',  'name' => 'ssi_when',  'type' => 'textarea', 'rows' => 3 ],
                [ 'key' => 'field_ssi_why',   'label' => 'Why VMC',      'name' => 'ssi_why',   'type' => 'textarea', 'rows' => 3 ],
                [ 'key' => 'field_ssi_url',   'label' => 'Learn More URL','name' => 'ssi_url',  'type' => 'url' ],
            ],
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 3. Emergency / Urgent Care Section
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_emergency',
    'title'           => 'Home – Emergency / Urgent Care Section',
    'menu_order'      => 40,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_emerg_heading',
            'label'         => 'Heading',
            'name'          => 'emerg_heading',
            'type'          => 'text',
            'default_value' => 'Urgent Veterinary Care in Northern Kentucky',
        ],
        [
            'key'           => 'field_emerg_intro',
            'label'         => 'Intro Paragraph',
            'name'          => 'emerg_intro',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'When your pet needs prompt veterinary attention, Veterinary Medical Center provides urgent same-day care during business hours at both our Fort Thomas and Independence locations. Our experienced veterinarians are equipped to evaluate and treat many urgent conditions quickly so your pet gets the help they need without the long emergency room wait.',
        ],
        [
            'key'           => 'field_emerg_hours_note',
            'label'         => 'Hours Note',
            'name'          => 'emerg_hours_note',
            'type'          => 'text',
            'default_value' => 'Urgent care available Monday–Friday during regular clinic hours. Call ahead for fastest service.',
        ],
        [
            'key'           => 'field_emerg_signs_heading',
            'label'         => 'Signs Section Heading',
            'name'          => 'emerg_signs_heading',
            'type'          => 'text',
            'default_value' => 'Signs Your Pet Needs Urgent Care',
        ],
        [
            'key'           => 'field_emerg_signs',
            'label'         => 'Emergency Signs (one per line)',
            'name'          => 'emerg_signs',
            'type'          => 'textarea',
            'rows'          => 8,
            'default_value' => "Difficulty breathing or labored breathing\nSudden collapse or extreme weakness\nSeizures or uncontrolled trembling\nSevere vomiting or diarrhea (more than twice)\nUncontrolled bleeding or deep wounds\nSuspected poisoning or toxin ingestion\nInability to urinate, especially in cats\nEye injuries or sudden vision changes\nSevere limping or sudden inability to walk\nExtreme pain, crying out, or abnormal behavior",
        ],
        [
            'key'           => 'field_emerg_what_to_do',
            'label'         => 'What To Do',
            'name'          => 'emerg_what_to_do',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'Call our Fort Thomas or Independence clinic as soon as possible. Our team will advise you on urgency, guide you on what to do at home until you arrive, and prepare for your visit. If your pet needs overnight or 24-hour emergency care, we will help direct you to the appropriate emergency facility in the Greater Cincinnati area.',
        ],
        [
            'key'           => 'field_emerg_cta_label',
            'label'         => 'CTA Button Label',
            'name'          => 'emerg_cta_label',
            'type'          => 'text',
            'default_value' => 'Call Now for Urgent Care',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 4. FAQ Section Header
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_faq_seo',
    'title'           => 'Home – FAQ Section Header',
    'menu_order'      => 50,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_hfaq_heading',
            'label'         => 'FAQ Heading',
            'name'          => 'home_faq_heading',
            'type'          => 'text',
            'default_value' => 'Common Questions About Veterinary Care in Northern Kentucky',
        ],
        [
            'key'           => 'field_hfaq_intro',
            'label'         => 'FAQ Intro',
            'name'          => 'home_faq_intro',
            'type'          => 'textarea',
            'rows'          => 3,
            'default_value' => 'We have gathered answers to the questions we hear most often from pet owners in Fort Thomas, Independence, and throughout Northern Kentucky. If you don\'t see your question here, please call us directly — we are always happy to help.',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 5. New Patient SEO Section
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_np_seo',
    'title'           => 'Home – New Patient SEO Section',
    'menu_order'      => 60,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_npseo_heading',
            'label'         => 'Heading',
            'name'          => 'np_seo_heading',
            'type'          => 'text',
            'default_value' => 'New Patient Vet Visits in Northern Kentucky',
        ],
        [
            'key'           => 'field_npseo_intro',
            'label'         => 'Intro Paragraph',
            'name'          => 'np_seo_intro',
            'type'          => 'textarea',
            'rows'          => 4,
            'default_value' => 'Looking for a new veterinarian in Northern Kentucky for your dog or cat? Veterinary Medical Center welcomes new patients at both our Fort Thomas and Independence locations. We work hard to make first visits feel comfortable, clear, and stress-free for both pets and their owners. Same-week appointments are often available.',
        ],
        [
            'key'           => 'field_npseo_expect_heading',
            'label'         => 'What To Expect Heading',
            'name'          => 'np_seo_expect_heading',
            'type'          => 'text',
            'default_value' => 'What To Expect at Your First Vet Visit',
        ],
        [
            'key'           => 'field_npseo_expect_body',
            'label'         => 'What To Expect Body',
            'name'          => 'np_seo_expect_body',
            'type'          => 'textarea',
            'rows'          => 5,
            'default_value' => 'Your first appointment at Veterinary Medical Center includes a comprehensive physical exam, a review of your pet\'s health history, and a conversation about any concerns you have noticed. We discuss vaccination schedules, preventive care recommendations, and any next steps specific to your pet\'s needs. We encourage questions and want you to leave feeling informed and confident in your pet\'s care plan.',
        ],
        [
            'key'           => 'field_npseo_steps',
            'label'         => 'First Visit Steps (one per line)',
            'name'          => 'np_seo_steps',
            'type'          => 'textarea',
            'rows'          => 6,
            'default_value' => "Call or request an appointment online at either location\nBring any prior veterinary records or vaccination history\nArrive a few minutes early to complete new patient paperwork\nLet us know about any concerns, behavior changes, or symptoms\nAsk about our wellness plans and ongoing care options",
        ],
        [
            'key'           => 'field_npseo_cta_label',
            'label'         => 'CTA Button Label',
            'name'          => 'np_seo_cta_label',
            'type'          => 'text',
            'default_value' => 'Start as a New Patient',
        ],
        [
            'key'           => 'field_npseo_cta_url',
            'label'         => 'CTA URL',
            'name'          => 'np_seo_cta_url',
            'type'          => 'url',
            'default_value' => '',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 6. Blog / Resources Preview
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_blog_preview',
    'title'           => 'Home – Blog / Resources Preview',
    'menu_order'      => 70,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_blog_heading',
            'label'         => 'Section Heading',
            'name'          => 'blog_section_heading',
            'type'          => 'text',
            'default_value' => 'Pet Care Tips & Resources from Our Veterinary Team',
        ],
        [
            'key'           => 'field_blog_intro',
            'label'         => 'Section Intro',
            'name'          => 'blog_section_intro',
            'type'          => 'textarea',
            'rows'          => 3,
            'default_value' => 'Our veterinary team shares practical guidance to help you keep your pet healthy between visits. Browse our latest articles on pet health, wellness, and veterinary care in Northern Kentucky.',
        ],
        [
            'key'        => 'field_blog_articles',
            'label'      => 'Featured Articles (max 3)',
            'name'       => 'blog_articles',
            'type'       => 'repeater',
            'min'        => 0,
            'max'        => 3,
            'layout'     => 'block',
            'sub_fields' => [
                [ 'key' => 'field_ba_title',     'label' => 'Title',         'name' => 'ba_title',     'type' => 'text' ],
                [ 'key' => 'field_ba_excerpt',   'label' => 'Excerpt',       'name' => 'ba_excerpt',   'type' => 'textarea', 'rows' => 2 ],
                [ 'key' => 'field_ba_url',       'label' => 'URL',           'name' => 'ba_url',       'type' => 'url' ],
                [ 'key' => 'field_ba_category',  'label' => 'Category',      'name' => 'ba_category',  'type' => 'text' ],
                [ 'key' => 'field_ba_read_time', 'label' => 'Read Time',     'name' => 'ba_read_time', 'type' => 'text' ],
            ],
        ],
        [
            'key'           => 'field_blog_view_all_url',
            'label'         => 'View All URL',
            'name'          => 'blog_view_all_url',
            'type'          => 'url',
            'default_value' => '',
        ],
        [
            'key'           => 'field_blog_view_all_label',
            'label'         => 'View All Label',
            'name'          => 'blog_view_all_label',
            'type'          => 'text',
            'default_value' => 'View All Pet Care Articles',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 7. Internal Links Section
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_internal_links',
    'title'           => 'Home – Internal Links Section',
    'menu_order'      => 80,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_il_heading',
            'label'         => 'Section Heading',
            'name'          => 'intlinks_heading',
            'type'          => 'text',
            'default_value' => 'Explore Our Veterinary Services',
        ],
        [
            'key'        => 'field_il_items',
            'label'      => 'Link Items',
            'name'       => 'intlinks_items',
            'type'       => 'repeater',
            'min'        => 0,
            'max'        => 8,
            'layout'     => 'table',
            'sub_fields' => [
                [ 'key' => 'field_ili_label', 'label' => 'Label',       'name' => 'ili_label', 'type' => 'text' ],
                [ 'key' => 'field_ili_url',   'label' => 'URL',         'name' => 'ili_url',   'type' => 'url' ],
                [ 'key' => 'field_ili_desc',  'label' => 'Description', 'name' => 'ili_desc',  'type' => 'text' ],
            ],
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 8. Why VMC – Expanded Body
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_why_expanded',
    'title'           => 'Home – Why VMC Expanded Copy',
    'menu_order'      => 15,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_why_expanded_body',
            'label'         => 'Expanded Body Paragraph',
            'name'          => 'why_expanded_body',
            'type'          => 'textarea',
            'rows'          => 6,
            'default_value' => 'Veterinary Medical Center is a locally trusted veterinary clinic serving Fort Thomas, Independence, and communities throughout Northern Kentucky. Our experienced veterinarians are committed to compassionate pet care that respects both the animal and the family behind them. As an independently owned hospital, we answer to our clients and our community — not a corporate parent company. That independence allows us to invest in the kind of careful, unhurried care that makes a lasting difference in your pet\'s health and wellbeing. Whether you are searching for a trusted veterinarian in Northern Kentucky for the first time or looking for a second opinion on a complex diagnosis, our team is here to listen, advise, and support you at every step.',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// 9. Schema & CTA Options
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_home_schema_cta',
    'title'           => 'Home – Schema & CTA Options',
    'menu_order'      => 90,
    'position'        => 'side',
    'label_placement' => 'top',
    'location'        => [ $_home ],
    'fields'          => [
        [
            'key'           => 'field_home_cta_label',
            'label'         => 'Primary CTA Label (keyword-rich)',
            'name'          => 'home_cta_label',
            'type'          => 'text',
            'default_value' => 'Book a Vet Appointment in Northern Kentucky',
        ],
        [
            'key'           => 'field_home_cta_url',
            'label'         => 'Primary CTA URL',
            'name'          => 'home_cta_url',
            'type'          => 'url',
            'default_value' => '',
        ],
        [
            'key'           => 'field_schema_enable',
            'label'         => 'Enable Schema Markup',
            'name'          => 'schema_enable',
            'type'          => 'true_false',
            'default_value' => 1,
            'ui'            => 1,
        ],
        [
            'key'           => 'field_schema_price_range',
            'label'         => 'Price Range (for schema)',
            'name'          => 'schema_price_range',
            'type'          => 'text',
            'default_value' => '$$',
            'instructions'  => 'Used in LocalBusiness schema. E.g. $$',
        ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-A. New Patients – Hero & What To Bring
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_hero',
    'title'           => 'New Patients – Hero & What To Bring',
    'menu_order'      => 10,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_hero_image',               'label' => 'Hero Image URL',               'name' => 'hero_image',               'type' => 'url',      'default_value' => '' ],
        [ 'key' => 'field_np_hero_eyebrow',             'label' => 'Hero Eyebrow',                  'name' => 'hero_eyebrow',             'type' => 'text',     'default_value' => 'New Patients · Fort Thomas & Independence' ],
        [ 'key' => 'field_np_hero_title',               'label' => 'Hero Title (first line)',        'name' => 'hero_title',               'type' => 'text',     'default_value' => 'Your first visit,' ],
        [ 'key' => 'field_np_hero_title_em',            'label' => 'Hero Title (italic line)',       'name' => 'hero_title_em',            'type' => 'text',     'default_value' => 'made simple.' ],
        [ 'key' => 'field_np_hero_body',                'label' => 'Hero Body',                     'name' => 'hero_body',                'type' => 'textarea', 'rows' => 3, 'default_value' => "We know a new vet visit can feel stressful. We'll take care of you and your pet from the start, with clear steps before your visit, a thoughtful appointment experience, and no surprises after." ],
        [ 'key' => 'field_np_hero_btn_primary_label',   'label' => 'Hero Primary Button Label',     'name' => 'hero_btn_primary_label',   'type' => 'text',     'default_value' => 'Book a New Patient Visit' ],
        [ 'key' => 'field_np_hero_btn_secondary_label', 'label' => 'Hero Secondary Button Label',   'name' => 'hero_btn_secondary_label', 'type' => 'text',     'default_value' => 'Contact a Location' ],
        [ 'key' => 'field_np_stat_1_value',             'label' => 'Stat 1 Value',                  'name' => 'stat_1_value',             'type' => 'text',     'default_value' => '30–45' ],
        [ 'key' => 'field_np_stat_1_label',             'label' => 'Stat 1 Label',                  'name' => 'stat_1_label',             'type' => 'text',     'default_value' => 'Minute first visit' ],
        [ 'key' => 'field_np_stat_2_value',             'label' => 'Stat 2 Value',                  'name' => 'stat_2_value',             'type' => 'text',     'default_value' => 'Bring' ],
        [ 'key' => 'field_np_stat_2_label',             'label' => 'Stat 2 Label',                  'name' => 'stat_2_label',             'type' => 'text',     'default_value' => 'Records if you have them' ],
        [ 'key' => 'field_np_stat_3_value',             'label' => 'Stat 3 Value',                  'name' => 'stat_3_value',             'type' => 'text',     'default_value' => '2' ],
        [ 'key' => 'field_np_stat_3_label',             'label' => 'Stat 3 Label',                  'name' => 'stat_3_label',             'type' => 'text',     'default_value' => 'Locations serving NKY' ],
        // What To Bring
        [ 'key' => 'field_np_bring_eyebrow',            'label' => 'Bring Eyebrow',                 'name' => 'bring_eyebrow',            'type' => 'text',     'default_value' => 'Before You Arrive' ],
        [ 'key' => 'field_np_bring_heading',            'label' => 'Bring Heading',                 'name' => 'bring_heading',            'type' => 'text',     'default_value' => 'What to bring to your first vet visit' ],
        [ 'key' => 'field_np_bring_step_1_title',       'label' => 'Bring Step 1 Title',            'name' => 'bring_step_1_title',       'type' => 'text',     'default_value' => 'Completed forms' ],
        [ 'key' => 'field_np_bring_step_1_body',        'label' => 'Bring Step 1 Body',             'name' => 'bring_step_1_body',        'type' => 'textarea', 'rows' => 2, 'default_value' => 'Bring your registration form, plus the surgery packet if your pet is scheduled for a procedure.' ],
        [ 'key' => 'field_np_bring_step_2_title',       'label' => 'Bring Step 2 Title',            'name' => 'bring_step_2_title',       'type' => 'text',     'default_value' => 'Medical records' ],
        [ 'key' => 'field_np_bring_step_2_body',        'label' => 'Bring Step 2 Body',             'name' => 'bring_step_2_body',        'type' => 'textarea', 'rows' => 2, 'default_value' => 'Vaccines, medications, prior exam notes, and anything from previous care if you already have it.' ],
        [ 'key' => 'field_np_bring_step_3_title',       'label' => 'Bring Step 3 Title',            'name' => 'bring_step_3_title',       'type' => 'text',     'default_value' => 'Your questions' ],
        [ 'key' => 'field_np_bring_step_3_body',        'label' => 'Bring Step 3 Body',             'name' => 'bring_step_3_body',        'type' => 'textarea', 'rows' => 2, 'default_value' => 'Changes in appetite, energy, behavior, mobility, skin, dental health, or bathroom habits are all helpful to mention.' ],
        [ 'key' => 'field_np_bring_note',               'label' => 'Bring Note',                    'name' => 'bring_note',               'type' => 'textarea', 'rows' => 2, 'default_value' => 'Dogs should arrive on a leash, and cats should come in a secure carrier. Arriving a few minutes early helps everything feel easier.' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-B. New Patients – Booking Options
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_booking',
    'title'           => 'New Patients – Booking Options Section',
    'menu_order'      => 20,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_booking_eyebrow',      'label' => 'Booking Eyebrow',       'name' => 'booking_eyebrow',      'type' => 'text',     'default_value' => 'Book Your Appointment' ],
        [ 'key' => 'field_np_booking_heading',      'label' => 'Booking Heading',       'name' => 'booking_heading',      'type' => 'text',     'default_value' => 'Choose the easiest way to book your new patient appointment.' ],
        [ 'key' => 'field_np_booking_body',         'label' => 'Booking Body',          'name' => 'booking_body',         'type' => 'textarea', 'rows' => 3, 'default_value' => 'Whether you want to book online, call our team, or send a message first, every path gets you to the same next step: a scheduled first visit and completed new patient paperwork.' ],
        [ 'key' => 'field_np_booking_card_1_title', 'label' => 'Card 1 Title',          'name' => 'booking_card_1_title', 'type' => 'text',     'default_value' => 'Book online now' ],
        [ 'key' => 'field_np_booking_card_1_body',  'label' => 'Card 1 Body',           'name' => 'booking_card_1_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Use our online scheduling software if you prefer to pick your appointment time yourself.' ],
        [ 'key' => 'field_np_booking_card_1_cta',   'label' => 'Card 1 CTA Label',      'name' => 'booking_card_1_cta',   'type' => 'text',     'default_value' => 'Request Appointment Online' ],
        [ 'key' => 'field_np_booking_card_2_title', 'label' => 'Card 2 Title',          'name' => 'booking_card_2_title', 'type' => 'text',     'default_value' => 'Call the clinic' ],
        [ 'key' => 'field_np_booking_card_2_body',  'label' => 'Card 2 Body',           'name' => 'booking_card_2_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Want help choosing a time or location? Call Fort Thomas or Independence and we will schedule your first visit for you.' ],
        [ 'key' => 'field_np_booking_card_3_title', 'label' => 'Card 3 Title',          'name' => 'booking_card_3_title', 'type' => 'text',     'default_value' => 'Fill out a contact form' ],
        [ 'key' => 'field_np_booking_card_3_body',  'label' => 'Card 3 Body',           'name' => 'booking_card_3_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Not ready to pick a time yet? Send a quick message and our local team will help with scheduling, paperwork, and next steps.' ],
        [ 'key' => 'field_np_booking_card_3_cta',   'label' => 'Card 3 CTA Label',      'name' => 'booking_card_3_cta',   'type' => 'text',     'default_value' => 'Open Contact Form' ],
        // Location phone/address/labels
        [ 'key' => 'field_np_ft_phone',             'label' => 'Fort Thomas Phone',     'name' => 'ft_phone',             'type' => 'text',     'default_value' => '(859) 442-4420' ],
        [ 'key' => 'field_np_ind_phone',            'label' => 'Independence Phone',    'name' => 'ind_phone',            'type' => 'text',     'default_value' => '(859) 356-2242' ],
        [ 'key' => 'field_np_ft_address',           'label' => 'Fort Thomas Address',   'name' => 'ft_address',           'type' => 'text',     'default_value' => '2000 Memorial Parkway, Fort Thomas, KY 41075' ],
        [ 'key' => 'field_np_ind_address',          'label' => 'Independence Address',  'name' => 'ind_address',          'type' => 'text',     'default_value' => '4147 Madison Pike, Independence, KY 41051' ],
        [ 'key' => 'field_np_ft_cta_label',         'label' => 'Fort Thomas CTA Label', 'name' => 'ft_cta_label',         'type' => 'text',     'default_value' => 'Call Fort Thomas' ],
        [ 'key' => 'field_np_ind_cta_label',        'label' => 'Independence CTA Label','name' => 'ind_cta_label',        'type' => 'text',     'default_value' => 'Call Independence' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-C. New Patients – Prepare / Forms
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_forms',
    'title'           => 'New Patients – Step 1: Prepare / Forms',
    'menu_order'      => 30,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_prepare_eyebrow',          'label' => 'Prepare Eyebrow',            'name' => 'prepare_eyebrow',          'type' => 'text',     'default_value' => 'Step 1 · Prepare' ],
        [ 'key' => 'field_np_prepare_heading',          'label' => 'Prepare Heading',            'name' => 'prepare_heading',          'type' => 'text',     'default_value' => 'A little prep now makes your visit smoother later.' ],
        [ 'key' => 'field_np_prepare_body',             'label' => 'Prepare Body',               'name' => 'prepare_body',             'type' => 'textarea', 'rows' => 3, 'default_value' => "Fill out the paperwork before you arrive so your appointment can focus on your pet, not the front desk. Choose the digital option if you want the easiest path, or download a paper copy to print and bring with you." ],
        [ 'key' => 'field_np_form1_digital_url',        'label' => 'Form 1 Digital URL',         'name' => 'form_1_digital_url',       'type' => 'url',      'default_value' => '' ],
        [ 'key' => 'field_np_form1_paper_url',          'label' => 'Form 1 Paper PDF URL',       'name' => 'form_1_paper_url',         'type' => 'url',      'default_value' => 'https://nkyvet.com/storage/app/media/newpatientregistration%20v120626.2.pdf' ],
        [ 'key' => 'field_np_form2_digital_url',        'label' => 'Form 2 Digital URL',         'name' => 'form_2_digital_url',       'type' => 'url',      'default_value' => '' ],
        [ 'key' => 'field_np_form2_paper_url',          'label' => 'Form 2 Paper PDF URL',       'name' => 'form_2_paper_url',         'type' => 'url',      'default_value' => 'https://nkyvet.com/storage/app/media/surgical-forms.pdf' ],
        [ 'key' => 'field_np_form1_kicker',             'label' => 'Form 1 Kicker',              'name' => 'form1_kicker',             'type' => 'text',     'default_value' => 'Required · All first visits' ],
        [ 'key' => 'field_np_form1_title',              'label' => 'Form 1 Title',               'name' => 'form1_title',              'type' => 'text',     'default_value' => 'New Patient Registration Form' ],
        [ 'key' => 'field_np_form1_description',        'label' => 'Form 1 Description',         'name' => 'form1_description',        'type' => 'textarea', 'rows' => 3, 'default_value' => "Complete this before your first appointment so we have your contact details, your pet's information, and the basics we need to welcome you properly." ],
        [ 'key' => 'field_np_form1_meta_needed',        'label' => 'Form 1 Meta: Needed For',    'name' => 'form1_meta_needed',        'type' => 'text',     'default_value' => 'All new patient appointments' ],
        [ 'key' => 'field_np_form1_meta_recommended',   'label' => 'Form 1 Meta: Recommended',   'name' => 'form1_meta_recommended',   'type' => 'text',     'default_value' => 'Use the digital form first' ],
        [ 'key' => 'field_np_form1_meta_paper',         'label' => 'Form 1 Meta: Paper Option',  'name' => 'form1_meta_paper',         'type' => 'text',     'default_value' => 'Print and bring to check-in' ],
        [ 'key' => 'field_np_form1_btn_digital_label',  'label' => 'Form 1 Digital Btn Label',   'name' => 'form1_btn_digital_label',  'type' => 'text',     'default_value' => 'Access Digital Form' ],
        [ 'key' => 'field_np_form1_btn_paper_label',    'label' => 'Form 1 Paper Btn Label',     'name' => 'form1_btn_paper_label',    'type' => 'text',     'default_value' => 'Download Paper Copy' ],
        [ 'key' => 'field_np_form2_kicker',             'label' => 'Form 2 Kicker',              'name' => 'form2_kicker',             'type' => 'text',     'default_value' => 'Required · Surgery patients only' ],
        [ 'key' => 'field_np_form2_title',              'label' => 'Form 2 Title',               'name' => 'form2_title',              'type' => 'text',     'default_value' => 'Surgical Information Packet' ],
        [ 'key' => 'field_np_form2_description',        'label' => 'Form 2 Description',         'name' => 'form2_description',        'type' => 'textarea', 'rows' => 3, 'default_value' => 'If your pet is scheduled for surgery or a procedure, review the packet ahead of time and complete anything requested before your visit.' ],
        [ 'key' => 'field_np_form2_meta_needed',        'label' => 'Form 2 Meta: Needed For',    'name' => 'form2_meta_needed',        'type' => 'text',     'default_value' => 'Surgery and procedure visits' ],
        [ 'key' => 'field_np_form2_meta_recommended',   'label' => 'Form 2 Meta: Recommended',   'name' => 'form2_meta_recommended',   'type' => 'text',     'default_value' => 'Review digitally before your visit' ],
        [ 'key' => 'field_np_form2_meta_paper',         'label' => 'Form 2 Meta: Paper Option',  'name' => 'form2_meta_paper',         'type' => 'text',     'default_value' => 'Download and print if needed' ],
        [ 'key' => 'field_np_form2_btn_digital_label',  'label' => 'Form 2 Digital Btn Label',   'name' => 'form2_btn_digital_label',  'type' => 'text',     'default_value' => 'Access Digital Form' ],
        [ 'key' => 'field_np_form2_btn_paper_label',    'label' => 'Form 2 Paper Btn Label',     'name' => 'form2_btn_paper_label',    'type' => 'text',     'default_value' => 'Download Paper Copy' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-D. New Patients – Visit Steps
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_visit',
    'title'           => 'New Patients – Step 2: Visit',
    'menu_order'      => 40,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_visit_eyebrow',          'label' => 'Visit Eyebrow',             'name' => 'visit_eyebrow',          'type' => 'text',     'default_value' => 'Step 2 · Visit' ],
        [ 'key' => 'field_np_visit_heading',          'label' => 'Visit Heading',             'name' => 'visit_heading',          'type' => 'text',     'default_value' => 'What your first appointment will feel like.' ],
        [ 'key' => 'field_np_visit_body',             'label' => 'Visit Body',                'name' => 'visit_body',             'type' => 'textarea', 'rows' => 3, 'default_value' => "Your first visit includes a full physical exam, time to talk through concerns, and clear recommendations for next steps. We want you to leave understanding what we saw, what it means, and what happens next." ],
        [ 'key' => 'field_np_visit_surgery_box_title','label' => 'Surgery Box Title',         'name' => 'visit_surgery_box_title','type' => 'text',     'default_value' => 'If your pet is scheduled for surgery' ],
        [ 'key' => 'field_np_visit_surgery_box_body', 'label' => 'Surgery Box Body',          'name' => 'visit_surgery_box_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => "Your veterinarian may recommend pre-anesthetic bloodwork or imaging depending on your pet's age and health. Before you leave, our team will review discharge instructions, medications if needed, what to watch for, and when to call." ],
        [ 'key' => 'field_np_visit_step_1_title',     'label' => 'Visit Step 1 Title',        'name' => 'visit_step_1_title',     'type' => 'text',     'default_value' => 'Check-in' ],
        [ 'key' => 'field_np_visit_step_1_body',      'label' => 'Visit Step 1 Body',         'name' => 'visit_step_1_body',      'type' => 'textarea', 'rows' => 2, 'default_value' => 'We confirm your paperwork, contact details, and any records you brought from previous providers.' ],
        [ 'key' => 'field_np_visit_step_2_title',     'label' => 'Visit Step 2 Title',        'name' => 'visit_step_2_title',     'type' => 'text',     'default_value' => 'History review' ],
        [ 'key' => 'field_np_visit_step_2_body',      'label' => 'Visit Step 2 Body',         'name' => 'visit_step_2_body',      'type' => 'textarea', 'rows' => 2, 'default_value' => "We talk through your pet's routine, symptoms, medications, prior care, and the questions most on your mind." ],
        [ 'key' => 'field_np_visit_step_3_title',     'label' => 'Visit Step 3 Title',        'name' => 'visit_step_3_title',     'type' => 'text',     'default_value' => 'Physical exam' ],
        [ 'key' => 'field_np_visit_step_3_body',      'label' => 'Visit Step 3 Body',         'name' => 'visit_step_3_body',      'type' => 'textarea', 'rows' => 2, 'default_value' => 'Your veterinarian performs a full exam and explains findings in clear language as you go.' ],
        [ 'key' => 'field_np_visit_step_4_title',     'label' => 'Visit Step 4 Title',        'name' => 'visit_step_4_title',     'type' => 'text',     'default_value' => 'Recommendations' ],
        [ 'key' => 'field_np_visit_step_4_body',      'label' => 'Visit Step 4 Body',         'name' => 'visit_step_4_body',      'type' => 'textarea', 'rows' => 2, 'default_value' => 'We walk through care options, diagnostics, treatment plans, and any follow-up that makes sense.' ],
        [ 'key' => 'field_np_visit_step_5_title',     'label' => 'Visit Step 5 Title',        'name' => 'visit_step_5_title',     'type' => 'text',     'default_value' => 'Checkout' ],
        [ 'key' => 'field_np_visit_step_5_body',      'label' => 'Visit Step 5 Body',         'name' => 'visit_step_5_body',      'type' => 'textarea', 'rows' => 2, 'default_value' => "You leave with next steps, a clearer picture of your pet's health, and answers you can actually use." ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-E. New Patients – Services Cards (numbered, no repeater)
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_services',
    'title'           => 'New Patients – Services Section',
    'menu_order'      => 50,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_services_eyebrow', 'label' => 'Services Eyebrow', 'name' => 'services_eyebrow', 'type' => 'text',     'default_value' => 'Our Services' ],
        [ 'key' => 'field_np_services_heading', 'label' => 'Services Heading', 'name' => 'services_heading', 'type' => 'text',     'default_value' => 'Everything your pet needs under one roof.' ],
        [ 'key' => 'field_np_services_body',    'label' => 'Services Body',    'name' => 'services_body',    'type' => 'textarea', 'rows' => 2, 'default_value' => 'From routine wellness to surgery and urgent care, our team provides the full range of veterinary services for dogs and cats across Northern Kentucky.' ],
        [ 'key' => 'field_np_services_all_url', 'label' => 'View All URL',     'name' => 'services_all_url', 'type' => 'url',      'default_value' => '/services/' ],
        [ 'key' => 'field_np_services_all_lbl', 'label' => 'View All Label',   'name' => 'services_all_label','type' => 'text',    'default_value' => 'View All Services' ],
        // Card 1
        [ 'key' => 'field_np_svc1_icon',  'label' => 'Service 1 Icon Key', 'name' => 'service_1_icon_key', 'type' => 'text',     'default_value' => 'wellness',   'instructions' => 'wellness, dental, surgery, behavioral, urgent, feline, diagnostic' ],
        [ 'key' => 'field_np_svc1_title', 'label' => 'Service 1 Title',    'name' => 'service_1_title',    'type' => 'text',     'default_value' => 'Wellness & Preventive Care' ],
        [ 'key' => 'field_np_svc1_body',  'label' => 'Service 1 Body',     'name' => 'service_1_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Annual exams, vaccines, parasite prevention, and life stage guidance for every dog and cat.' ],
        [ 'key' => 'field_np_svc1_url',   'label' => 'Service 1 URL',      'name' => 'service_1_url',      'type' => 'url',      'default_value' => '/service-item/pet-wellness-exams-northern-kentucky/' ],
        [ 'key' => 'field_np_svc1_cta',   'label' => 'Service 1 CTA',      'name' => 'service_1_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
        // Card 2
        [ 'key' => 'field_np_svc2_icon',  'label' => 'Service 2 Icon Key', 'name' => 'service_2_icon_key', 'type' => 'text',     'default_value' => 'dental' ],
        [ 'key' => 'field_np_svc2_title', 'label' => 'Service 2 Title',    'name' => 'service_2_title',    'type' => 'text',     'default_value' => 'Dental Care & COHAT' ],
        [ 'key' => 'field_np_svc2_body',  'label' => 'Service 2 Body',     'name' => 'service_2_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Oral exams, cleanings, and comprehensive dental treatment to protect long-term health.' ],
        [ 'key' => 'field_np_svc2_url',   'label' => 'Service 2 URL',      'name' => 'service_2_url',      'type' => 'url',      'default_value' => '/service-item/veterinary-dental-care-northern-kentucky/' ],
        [ 'key' => 'field_np_svc2_cta',   'label' => 'Service 2 CTA',      'name' => 'service_2_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
        // Card 3
        [ 'key' => 'field_np_svc3_icon',  'label' => 'Service 3 Icon Key', 'name' => 'service_3_icon_key', 'type' => 'text',     'default_value' => 'surgery' ],
        [ 'key' => 'field_np_svc3_title', 'label' => 'Service 3 Title',    'name' => 'service_3_title',    'type' => 'text',     'default_value' => 'Soft Tissue Surgery' ],
        [ 'key' => 'field_np_svc3_body',  'label' => 'Service 3 Body',     'name' => 'service_3_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Common and advanced surgical procedures with close anesthesia monitoring and attentive recovery care.' ],
        [ 'key' => 'field_np_svc3_url',   'label' => 'Service 3 URL',      'name' => 'service_3_url',      'type' => 'url',      'default_value' => '/service-item/pet-soft-tissue-surgery-northern-kentucky/' ],
        [ 'key' => 'field_np_svc3_cta',   'label' => 'Service 3 CTA',      'name' => 'service_3_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
        // Card 4
        [ 'key' => 'field_np_svc4_icon',  'label' => 'Service 4 Icon Key', 'name' => 'service_4_icon_key', 'type' => 'text',     'default_value' => 'behavioral' ],
        [ 'key' => 'field_np_svc4_title', 'label' => 'Service 4 Title',    'name' => 'service_4_title',    'type' => 'text',     'default_value' => 'Behavior Consultations' ],
        [ 'key' => 'field_np_svc4_body',  'label' => 'Service 4 Body',     'name' => 'service_4_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Anxiety, aggression, and environmental concerns addressed with a clear, practical treatment plan.' ],
        [ 'key' => 'field_np_svc4_url',   'label' => 'Service 4 URL',      'name' => 'service_4_url',      'type' => 'url',      'default_value' => '/service-item/pet-behavior-consultations-northern-kentucky/' ],
        [ 'key' => 'field_np_svc4_cta',   'label' => 'Service 4 CTA',      'name' => 'service_4_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
        // Card 5
        [ 'key' => 'field_np_svc5_icon',  'label' => 'Service 5 Icon Key', 'name' => 'service_5_icon_key', 'type' => 'text',     'default_value' => 'urgent' ],
        [ 'key' => 'field_np_svc5_title', 'label' => 'Service 5 Title',    'name' => 'service_5_title',    'type' => 'text',     'default_value' => 'Urgent Care' ],
        [ 'key' => 'field_np_svc5_body',  'label' => 'Service 5 Body',     'name' => 'service_5_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Prompt attention for non-life-threatening concerns — call us first and we will guide you.' ],
        [ 'key' => 'field_np_svc5_url',   'label' => 'Service 5 URL',      'name' => 'service_5_url',      'type' => 'url',      'default_value' => '/service-item/urgent-veterinary-care-northern-kentucky/' ],
        [ 'key' => 'field_np_svc5_cta',   'label' => 'Service 5 CTA',      'name' => 'service_5_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
        // Card 6
        [ 'key' => 'field_np_svc6_icon',  'label' => 'Service 6 Icon Key', 'name' => 'service_6_icon_key', 'type' => 'text',     'default_value' => 'feline' ],
        [ 'key' => 'field_np_svc6_title', 'label' => 'Service 6 Title',    'name' => 'service_6_title',    'type' => 'text',     'default_value' => 'Feline-Friendly Visits' ],
        [ 'key' => 'field_np_svc6_body',  'label' => 'Service 6 Body',     'name' => 'service_6_body',     'type' => 'textarea', 'rows' => 2, 'default_value' => 'Quieter, lower-stress appointments designed for cats, including dedicated feline appointment hours.' ],
        [ 'key' => 'field_np_svc6_url',   'label' => 'Service 6 URL',      'name' => 'service_6_url',      'type' => 'url',      'default_value' => '/service-item/cat-friendly-veterinarian-northern-kentucky/' ],
        [ 'key' => 'field_np_svc6_cta',   'label' => 'Service 6 CTA',      'name' => 'service_6_cta',      'type' => 'text',     'default_value' => 'Learn More' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-F. New Patients – Testimonials (numbered, no repeater)
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_testimonials',
    'title'           => 'New Patients – Testimonials',
    'menu_order'      => 60,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_test_eyebrow', 'label' => 'Testimonials Eyebrow', 'name' => 'testimonials_eyebrow', 'type' => 'text',     'default_value' => 'What Clients Say' ],
        [ 'key' => 'field_np_test_heading', 'label' => 'Testimonials Heading', 'name' => 'testimonials_heading', 'type' => 'text',     'default_value' => 'Heard from families just like yours.' ],
        [ 'key' => 'field_np_test_body',    'label' => 'Testimonials Body',    'name' => 'testimonials_body',    'type' => 'textarea', 'rows' => 2, 'default_value' => 'Real feedback from Northern Kentucky pet owners who brought their animals in for the first time.' ],
        [ 'key' => 'field_np_t1_quote',    'label' => 'Testimonial 1 Quote',    'name' => 'testimonial_1_quote',    'type' => 'textarea', 'rows' => 3, 'default_value' => 'The team made our first visit genuinely easy. They answered every question, walked us through the exam as it happened, and we left feeling like we actually knew what was going on.' ],
        [ 'key' => 'field_np_t1_author',   'label' => 'Testimonial 1 Author',   'name' => 'testimonial_1_author',   'type' => 'text',     'default_value' => 'Jessica M.' ],
        [ 'key' => 'field_np_t1_location', 'label' => 'Testimonial 1 Location', 'name' => 'testimonial_1_location', 'type' => 'text',     'default_value' => 'Fort Thomas' ],
        [ 'key' => 'field_np_t2_quote',    'label' => 'Testimonial 2 Quote',    'name' => 'testimonial_2_quote',    'type' => 'textarea', 'rows' => 3, 'default_value' => 'I was nervous about switching vets mid-year, but they had our records sorted before we even sat down. The vet spent real time with us. That meant a lot.' ],
        [ 'key' => 'field_np_t2_author',   'label' => 'Testimonial 2 Author',   'name' => 'testimonial_2_author',   'type' => 'text',     'default_value' => 'Daniel R.' ],
        [ 'key' => 'field_np_t2_location', 'label' => 'Testimonial 2 Location', 'name' => 'testimonial_2_location', 'type' => 'text',     'default_value' => 'Independence' ],
        [ 'key' => 'field_np_t3_quote',    'label' => 'Testimonial 3 Quote',    'name' => 'testimonial_3_quote',    'type' => 'textarea', 'rows' => 3, 'default_value' => 'Our cat usually hates vet visits but she was visibly calmer here. The exam room was quiet, the staff moved slowly and gently, and she did great.' ],
        [ 'key' => 'field_np_t3_author',   'label' => 'Testimonial 3 Author',   'name' => 'testimonial_3_author',   'type' => 'text',     'default_value' => 'Mara T.' ],
        [ 'key' => 'field_np_t3_location', 'label' => 'Testimonial 3 Location', 'name' => 'testimonial_3_location', 'type' => 'text',     'default_value' => 'Fort Thomas' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-G. New Patients – Payment
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_payment',
    'title'           => 'New Patients – Step 3: Payment',
    'menu_order'      => 70,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_pay_eyebrow',       'label' => 'Payment Eyebrow',        'name' => 'pay_eyebrow',       'type' => 'text',     'default_value' => 'Step 3 · After' ],
        [ 'key' => 'field_np_pay_heading',       'label' => 'Payment Heading',        'name' => 'pay_heading',       'type' => 'text',     'default_value' => 'Payment options before your visit.' ],
        [ 'key' => 'field_np_pay_body',          'label' => 'Payment Body',           'name' => 'pay_body',          'type' => 'textarea', 'rows' => 2, 'default_value' => 'Payment is due at the time of service. We accept several payment methods, and we can help you understand financing or reimbursement options before you leave.' ],
        [ 'key' => 'field_np_pay_summary_title', 'label' => 'Summary Box Title',      'name' => 'pay_summary_title', 'type' => 'text',     'default_value' => 'What to expect when it is time to pay' ],
        [ 'key' => 'field_np_pay_summary_body',  'label' => 'Summary Box Body',       'name' => 'pay_summary_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Most visits are simple at checkout. Standard payment methods are accepted at the time of service, and additional support may be available for larger or unexpected expenses.' ],
        [ 'key' => 'field_np_pay_card1_title',   'label' => 'Card 1 Title',           'name' => 'pay_card1_title',   'type' => 'text',     'default_value' => 'Accepted payments' ],
        [ 'key' => 'field_np_pay_card1_body',    'label' => 'Card 1 Body',            'name' => 'pay_card1_body',    'type' => 'textarea', 'rows' => 2, 'default_value' => 'We accept the standard payment methods most clients expect at checkout.' ],
        [ 'key' => 'field_np_pay_method_1_lbl',  'label' => 'Payment Method 1 Label', 'name' => 'pay_method_1_label','type' => 'text',     'default_value' => 'Cash and checks' ],
        [ 'key' => 'field_np_pay_method_1_note', 'label' => 'Payment Method 1 Note',  'name' => 'pay_method_1_note', 'type' => 'text',     'default_value' => 'are accepted.' ],
        [ 'key' => 'field_np_pay_method_2_lbl',  'label' => 'Payment Method 2 Label', 'name' => 'pay_method_2_label','type' => 'text',     'default_value' => 'Debit cards' ],
        [ 'key' => 'field_np_pay_method_2_note', 'label' => 'Payment Method 2 Note',  'name' => 'pay_method_2_note', 'type' => 'text',     'default_value' => 'are accepted.' ],
        [ 'key' => 'field_np_pay_method_3_lbl',  'label' => 'Payment Method 3 Label', 'name' => 'pay_method_3_label','type' => 'text',     'default_value' => 'Major credit cards' ],
        [ 'key' => 'field_np_pay_method_3_note', 'label' => 'Payment Method 3 Note',  'name' => 'pay_method_3_note', 'type' => 'text',     'default_value' => 'including Visa, Mastercard, Discover, and Amex are accepted.' ],
        [ 'key' => 'field_np_pay_card2_title',   'label' => 'Card 2 Title',           'name' => 'pay_card2_title',   'type' => 'text',     'default_value' => 'Need more flexibility?' ],
        [ 'key' => 'field_np_pay_card2_body',    'label' => 'Card 2 Body',            'name' => 'pay_card2_body',    'type' => 'textarea', 'rows' => 2, 'default_value' => 'For larger balances or unexpected care, there may be options that help make payment more manageable.' ],
        [ 'key' => 'field_np_pay_flex_1_lbl',    'label' => 'Flex Option 1 Label',    'name' => 'pay_flex_1_label',  'type' => 'text',     'default_value' => 'CareCredit' ],
        [ 'key' => 'field_np_pay_flex_1_note',   'label' => 'Flex Option 1 Note',     'name' => 'pay_flex_1_note',   'type' => 'textarea', 'rows' => 2, 'default_value' => 'can help break larger balances into monthly payments for diagnostics, treatment, or surgery-related costs.' ],
        [ 'key' => 'field_np_pay_flex_2_lbl',    'label' => 'Flex Option 2 Label',    'name' => 'pay_flex_2_label',  'type' => 'text',     'default_value' => 'Pet insurance' ],
        [ 'key' => 'field_np_pay_flex_2_note',   'label' => 'Flex Option 2 Note',     'name' => 'pay_flex_2_note',   'type' => 'textarea', 'rows' => 2, 'default_value' => 'clients can request documentation for reimbursement, depending on their provider and plan.' ],
        [ 'key' => 'field_np_pay_flex_link_url', 'label' => 'Flex Link URL',          'name' => 'pay_flex_link_url', 'type' => 'url',      'default_value' => 'https://www.carecredit.com/' ],
        [ 'key' => 'field_np_pay_flex_link_lbl', 'label' => 'Flex Link Label',        'name' => 'pay_flex_link_label','type' => 'text',    'default_value' => 'Learn about CareCredit' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-H. New Patients – Contact / Locations
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_contact',
    'title'           => 'New Patients – Contact & Locations',
    'menu_order'      => 80,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_contact_eyebrow',         'label' => 'Contact Eyebrow',            'name' => 'contact_eyebrow',         'type' => 'text',     'default_value' => 'Contact' ],
        [ 'key' => 'field_np_contact_heading',         'label' => 'Contact Heading',            'name' => 'contact_heading',         'type' => 'text',     'default_value' => 'Choose the location that works best for you.' ],
        [ 'key' => 'field_np_contact_body',            'label' => 'Contact Body',               'name' => 'contact_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'Call either location with questions about your first visit, forms, records, or scheduling.' ],
        [ 'key' => 'field_np_ft_location_name',        'label' => 'Fort Thomas Location Name',  'name' => 'ft_location_name',        'type' => 'text',     'default_value' => 'Fort Thomas' ],
        [ 'key' => 'field_np_ind_location_name',       'label' => 'Independence Location Name', 'name' => 'ind_location_name',       'type' => 'text',     'default_value' => 'Independence' ],
        [ 'key' => 'field_np_contact_form_heading',    'label' => 'Contact Form Heading',       'name' => 'contact_form_heading',    'type' => 'text',     'default_value' => 'Prefer to send a message first?' ],
        [ 'key' => 'field_np_contact_form_body',       'label' => 'Contact Form Body',          'name' => 'contact_form_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Fill out the contact form and our team will help you schedule a new patient appointment, answer paperwork questions, or guide you to the right booking option.' ],
        [ 'key' => 'field_np_contact_form_fallback',   'label' => 'Contact Form Fallback CTA',  'name' => 'contact_form_fallback_cta','type' => 'text',    'default_value' => 'Open Contact Form' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// NP-I. New Patients – Convenience / Bottom SEO Cards
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_np_convenience',
    'title'           => 'New Patients – Convenience & Bottom SEO',
    'menu_order'      => 90,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $new_patients_template ],
    'fields'          => [
        [ 'key' => 'field_np_conv_eyebrow',    'label' => 'Section Eyebrow',   'name' => 'conv_eyebrow',    'type' => 'text',  'default_value' => 'Convenience First' ],
        [ 'key' => 'field_np_conv_heading',    'label' => 'Section Heading',   'name' => 'conv_heading',    'type' => 'text',  'default_value' => 'Designed to make veterinary care easier for busy Northern Kentucky families.' ],
        [ 'key' => 'field_np_conv_card1_title','label' => 'Card 1 Title',      'name' => 'conv_card1_title','type' => 'text',  'default_value' => 'Practical options that save time' ],
        [ 'key' => 'field_np_conv_card1_body', 'label' => 'Card 1 Body',       'name' => 'conv_card1_body', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 0, 'default_value' => "<p>We prioritize convenience for patients and pet owners with online booking, friendly phone support, and a contact form for quick questions. You can request visits digitally, call either location for real-time help, or message our team and we will guide you to the right next step.</p><ul><li><strong>Online pharmacy available:</strong> request refills and have medications delivered when eligible.</li><li><strong>Drop-off appointments available:</strong> ask our team if a drop-off visit fits your schedule.</li><li><strong>Two nearby locations:</strong> Fort Thomas and Independence appointments for dogs and cats.</li></ul>" ],
        [ 'key' => 'field_np_conv_card2_title','label' => 'Card 2 Title',      'name' => 'conv_card2_title','type' => 'text',  'default_value' => 'Local, independent, and relationship-focused' ],
        [ 'key' => 'field_np_conv_card2_body', 'label' => 'Card 2 Body',       'name' => 'conv_card2_body', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 0, 'default_value' => "<p>Veterinary Medical Center is locally owned and not corporate. Our doctors and support team live and work in the same communities we serve, and we focus on personalized care, transparent communication, and long-term relationships with each pet family.</p><p>We frequently help new patients from Fort Thomas, Independence, Cold Spring, Highland Heights, Bellevue, Newport, Alexandria, Crestview Hills, and nearby Northern Kentucky neighborhoods. If you are comparing options for a local veterinarian, we are here to help.</p>" ],
    ],
]);

// ══════════════════════════════════════════════════════════
// ABOUT PAGE – All Sections
// ══════════════════════════════════════════════════════════
$about_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'templates-about.php',
]];

acf_add_local_field_group([
    'key'             => 'group_about_hero',
    'title'           => 'About – Hero',
    'menu_order'      => 10,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        [ 'key' => 'field_ab_hero_eyebrow',           'label' => 'Hero Eyebrow',              'name' => 'about_hero_eyebrow',           'type' => 'text',     'default_value' => 'About Veterinary Medical Center' ],
        [ 'key' => 'field_ab_hero_title',             'label' => 'Hero H1',                   'name' => 'about_hero_title',             'type' => 'text',     'default_value' => 'An independently owned veterinary hospital in Northern Kentucky.' ],
        [ 'key' => 'field_ab_hero_body',              'label' => 'Hero Body',                 'name' => 'about_hero_body',              'type' => 'textarea', 'rows' => 3, 'default_value' => 'Veterinary Medical Center is an independently owned veterinary hospital in Northern Kentucky serving Fort Thomas, Independence, and surrounding communities with thoughtful, relationship-based care. Led by Dr. Kristi Baker, our local veterinary team helps dogs, cats, and their families with strong medicine, honest communication, and a calmer visit experience.' ],
        [ 'key' => 'field_ab_hero_btn1_label',        'label' => 'Hero Btn 1 Label',          'name' => 'about_hero_btn1_label',        'type' => 'text',     'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_ab_hero_btn2_label',        'label' => 'Hero Btn 2 Label',          'name' => 'about_hero_btn2_label',        'type' => 'text',     'default_value' => 'Explore Our Locations' ],
        [ 'key' => 'field_ab_stat1_value',            'label' => 'Stat 1 Value',              'name' => 'about_stat1_value',            'type' => 'text',     'default_value' => 'Local' ],
        [ 'key' => 'field_ab_stat1_label',            'label' => 'Stat 1 Label',              'name' => 'about_stat1_label',            'type' => 'text',     'default_value' => 'Independent ownership' ],
        [ 'key' => 'field_ab_stat2_value',            'label' => 'Stat 2 Value',              'name' => 'about_stat2_value',            'type' => 'text',     'default_value' => '2' ],
        [ 'key' => 'field_ab_stat2_label',            'label' => 'Stat 2 Label',              'name' => 'about_stat2_label',            'type' => 'text',     'default_value' => 'Northern Kentucky locations' ],
        [ 'key' => 'field_ab_stat3_value',            'label' => 'Stat 3 Value',              'name' => 'about_stat3_value',            'type' => 'text',     'default_value' => 'Fear Free' ],
        [ 'key' => 'field_ab_stat3_label',            'label' => 'Stat 3 Label',              'name' => 'about_stat3_label',            'type' => 'text',     'default_value' => 'Comfort-focused visits' ],
        // Side panel
        [ 'key' => 'field_ab_panel_heading',          'label' => 'Panel Heading',             'name' => 'about_panel_heading',          'type' => 'text',     'default_value' => 'Why families choose VMC' ],
        [ 'key' => 'field_ab_panel_item1_title',      'label' => 'Panel Item 1 Title',        'name' => 'about_panel_item1_title',      'type' => 'text',     'default_value' => 'Independent and community-rooted' ],
        [ 'key' => 'field_ab_panel_item1_body',       'label' => 'Panel Item 1 Body',         'name' => 'about_panel_item1_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We are based here because we live here, and the pets we care for belong to the same community we call home.' ],
        [ 'key' => 'field_ab_panel_item2_title',      'label' => 'Panel Item 2 Title',        'name' => 'about_panel_item2_title',      'type' => 'text',     'default_value' => 'Led by Dr. Kristi Baker' ],
        [ 'key' => 'field_ab_panel_item2_body',       'label' => 'Panel Item 2 Body',         'name' => 'about_panel_item2_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'As owner, Dr. Baker has shaped a veterinary practice that values continuity, compassion, and truly knowing the families it serves.' ],
        [ 'key' => 'field_ab_panel_item3_title',      'label' => 'Panel Item 3 Title',        'name' => 'about_panel_item3_title',      'type' => 'text',     'default_value' => 'Full-service and relationship-based' ],
        [ 'key' => 'field_ab_panel_item3_body',       'label' => 'Panel Item 3 Body',         'name' => 'about_panel_item3_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We support routine wellness, surgery, dental care, and long-term health with a more personal, less rushed approach to veterinary medicine.' ],
        [ 'key' => 'field_ab_panel_item4_title',      'label' => 'Panel Item 4 Title',        'name' => 'about_panel_item4_title',      'type' => 'text',     'default_value' => 'Real guidance for pet owners' ],
        [ 'key' => 'field_ab_panel_item4_body',       'label' => 'Panel Item 4 Body',         'name' => 'about_panel_item4_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We believe families deserve practical support, clear answers, and education that helps pets thrive between visits too.' ],
        [ 'key' => 'field_ab_panel_note',             'label' => 'Panel Note',                'name' => 'about_panel_note',             'type' => 'textarea', 'rows' => 2, 'default_value' => 'Proudly serving Fort Thomas, Independence, Covington, and pet families throughout Northern Kentucky and Greater Cincinnati.' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_locations',
    'title'           => 'About – Locations Section',
    'menu_order'      => 20,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        [ 'key' => 'field_ab_loc_eyebrow',     'label' => 'Section Eyebrow',         'name' => 'about_loc_eyebrow',     'type' => 'text',     'default_value' => 'Our Locations' ],
        [ 'key' => 'field_ab_loc_heading',     'label' => 'Section Heading',         'name' => 'about_loc_heading',     'type' => 'text',     'default_value' => 'A Fort Thomas vet and Independence vet with the same personal approach to care.' ],
        [ 'key' => 'field_ab_loc_body',        'label' => 'Section Body',            'name' => 'about_loc_body',        'type' => 'textarea', 'rows' => 3, 'default_value' => 'Families choose Veterinary Medical Center because they want both convenience and continuity. With veterinary offices in Fort Thomas and Independence, we serve pet owners across Northern Kentucky while preserving the neighborhood feel that makes care more comfortable and personal.' ],
        // Fort Thomas
        [ 'key' => 'field_ab_ft_eyebrow',     'label' => 'FT Sub-Eyebrow',          'name' => 'about_ft_eyebrow',      'type' => 'text',     'default_value' => 'Fort Thomas, KY' ],
        [ 'key' => 'field_ab_ft_heading',     'label' => 'FT Heading',              'name' => 'about_ft_heading',      'type' => 'text',     'default_value' => 'A trusted vet in Fort Thomas for dogs, cats, and their families.' ],
        [ 'key' => 'field_ab_ft_body1',       'label' => 'FT Body Paragraph 1',    'name' => 'about_ft_body1',        'type' => 'textarea', 'rows' => 3, 'default_value' => 'Our Fort Thomas location gives local pet families a trusted veterinarian close to home. This office reflects the same approach that defines our practice everywhere: calm, relationship-based care that makes space for real questions and individualized recommendations.' ],
        [ 'key' => 'field_ab_ft_body2',       'label' => 'FT Body Paragraph 2',    'name' => 'about_ft_body2',        'type' => 'textarea', 'rows' => 3, 'default_value' => 'For many families, proximity matters. It makes wellness exams, vaccinations, dental follow-ups, and ongoing medical care easier to keep on schedule. We are proud to care for pets from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby communities throughout Northern Kentucky.' ],
        [ 'key' => 'field_ab_ft_btn1_label',  'label' => 'FT Btn 1 Label',         'name' => 'about_ft_btn1_label',   'type' => 'text',     'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_ab_ft_btn2_label',  'label' => 'FT Btn 2 Label',         'name' => 'about_ft_btn2_label',   'type' => 'text',     'default_value' => 'Get Directions' ],
        [ 'key' => 'field_ab_ft_image',       'label' => 'FT Image URL',            'name' => 'about_ft_image',        'type' => 'url',      'default_value' => '' ],
        // Independence
        [ 'key' => 'field_ab_ind_eyebrow',    'label' => 'IND Sub-Eyebrow',         'name' => 'about_ind_eyebrow',     'type' => 'text',     'default_value' => 'Independence, KY' ],
        [ 'key' => 'field_ab_ind_heading',    'label' => 'IND Heading',             'name' => 'about_ind_heading',     'type' => 'text',     'default_value' => 'A relationship-focused vet in Independence for everyday and ongoing care.' ],
        [ 'key' => 'field_ab_ind_body1',      'label' => 'IND Body Paragraph 1',   'name' => 'about_ind_body1',       'type' => 'textarea', 'rows' => 3, 'default_value' => 'Our Independence location helps make comprehensive veterinary care more accessible for families who want an independently owned hospital with a more personal feel. Here, pets and people are cared for with the same warmth, clarity, and comfort-focused approach that guides the entire practice.' ],
        [ 'key' => 'field_ab_ind_body2',      'label' => 'IND Body Paragraph 2',   'name' => 'about_ind_body2',       'type' => 'textarea', 'rows' => 3, 'default_value' => 'This location supports wellness visits, preventive medicine, dentistry, surgery, treatment planning, and ongoing guidance. We are grateful to serve loyal pet owners in Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and the surrounding Northern Kentucky area.' ],
        [ 'key' => 'field_ab_ind_btn1_label', 'label' => 'IND Btn 1 Label',        'name' => 'about_ind_btn1_label',  'type' => 'text',     'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_ab_ind_btn2_label', 'label' => 'IND Btn 2 Label',        'name' => 'about_ind_btn2_label',  'type' => 'text',     'default_value' => 'Get Directions' ],
        [ 'key' => 'field_ab_ind_image',      'label' => 'IND Image URL',           'name' => 'about_ind_image',       'type' => 'url',      'default_value' => '' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_local',
    'title'           => 'About – Local Veterinary Care',
    'menu_order'      => 25,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        [ 'key' => 'field_ab_local_eyebrow',      'label' => 'Section Eyebrow',          'name' => 'about_local_eyebrow',      'type' => 'text',     'default_value' => 'Local Veterinary Care' ],
        [ 'key' => 'field_ab_local_heading',      'label' => 'Section Heading',          'name' => 'about_local_heading',      'type' => 'text',     'default_value' => 'Veterinary care close to home in Fort Thomas and Independence.' ],
        [ 'key' => 'field_ab_local_body',         'label' => 'Section Body',             'name' => 'about_local_body',         'type' => 'textarea', 'rows' => 3, 'default_value' => 'When you search for a vet in Fort Thomas or a vet in Independence, you are usually looking for more than a nearby address. You want a team that is easy to reach, clear about next steps, and familiar enough with your pet to notice what changes over time.' ],
        [ 'key' => 'field_ab_local_card_heading', 'label' => 'Intro Card Heading',       'name' => 'about_local_card_heading', 'type' => 'text',     'default_value' => 'Care that fits Northern Kentucky families.' ],
        [ 'key' => 'field_ab_local_card_body',    'label' => 'Intro Card Body',          'name' => 'about_local_card_body',    'type' => 'textarea', 'rows' => 4, 'default_value' => 'Veterinary Medical Center brings preventive care, medical visits, dental care, surgery, and comfort-focused support together under one local practice. With two offices, families can choose the location that best fits their day while still staying connected to the same independent veterinary team.' ],
        [ 'key' => 'field_ab_local_ft_heading',   'label' => 'Fort Thomas Heading',      'name' => 'about_local_ft_heading',   'type' => 'text',     'default_value' => 'For Fort Thomas pet owners' ],
        [ 'key' => 'field_ab_local_ft_body',      'label' => 'Fort Thomas Body',         'name' => 'about_local_ft_body',      'type' => 'textarea', 'rows' => 4, 'default_value' => 'Our Fort Thomas veterinary team serves families near Memorial Parkway, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and the river city communities. We help with wellness exams, vaccines, dental needs, sick visits, surgery consultations, and practical at-home guidance.' ],
        [ 'key' => 'field_ab_local_ind_heading',  'label' => 'Independence Heading',     'name' => 'about_local_ind_heading',  'type' => 'text',     'default_value' => 'For Independence pet owners' ],
        [ 'key' => 'field_ab_local_ind_body',     'label' => 'Independence Body',        'name' => 'about_local_ind_body',     'type' => 'textarea', 'rows' => 4, 'default_value' => 'Our Independence veterinary team serves families near Madison Pike, Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky. We support new puppies and kittens, adult pets, senior pets, and families managing longer-term health needs.' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_practice',
    'title'           => 'About – Practice Stats & Story',
    'menu_order'      => 30,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        // About Our Practice
        [ 'key' => 'field_ab_prac_eyebrow',       'label' => 'Practice Eyebrow',          'name' => 'about_practice_eyebrow',    'type' => 'text',     'default_value' => 'About Our Practice' ],
        [ 'key' => 'field_ab_prac_heading',       'label' => 'Practice Heading',          'name' => 'about_practice_heading',    'type' => 'text',     'default_value' => 'An independently owned veterinary hospital Northern Kentucky families can know by name.' ],
        [ 'key' => 'field_ab_prac_body',          'label' => 'Practice Body',             'name' => 'about_practice_body',       'type' => 'textarea', 'rows' => 3, 'default_value' => 'When families look for an independently owned veterinary hospital in Northern Kentucky, they are often looking for more than a checklist of services. They want a place where questions are welcome, recommendations are clear, and their pet is treated like an individual. That is the kind of local veterinary practice Veterinary Medical Center was built to be.' ],
        [ 'key' => 'field_ab_sc1_value',          'label' => 'Stat Card 1 Value',         'name' => 'about_sc1_value',           'type' => 'text',     'default_value' => '2' ],
        [ 'key' => 'field_ab_sc1_heading',        'label' => 'Stat Card 1 Heading',       'name' => 'about_sc1_heading',         'type' => 'text',     'default_value' => 'Convenient locations' ],
        [ 'key' => 'field_ab_sc1_body',           'label' => 'Stat Card 1 Body',          'name' => 'about_sc1_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'We serve pet families from both Fort Thomas and Independence, making it easier to stay connected to care close to home.' ],
        [ 'key' => 'field_ab_sc2_value',          'label' => 'Stat Card 2 Value',         'name' => 'about_sc2_value',           'type' => 'text',     'default_value' => 'Full' ],
        [ 'key' => 'field_ab_sc2_heading',        'label' => 'Stat Card 2 Heading',       'name' => 'about_sc2_heading',         'type' => 'text',     'default_value' => 'Service hospital' ],
        [ 'key' => 'field_ab_sc2_body',           'label' => 'Stat Card 2 Body',          'name' => 'about_sc2_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'We provide preventive care, surgery, dental care, and medical support for pets through many life stages and health needs.' ],
        [ 'key' => 'field_ab_sc3_value',          'label' => 'Stat Card 3 Value',         'name' => 'about_sc3_value',           'type' => 'text',     'default_value' => 'Local' ],
        [ 'key' => 'field_ab_sc3_heading',        'label' => 'Stat Card 3 Heading',       'name' => 'about_sc3_heading',         'type' => 'text',     'default_value' => 'Independent ownership' ],
        [ 'key' => 'field_ab_sc3_body',           'label' => 'Stat Card 3 Body',          'name' => 'about_sc3_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'Our practice is shaped by the community around us, not by a remote corporate model or one-size-fits-all expectations.' ],
        [ 'key' => 'field_ab_sc4_value',          'label' => 'Stat Card 4 Value',         'name' => 'about_sc4_value',           'type' => 'text',     'default_value' => 'Fear Free' ],
        [ 'key' => 'field_ab_sc4_heading',        'label' => 'Stat Card 4 Heading',       'name' => 'about_sc4_heading',         'type' => 'text',     'default_value' => 'Comfort-focused care' ],
        [ 'key' => 'field_ab_sc4_body',           'label' => 'Stat Card 4 Body',          'name' => 'about_sc4_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'We care deeply about making the veterinary experience gentler, calmer, and more supportive for pets and people alike.' ],
        // Our Story
        [ 'key' => 'field_ab_story_eyebrow',      'label' => 'Story Eyebrow',             'name' => 'about_story_eyebrow',       'type' => 'text',     'default_value' => 'Our Story' ],
        [ 'key' => 'field_ab_story_heading',      'label' => 'Story Heading',             'name' => 'about_story_heading',       'type' => 'text',     'default_value' => 'The kind of independently owned veterinary practice you build when this community is your home.' ],
        [ 'key' => 'field_ab_story_body',         'label' => 'Story Intro Body',          'name' => 'about_story_body',          'type' => 'textarea', 'rows' => 3, 'default_value' => 'Veterinary Medical Center was built to serve Northern Kentucky families with care that feels more personal, more thoughtful, and more grounded. Dr. Kristi Baker is licensed in Kentucky and Ohio, but this independently owned veterinary hospital is rooted right here, because this is where we live, where we work, and where we have chosen to invest in long-term relationships with pets and their people.' ],
        [ 'key' => 'field_ab_story_card_heading', 'label' => 'Story Card Heading',        'name' => 'about_story_card_heading',  'type' => 'text',     'default_value' => 'More than a clinic' ],
        [ 'key' => 'field_ab_story_card_body',    'label' => 'Story Card Body',           'name' => 'about_story_card_body',     'type' => 'wysiwyg',  'toolbar' => 'basic', 'media_upload' => 0, 'default_value' => "<p>We are a full-service animal hospital, but the heart of this practice has always been bigger than that. We care deeply about the day-to-day lives of the pets we see, the families who trust us, and the kind of experience people walk away with after a visit.</p><p>That means strong medicine, of course, but it also means kindness, communication, and a calmer environment. We want the waiting room to feel welcoming, the exam room to feel less overwhelming, and every recommendation to feel honest, helpful, and rooted in what is best for your pet.</p><p>We believe the best veterinary care grows from familiarity and trust. Over time, that helps us understand your pet more fully and support your family more thoughtfully.</p>" ],
        [ 'key' => 'field_ab_sp1_title',          'label' => 'Story Point 1 Title',       'name' => 'about_sp1_title',           'type' => 'text',     'default_value' => 'Owned here. Built here.' ],
        [ 'key' => 'field_ab_sp1_body',           'label' => 'Story Point 1 Body',        'name' => 'about_sp1_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'This is not a distant corporate practice. It is an independently owned hospital shaped by people who are part of the Fort Thomas, Independence, and Northern Kentucky community.' ],
        [ 'key' => 'field_ab_sp2_title',          'label' => 'Story Point 2 Title',       'name' => 'about_sp2_title',           'type' => 'text',     'default_value' => 'Relationships over transactions' ],
        [ 'key' => 'field_ab_sp2_body',           'label' => 'Story Point 2 Body',        'name' => 'about_sp2_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'We want to know your pet over time, remember your concerns, and be a steady part of your animal\'s life.' ],
        [ 'key' => 'field_ab_sp3_title',          'label' => 'Story Point 3 Title',       'name' => 'about_sp3_title',           'type' => 'text',     'default_value' => 'Wholesome, neighborhood care' ],
        [ 'key' => 'field_ab_sp3_body',           'label' => 'Story Point 3 Body',        'name' => 'about_sp3_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'Our goal is simple: treat people with warmth, treat pets with gentleness, and care for both like they matter here, because they do.' ],
        [ 'key' => 'field_ab_sp4_title',          'label' => 'Story Point 4 Title',       'name' => 'about_sp4_title',           'type' => 'text',     'default_value' => 'Clear support for pet owners' ],
        [ 'key' => 'field_ab_sp4_body',           'label' => 'Story Point 4 Body',        'name' => 'about_sp4_body',            'type' => 'textarea', 'rows' => 2, 'default_value' => 'We want families to leave visits with practical next steps, understandable recommendations, and confidence in how to care well at home.' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_offer',
    'title'           => 'About – What We Offer (Services Cards)',
    'menu_order'      => 40,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        [ 'key' => 'field_ab_off_eyebrow',  'label' => 'Section Eyebrow',    'name' => 'about_offer_eyebrow',  'type' => 'text',     'default_value' => 'What We Offer' ],
        [ 'key' => 'field_ab_off_heading',  'label' => 'Section Heading',    'name' => 'about_offer_heading',  'type' => 'text',     'default_value' => 'Full-service veterinary care with a more human feel.' ],
        [ 'key' => 'field_ab_off_body',     'label' => 'Section Body',       'name' => 'about_offer_body',     'type' => 'textarea', 'rows' => 3, 'default_value' => 'We welcome routine visits and more serious medical concerns, always with the goal of making care feel thorough, understandable, and supportive. Whether your pet needs preventive care, vaccinations, surgery, dental care, or help with a more complex issue, our team works to make the process clear and personal from the first conversation forward.' ],
        [ 'key' => 'field_ab_oc1_heading',  'label' => 'Card 1 Heading',     'name' => 'about_oc1_heading',    'type' => 'text',     'default_value' => 'Routine & Preventive Care' ],
        [ 'key' => 'field_ab_oc1_body',     'label' => 'Card 1 Body',        'name' => 'about_oc1_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Ongoing wellness care helps pets stay healthier over time and helps families feel more confident about what their pets need at each life stage.' ],
        [ 'key' => 'field_ab_oc1_list',     'label' => 'Card 1 List (one item per line)', 'name' => 'about_oc1_list', 'type' => 'textarea', 'rows' => 4, 'default_value' => "Wellness exams for dogs and cats\nVaccinations and parasite prevention\nNutrition support and problem prevention\nLong-term care planning as needs change" ],
        [ 'key' => 'field_ab_oc2_heading',  'label' => 'Card 2 Heading',     'name' => 'about_oc2_heading',    'type' => 'text',     'default_value' => 'Medical, Surgical & Dental Care' ],
        [ 'key' => 'field_ab_oc2_body',     'label' => 'Card 2 Body',        'name' => 'about_oc2_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'From more complex medical conditions to soft tissue surgery and oral health support, we provide comprehensive care under one roof.' ],
        [ 'key' => 'field_ab_oc2_list',     'label' => 'Card 2 List',        'name' => 'about_oc2_list',       'type' => 'textarea', 'rows' => 4, 'default_value' => "Soft tissue surgery\nOral health assessments and treatment\nSupport for serious medical conditions\nThoughtful treatment planning and follow-up" ],
        [ 'key' => 'field_ab_oc3_heading',  'label' => 'Card 3 Heading',     'name' => 'about_oc3_heading',    'type' => 'text',     'default_value' => 'Comfort, Behavior & Wellness' ],
        [ 'key' => 'field_ab_oc3_body',     'label' => 'Card 3 Body',        'name' => 'about_oc3_body',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We care about emotional wellbeing too. Mental wellness, lower-stress handling, and a calmer visit experience matter just as much as the treatment plan.' ],
        [ 'key' => 'field_ab_oc3_list',     'label' => 'Card 3 List',        'name' => 'about_oc3_list',       'type' => 'textarea', 'rows' => 4, 'default_value' => "Fear Free Certified approach\nComfort-focused handling and communication\nSupportive care for pets and their people\nA gentler visit for nervous or sensitive pets" ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_hours_faq',
    'title'           => 'About – Hours, FAQ & CTA',
    'menu_order'      => 50,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        // Hours
        [ 'key' => 'field_ab_hrs_eyebrow',    'label' => 'Hours Eyebrow',               'name' => 'about_hours_eyebrow',     'type' => 'text',     'default_value' => 'Hours' ],
        [ 'key' => 'field_ab_hrs_heading',    'label' => 'Hours Heading',               'name' => 'about_hours_heading',     'type' => 'text',     'default_value' => 'Office hours for both locations.' ],
        [ 'key' => 'field_ab_hrs_body',       'label' => 'Hours Body',                  'name' => 'about_hours_body',        'type' => 'textarea', 'rows' => 2, 'default_value' => 'We are proud to serve families in both Independence and Fort Thomas, with hours designed to support everyday care and ongoing relationships.' ],
        [ 'key' => 'field_ab_ind_mon_fri',    'label' => 'Independence Mon–Fri Hours',  'name' => 'about_ind_hours_mon_fri', 'type' => 'text',     'default_value' => '8:00 am–6:00 pm' ],
        [ 'key' => 'field_ab_ind_sat',        'label' => 'Independence Saturday Hours', 'name' => 'about_ind_hours_sat',     'type' => 'text',     'default_value' => 'Closed' ],
        [ 'key' => 'field_ab_ind_sun',        'label' => 'Independence Sunday Hours',   'name' => 'about_ind_hours_sun',     'type' => 'text',     'default_value' => 'Closed' ],
        [ 'key' => 'field_ab_ft_mon_fri',     'label' => 'Fort Thomas Mon–Fri Hours',   'name' => 'about_ft_hours_mon_fri',  'type' => 'text',     'default_value' => '8:00 am–6:00 pm' ],
        [ 'key' => 'field_ab_ft_sat',         'label' => 'Fort Thomas Saturday Hours',  'name' => 'about_ft_hours_sat',      'type' => 'text',     'default_value' => 'Rotating schedule, please call' ],
        [ 'key' => 'field_ab_ft_sun',         'label' => 'Fort Thomas Sunday Hours',    'name' => 'about_ft_hours_sun',      'type' => 'text',     'default_value' => 'Closed' ],
        // FAQ
        [ 'key' => 'field_ab_faq_eyebrow',    'label' => 'FAQ Eyebrow',                 'name' => 'about_faq_eyebrow',       'type' => 'text',     'default_value' => 'Frequently Asked Questions' ],
        [ 'key' => 'field_ab_faq_heading',    'label' => 'FAQ Heading',                 'name' => 'about_faq_heading',       'type' => 'text',     'default_value' => 'Helpful answers for families looking for a veterinarian in Fort Thomas or Independence.' ],
        [ 'key' => 'field_ab_faq_body',       'label' => 'FAQ Body',                    'name' => 'about_faq_body',          'type' => 'textarea', 'rows' => 2, 'default_value' => 'These are some of the questions pet owners often have when getting to know our practice and deciding whether Veterinary Medical Center is the right fit for their family.' ],
        [ 'key' => 'field_ab_faq1_q',         'label' => 'FAQ 1 Question',              'name' => 'about_faq1_question',     'type' => 'text',     'default_value' => 'Is Veterinary Medical Center independently owned?' ],
        [ 'key' => 'field_ab_faq1_a',         'label' => 'FAQ 1 Answer',                'name' => 'about_faq1_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Yes. Veterinary Medical Center is independently owned and led by Dr. Kristi Baker. That independence helps us keep our care personal, community-rooted, and focused on long-term relationships.' ],
        [ 'key' => 'field_ab_faq2_q',         'label' => 'FAQ 2 Question',              'name' => 'about_faq2_question',     'type' => 'text',     'default_value' => 'Are you a vet in Fort Thomas, KY?' ],
        [ 'key' => 'field_ab_faq2_a',         'label' => 'FAQ 2 Answer',                'name' => 'about_faq2_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Yes. Our Fort Thomas veterinary office is located at 2000 Memorial Parkway and serves dogs and cats from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby river city communities.' ],
        [ 'key' => 'field_ab_faq3_q',         'label' => 'FAQ 3 Question',              'name' => 'about_faq3_question',     'type' => 'text',     'default_value' => 'Are you a vet in Independence, KY?' ],
        [ 'key' => 'field_ab_faq3_a',         'label' => 'FAQ 3 Answer',                'name' => 'about_faq3_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Yes. Our Independence veterinary office is located at 4147 Madison Pike and serves pets from Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and surrounding Northern Kentucky neighborhoods.' ],
        [ 'key' => 'field_ab_faq4_q',         'label' => 'FAQ 4 Question',              'name' => 'about_faq4_question',     'type' => 'text',     'default_value' => 'What veterinary services do you offer?' ],
        [ 'key' => 'field_ab_faq4_a',         'label' => 'FAQ 4 Answer',                'name' => 'about_faq4_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We provide wellness exams, preventive medicine, vaccinations, dental care, soft tissue surgery, medical treatment, nutrition guidance, behavior support, and comfort-focused care for dogs and cats.' ],
        [ 'key' => 'field_ab_faq5_q',         'label' => 'FAQ 5 Question',              'name' => 'about_faq5_question',     'type' => 'text',     'default_value' => 'Do you accept new veterinary patients?' ],
        [ 'key' => 'field_ab_faq5_a',         'label' => 'FAQ 5 Answer',                'name' => 'about_faq5_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'Yes. New patients are welcome at both Veterinary Medical Center locations. Families can request an appointment online or call Fort Thomas or Independence directly for help choosing the best location and visit type.' ],
        [ 'key' => 'field_ab_faq6_q',         'label' => 'FAQ 6 Question',              'name' => 'about_faq6_question',     'type' => 'text',     'default_value' => 'What makes your approach different?' ],
        [ 'key' => 'field_ab_faq6_a',         'label' => 'FAQ 6 Answer',                'name' => 'about_faq6_answer',       'type' => 'textarea', 'rows' => 2, 'default_value' => 'We combine full-service veterinary medicine with clear communication, practical guidance, Fear Free handling, and a pace of care that feels less rushed and more supportive for pets and their people.' ],
        // CTA
        [ 'key' => 'field_ab_cta_eyebrow',    'label' => 'CTA Eyebrow',                 'name' => 'about_cta_eyebrow',       'type' => 'text',     'default_value' => 'Ready to Visit?' ],
        [ 'key' => 'field_ab_cta_heading',    'label' => 'CTA Heading',                 'name' => 'about_cta_heading',       'type' => 'text',     'default_value' => "We'd be honored to care for your pet." ],
        [ 'key' => 'field_ab_cta_body',       'label' => 'CTA Body',                    'name' => 'about_cta_body',          'type' => 'textarea', 'rows' => 3, 'default_value' => 'Whether you are new to the area, looking for a more personal veterinary experience, or simply want a team that feels rooted in the same community you are, we would love to welcome you to Veterinary Medical Center.' ],
        [ 'key' => 'field_ab_cta_btn1_label', 'label' => 'CTA Btn 1 Label',             'name' => 'about_cta_btn1_label',    'type' => 'text',     'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_ab_cta_btn2_label', 'label' => 'CTA Btn 2 Label',             'name' => 'about_cta_btn2_label',    'type' => 'text',     'default_value' => 'Contact Us' ],
        [ 'key' => 'field_ab_cta_btn2_url',   'label' => 'CTA Btn 2 URL',               'name' => 'about_cta_btn2_url',      'type' => 'url',      'default_value' => '/contact-us' ],
        [ 'key' => 'field_ab_cta_btn3_label', 'label' => 'CTA Btn 3 Label',             'name' => 'about_cta_btn3_label',    'type' => 'text',     'default_value' => 'View Services' ],
        [ 'key' => 'field_ab_cta_btn3_url',   'label' => 'CTA Btn 3 URL',               'name' => 'about_cta_btn3_url',      'type' => 'url',      'default_value' => '/services' ],
        // SEO
        [ 'key' => 'field_ab_seo_body',       'label' => 'SEO Body (WYSIWYG, visible on page)',  'name' => 'about_seo_body', 'type' => 'wysiwyg', 'toolbar' => 'full', 'media_upload' => 0, 'default_value' => '' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_about_links',
    'title'           => 'About – Local Trust Links',
    'menu_order'      => 55,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $about_template ],
    'fields'          => [
        [ 'key' => 'field_ab_links_eyebrow', 'label' => 'Links Eyebrow', 'name' => 'about_links_eyebrow', 'type' => 'text', 'default_value' => 'Local Trust' ],
        [ 'key' => 'field_ab_links_heading', 'label' => 'Links Heading', 'name' => 'about_links_heading', 'type' => 'text', 'default_value' => 'Why an independently owned veterinary hospital matters.' ],
        [ 'key' => 'field_ab_links_body', 'label' => 'Links Body', 'name' => 'about_links_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'For many families, choosing an independently owned veterinary hospital in Northern Kentucky means choosing continuity, local accountability, and a team that can shape care around real pets instead of a distant corporate playbook.' ],
        [ 'key' => 'field_ab_internal_heading', 'label' => 'Internal Links Heading', 'name' => 'about_internal_heading', 'type' => 'text', 'default_value' => 'Helpful VMC pages' ],
        [ 'key' => 'field_ab_internal_body', 'label' => 'Internal Links Body', 'name' => 'about_internal_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'These pages help families learn more about our local veterinary team and choose the next step.' ],
        [ 'key' => 'field_ab_external_heading', 'label' => 'External Links Heading', 'name' => 'about_external_heading', 'type' => 'text', 'default_value' => 'Trusted veterinary resources' ],
        [ 'key' => 'field_ab_external_body', 'label' => 'External Links Body', 'name' => 'about_external_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'These dofollow outside resources support the comfort-focused and cat-friendly care topics families often ask about.' ],
        [ 'key' => 'field_ab_compare_heading', 'label' => 'Comparison Heading', 'name' => 'about_compare_heading', 'type' => 'text', 'default_value' => 'What local ownership changes' ],
        [ 'key' => 'field_ab_compare_body', 'label' => 'Comparison Body', 'name' => 'about_compare_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Local ownership gives VMC room to emphasize relationship-based medicine, practical communication, community trust, and comfort-focused visits for dogs, cats, and the people who love them.' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// VET NEAR ME SEO PAGE
// ══════════════════════════════════════════════════════════
$vet_near_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'template-vet-near-me.php',
]];

acf_add_local_field_group([
    'key'             => 'group_vet_near_me',
    'title'           => 'Vet Near Me SEO Page',
    'menu_order'      => 15,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $vet_near_template ],
    'fields'          => [
        [
            'key'     => 'field_near_rank_math_note',
            'label'   => 'Rank Math Setup Notes',
            'name'    => 'near_rank_math_note',
            'type'    => 'message',
            'message' => '<strong>Recommended Rank Math setup:</strong><br>Focus keyword: <code>vet near me</code><br>SEO title: <code>Vet Near Me in Northern Kentucky | VMC</code><br>Meta description: <code>Searching for a vet near me in Northern Kentucky? Visit locally owned Veterinary Medical Center in Fort Thomas or Independence for compassionate dog and cat care.</code><br><br>Add 1-3 paragraphs in the normal WordPress block editor too. Include the phrase <code>vet near me</code> once in that editor content. This template displays that content near the bottom so Rank Math can analyze native page content while the page remains ACF-driven. Use exact-match alt text on at least one image, such as <code>vet near me at Veterinary Medical Center in Northern Kentucky</code>.',
        ],
        [ 'key' => 'field_near_hero_eyebrow', 'label' => 'Hero Eyebrow', 'name' => 'near_hero_eyebrow', 'type' => 'text', 'default_value' => 'Vet Near Me in Northern Kentucky' ],
        [ 'key' => 'field_near_hero_heading', 'label' => 'Hero H1', 'name' => 'near_hero_heading', 'type' => 'text', 'default_value' => 'Looking for a vet near you in Northern Kentucky?' ],
        [ 'key' => 'field_near_hero_body', 'label' => 'Hero Body', 'name' => 'near_hero_body', 'type' => 'textarea', 'rows' => 4, 'default_value' => 'Veterinary Medical Center is a locally owned veterinary practice with convenient offices in Fort Thomas and Independence, KY. We care for dogs and cats from Northern Kentucky, nearby Greater Cincinnati, and families just across the river from downtown Cincinnati who want personal, compassionate veterinary care close to home.' ],
        [ 'key' => 'field_near_hero_btn1', 'label' => 'Hero Button 1', 'name' => 'near_hero_btn1', 'type' => 'text', 'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_near_hero_btn2', 'label' => 'Hero Button 2', 'name' => 'near_hero_btn2', 'type' => 'text', 'default_value' => 'Choose a Location' ],
        [ 'key' => 'field_near_hero_btn3', 'label' => 'Hero Button 3', 'name' => 'near_hero_btn3', 'type' => 'text', 'default_value' => 'New Patient Guide' ],
        [ 'key' => 'field_near_hero_image', 'label' => 'Hero Image URL', 'name' => 'near_hero_image', 'type' => 'url', 'default_value' => '' ],
        [ 'key' => 'field_near_hero_image_alt', 'label' => 'Hero Image Alt Text', 'name' => 'near_hero_image_alt', 'type' => 'text', 'default_value' => 'vet near me at Veterinary Medical Center in Northern Kentucky' ],
        [ 'key' => 'field_near_hero_image_caption', 'label' => 'Hero Image Caption', 'name' => 'near_hero_image_caption', 'type' => 'text', 'default_value' => 'A local veterinary team for families searching for a vet near me in Northern Kentucky.' ],

        [ 'key' => 'field_near_panel_heading', 'label' => 'Panel Heading', 'name' => 'near_panel_heading', 'type' => 'text', 'default_value' => 'Why choose VMC when you search "vet near me"?' ],
        [ 'key' => 'field_near_panel_body', 'label' => 'Panel Body', 'name' => 'near_panel_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'A nearby vet should be easy to reach, but location is only the beginning. Families choose VMC because our care is personal, local, consistent, and rooted in relationships.' ],
        [ 'key' => 'field_near_panel_1_title', 'label' => 'Panel 1 Title', 'name' => 'near_panel_1_title', 'type' => 'text', 'default_value' => 'Locally and independently owned' ],
        [ 'key' => 'field_near_panel_1_body', 'label' => 'Panel 1 Body', 'name' => 'near_panel_1_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Led by Dr. Kristi Baker, VMC is shaped by this community instead of a remote corporate model.' ],
        [ 'key' => 'field_near_panel_2_title', 'label' => 'Panel 2 Title', 'name' => 'near_panel_2_title', 'type' => 'text', 'default_value' => 'Minutes from Cincinnati and NKY neighborhoods' ],
        [ 'key' => 'field_near_panel_2_body', 'label' => 'Panel 2 Body', 'name' => 'near_panel_2_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Our Fort Thomas office is just across the river from downtown Cincinnati, and our Independence office serves central Northern Kentucky.' ],
        [ 'key' => 'field_near_panel_3_title', 'label' => 'Panel 3 Title', 'name' => 'near_panel_3_title', 'type' => 'text', 'default_value' => 'Fear Free and cat-friendly care' ],
        [ 'key' => 'field_near_panel_3_body', 'label' => 'Panel 3 Body', 'name' => 'near_panel_3_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'We work to make visits calmer for dogs, cats, nervous pets, and the people who love them.' ],
        [ 'key' => 'field_near_panel_4_title', 'label' => 'Panel 4 Title', 'name' => 'near_panel_4_title', 'type' => 'text', 'default_value' => 'Full-service veterinary medicine' ],
        [ 'key' => 'field_near_panel_4_body', 'label' => 'Panel 4 Body', 'name' => 'near_panel_4_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Wellness, dentistry, surgery, medical care, behavior support, and end-of-life guidance are available through one trusted team.' ],

        [ 'key' => 'field_near_choice_eyebrow', 'label' => 'Choice Eyebrow', 'name' => 'near_choice_eyebrow', 'type' => 'text', 'default_value' => 'Local Veterinary Care' ],
        [ 'key' => 'field_near_choice_heading', 'label' => 'Choice Heading', 'name' => 'near_choice_heading', 'type' => 'text', 'default_value' => 'Vet near me for Cincinnati, Fort Thomas, and Independence families.' ],
        [ 'key' => 'field_near_choice_body', 'label' => 'Choice Body', 'name' => 'near_choice_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'If you found this page by searching for a vet near me, you are probably trying to decide who can care for your pet well, communicate clearly, and be close enough for routine visits, follow-ups, and real-life schedules. Veterinary Medical Center was built for families who want that local connection.' ],
        [ 'key' => 'field_near_choice_image', 'label' => 'Secondary Image URL', 'name' => 'near_choice_image', 'type' => 'url', 'default_value' => '' ],
        [ 'key' => 'field_near_choice_image_alt', 'label' => 'Secondary Image Alt Text', 'name' => 'near_choice_image_alt', 'type' => 'text', 'default_value' => 'vet near me for dogs and cats near Fort Thomas Kentucky' ],
        [ 'key' => 'field_near_fast_links_heading', 'label' => 'Fast Links Heading', 'name' => 'near_fast_links_heading', 'type' => 'text', 'default_value' => 'Fast links for pet owners comparing a vet near me' ],
        [ 'key' => 'field_near_fast_links_body', 'label' => 'Fast Links Body', 'name' => 'near_fast_links_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'If you are ready to take the next step, these pages help you move from research to care without digging through the site.' ],
        [ 'key' => 'field_near_choice_1_title', 'label' => 'Choice Card 1 Title', 'name' => 'near_choice_1_title', 'type' => 'text', 'default_value' => 'Women-led and locally owned' ],
        [ 'key' => 'field_near_choice_1_body', 'label' => 'Choice Card 1 Body', 'name' => 'near_choice_1_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'VMC is led by Dr. Kristi Baker and grounded in the Northern Kentucky community. Decisions are made by people who know this area, not by a distant corporate office.' ],
        [ 'key' => 'field_near_choice_1_list', 'label' => 'Choice Card 1 List', 'name' => 'near_choice_1_list', 'type' => 'textarea', 'rows' => 3, 'default_value' => "Independent ownership\nCommunity-rooted decision making\nCare built around long-term relationships" ],
        [ 'key' => 'field_near_choice_2_title', 'label' => 'Choice Card 2 Title', 'name' => 'near_choice_2_title', 'type' => 'text', 'default_value' => 'Compassionate, Fear Free care' ],
        [ 'key' => 'field_near_choice_2_body', 'label' => 'Choice Card 2 Body', 'name' => 'near_choice_2_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'We care about how veterinary medicine feels. Lower-stress handling, clear communication, and gentler visits are especially important for anxious pets and cats.' ],
        [ 'key' => 'field_near_choice_2_list', 'label' => 'Choice Card 2 List', 'name' => 'near_choice_2_list', 'type' => 'textarea', 'rows' => 3, 'default_value' => "Fear Free handling principles\nCat-friendly visit awareness\nSupport for nervous or sensitive pets" ],
        [ 'key' => 'field_near_choice_3_title', 'label' => 'Choice Card 3 Title', 'name' => 'near_choice_3_title', 'type' => 'text', 'default_value' => 'Two convenient Northern Kentucky offices' ],
        [ 'key' => 'field_near_choice_3_body', 'label' => 'Choice Card 3 Body', 'name' => 'near_choice_3_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'With locations in Fort Thomas and Independence, families can choose the office that fits their commute, neighborhood, and pet care needs.' ],
        [ 'key' => 'field_near_choice_3_list', 'label' => 'Choice Card 3 List', 'name' => 'near_choice_3_list', 'type' => 'textarea', 'rows' => 3, 'default_value' => "Fort Thomas near downtown Cincinnati\nIndependence for central NKY\nEasy access from nearby communities" ],

        [ 'key' => 'field_near_services_eyebrow', 'label' => 'Services Eyebrow', 'name' => 'near_services_eyebrow', 'type' => 'text', 'default_value' => 'What We Help With' ],
        [ 'key' => 'field_near_services_heading', 'label' => 'Services Heading', 'name' => 'near_services_heading', 'type' => 'text', 'default_value' => 'Vet near me for full-service dog and cat care.' ],
        [ 'key' => 'field_near_services_body', 'label' => 'Services Body', 'name' => 'near_services_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'A strong local veterinary relationship should support your pet through everyday wellness and more complicated seasons of life. Our team helps with preventive care, sick visits, oral health, surgery, behavior conversations, and compassionate guidance when needs change.' ],
        [ 'key' => 'field_near_care_path_heading', 'label' => 'Care Path Heading', 'name' => 'near_care_path_heading', 'type' => 'text', 'default_value' => 'What a vet near me should make easier' ],
        [ 'key' => 'field_near_care_path_body', 'label' => 'Care Path Body', 'name' => 'near_care_path_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Local veterinary care should reduce friction. That means a practical location, clear next steps, helpful records transfer, transparent conversations, and a team that helps you understand what your pet needs now and what can wait.' ],
        [ 'key' => 'field_near_choice_image_caption', 'label' => 'Secondary Image Caption', 'name' => 'near_choice_image_caption', 'type' => 'text', 'default_value' => 'A visible image with vet near me alt text for local search relevance.' ],
        [ 'key' => 'field_near_service_1_title', 'label' => 'Service 1 Title', 'name' => 'near_service_1_title', 'type' => 'text', 'default_value' => 'Wellness and preventive care' ],
        [ 'key' => 'field_near_service_1_body', 'label' => 'Service 1 Body', 'name' => 'near_service_1_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Routine exams, vaccines, parasite prevention, nutrition conversations, and life-stage planning for dogs and cats.' ],
        [ 'key' => 'field_near_service_2_title', 'label' => 'Service 2 Title', 'name' => 'near_service_2_title', 'type' => 'text', 'default_value' => 'Dental care and surgery' ],
        [ 'key' => 'field_near_service_2_body', 'label' => 'Service 2 Body', 'name' => 'near_service_2_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Oral health assessments, dental treatment planning, soft tissue surgery, anesthesia monitoring, and recovery support.' ],
        [ 'key' => 'field_near_service_3_title', 'label' => 'Service 3 Title', 'name' => 'near_service_3_title', 'type' => 'text', 'default_value' => 'Medical visits and second opinions' ],
        [ 'key' => 'field_near_service_3_body', 'label' => 'Service 3 Body', 'name' => 'near_service_3_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Thoughtful support for sick visits, chronic conditions, new symptoms, records review, and treatment planning.' ],
        [ 'key' => 'field_near_service_4_title', 'label' => 'Service 4 Title', 'name' => 'near_service_4_title', 'type' => 'text', 'default_value' => 'Behavior, comfort, and end-of-life care' ],
        [ 'key' => 'field_near_service_4_body', 'label' => 'Service 4 Body', 'name' => 'near_service_4_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Support for anxiety, quality-of-life conversations, comfort-focused care, and compassionate end-of-life decisions.' ],

        [ 'key' => 'field_near_reviews_eyebrow', 'label' => 'Reviews Eyebrow', 'name' => 'near_reviews_eyebrow', 'type' => 'text', 'default_value' => 'Local Reviews' ],
        [ 'key' => 'field_near_reviews_heading', 'label' => 'Reviews Heading', 'name' => 'near_reviews_heading', 'type' => 'text', 'default_value' => 'Pet owners searching for a vet near me choose VMC for comfort, clarity, and follow-through.' ],
        [ 'key' => 'field_near_reviews_body', 'label' => 'Reviews Body', 'name' => 'near_reviews_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Real local families often mention the same things: thorough exams, gentle cat visits, clear estimates, follow-up calls, and a team that treats pets like family.' ],
        [ 'key' => 'field_near_reviews_image', 'label' => 'Reviews Image URL', 'name' => 'near_reviews_image', 'type' => 'url', 'default_value' => '' ],
        [ 'key' => 'field_near_reviews_image_alt', 'label' => 'Reviews Image Alt Text', 'name' => 'near_reviews_image_alt', 'type' => 'text', 'default_value' => 'vet near me reviews for Veterinary Medical Center Independence Kentucky' ],
        [ 'key' => 'field_near_reviews_image_caption', 'label' => 'Reviews Image Caption', 'name' => 'near_reviews_image_caption', 'type' => 'text', 'default_value' => 'Review themes from families who found their local vet near Fort Thomas and Independence.' ],
        [ 'key' => 'field_near_review_1_quote', 'label' => 'Review 1 Short Quote', 'name' => 'near_review_1_quote', 'type' => 'text', 'default_value' => 'They treat your furbabies like family.' ],
        [ 'key' => 'field_near_review_1_author', 'label' => 'Review 1 Attribution', 'name' => 'near_review_1_author', 'type' => 'text', 'default_value' => 'Local pet owner' ],
        [ 'key' => 'field_near_review_2_quote', 'label' => 'Review 2 Short Quote', 'name' => 'near_review_2_quote', 'type' => 'text', 'default_value' => 'The vet tech actually sat on the floor with my kitty.' ],
        [ 'key' => 'field_near_review_2_author', 'label' => 'Review 2 Attribution', 'name' => 'near_review_2_author', 'type' => 'text', 'default_value' => 'Cat owner near Northern Kentucky' ],
        [ 'key' => 'field_near_review_3_quote', 'label' => 'Review 3 Short Quote', 'name' => 'near_review_3_quote', 'type' => 'text', 'default_value' => 'Went over prices before the treatment.' ],
        [ 'key' => 'field_near_review_3_author', 'label' => 'Review 3 Attribution', 'name' => 'near_review_3_author', 'type' => 'text', 'default_value' => 'VMC client' ],
        [ 'key' => 'field_near_review_4_quote', 'label' => 'Review 4 Short Quote', 'name' => 'near_review_4_quote', 'type' => 'text', 'default_value' => 'They even called to check on him.' ],
        [ 'key' => 'field_near_review_4_author', 'label' => 'Review 4 Attribution', 'name' => 'near_review_4_author', 'type' => 'text', 'default_value' => 'Local reviewer' ],

        [ 'key' => 'field_near_locations_eyebrow', 'label' => 'Locations Eyebrow', 'name' => 'near_locations_eyebrow', 'type' => 'text', 'default_value' => 'Choose Your Location' ],
        [ 'key' => 'field_near_locations_heading', 'label' => 'Locations Heading', 'name' => 'near_locations_heading', 'type' => 'text', 'default_value' => 'Vet near me with two local Northern Kentucky offices.' ],
        [ 'key' => 'field_near_locations_body', 'label' => 'Locations Body', 'name' => 'near_locations_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Whether you live close to downtown Cincinnati, along the river cities, or farther south in Kenton County, VMC gives you a local veterinary team with two practical options for care.' ],
        [ 'key' => 'field_near_ft_heading', 'label' => 'Fort Thomas Heading', 'name' => 'near_ft_heading', 'type' => 'text', 'default_value' => 'Vet near Fort Thomas and downtown Cincinnati' ],
        [ 'key' => 'field_near_ft_body', 'label' => 'Fort Thomas Body', 'name' => 'near_ft_body', 'type' => 'textarea', 'rows' => 4, 'default_value' => 'Our Fort Thomas office is convenient for families in Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby Greater Cincinnati. It is a practical choice for pet owners who want a veterinarian near downtown Cincinnati without losing the personal feel of a local Northern Kentucky practice.' ],
        [ 'key' => 'field_near_ind_heading', 'label' => 'Independence Heading', 'name' => 'near_ind_heading', 'type' => 'text', 'default_value' => 'Vet near Independence and central Northern Kentucky' ],
        [ 'key' => 'field_near_ind_body', 'label' => 'Independence Body', 'name' => 'near_ind_body', 'type' => 'textarea', 'rows' => 4, 'default_value' => 'Our Independence office is convenient for families in Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and surrounding central Northern Kentucky communities. It gives local pet owners access to full-service care with an independently owned, relationship-based team.' ],

        [ 'key' => 'field_near_links_eyebrow', 'label' => 'Links Eyebrow', 'name' => 'near_links_eyebrow', 'type' => 'text', 'default_value' => 'Helpful Resources' ],
        [ 'key' => 'field_near_links_heading', 'label' => 'Links Heading', 'name' => 'near_links_heading', 'type' => 'text', 'default_value' => 'Resources for choosing a vet near me with confidence.' ],
        [ 'key' => 'field_near_links_body', 'label' => 'Links Body', 'name' => 'near_links_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'A strong SEO page should still be useful. These internal and external resources help families make a better decision about veterinary care, cat-friendly visits, and Fear Free handling.' ],
        [ 'key' => 'field_near_internal_heading', 'label' => 'Internal Links Heading', 'name' => 'near_internal_heading', 'type' => 'text', 'default_value' => 'Explore VMC next' ],
        [ 'key' => 'field_near_internal_body', 'label' => 'Internal Links Body', 'name' => 'near_internal_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Move from research to action with the pages most pet owners need after choosing a local veterinarian.' ],
        [ 'key' => 'field_near_external_heading', 'label' => 'External Links Heading', 'name' => 'near_external_heading', 'type' => 'text', 'default_value' => 'Trusted outside resources' ],
        [ 'key' => 'field_near_external_body', 'label' => 'External Links Body', 'name' => 'near_external_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'These dofollow external resources support the care topics families often ask about before booking a local vet visit.' ],

        [ 'key' => 'field_near_faq_eyebrow', 'label' => 'FAQ Eyebrow', 'name' => 'near_faq_eyebrow', 'type' => 'text', 'default_value' => 'Vet Near Me FAQ' ],
        [ 'key' => 'field_near_faq_heading', 'label' => 'FAQ Heading', 'name' => 'near_faq_heading', 'type' => 'text', 'default_value' => 'Vet near me questions families ask before booking.' ],
        [ 'key' => 'field_near_faq_body', 'label' => 'FAQ Body', 'name' => 'near_faq_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'Choosing a veterinarian is personal. These answers are written for families comparing local vets near Fort Thomas, Independence, downtown Cincinnati, and the Northern Kentucky communities around us.' ],
        [ 'key' => 'field_near_faq1_question', 'label' => 'FAQ 1 Question', 'name' => 'near_faq1_question', 'type' => 'text', 'default_value' => 'What is the best vet near me in Northern Kentucky?' ],
        [ 'key' => 'field_near_faq1_answer', 'label' => 'FAQ 1 Answer', 'name' => 'near_faq1_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'The best local veterinarian is the one your family can reach easily, trust over time, and return to for consistent care. Veterinary Medical Center serves Fort Thomas, Independence, and nearby Northern Kentucky communities with independently owned, relationship-focused veterinary care for dogs and cats.' ],
        [ 'key' => 'field_near_faq2_question', 'label' => 'FAQ 2 Question', 'name' => 'near_faq2_question', 'type' => 'text', 'default_value' => 'Are you close to downtown Cincinnati?' ],
        [ 'key' => 'field_near_faq2_answer', 'label' => 'FAQ 2 Answer', 'name' => 'near_faq2_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Yes. Our Fort Thomas office is just across the river from downtown Cincinnati, and both VMC locations are convenient for Northern Kentucky families who want local veterinary care without crossing deeper into the city for routine visits.' ],
        [ 'key' => 'field_near_faq3_question', 'label' => 'FAQ 3 Question', 'name' => 'near_faq3_question', 'type' => 'text', 'default_value' => 'Do you have a vet near Fort Thomas, KY?' ],
        [ 'key' => 'field_near_faq3_answer', 'label' => 'FAQ 3 Answer', 'name' => 'near_faq3_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Yes. Veterinary Medical Center Fort Thomas is located at 2000 Memorial Parkway and serves pets from Fort Thomas, Highland Heights, Bellevue, Newport, Dayton, Cold Spring, and nearby neighborhoods.' ],
        [ 'key' => 'field_near_faq4_question', 'label' => 'FAQ 4 Question', 'name' => 'near_faq4_question', 'type' => 'text', 'default_value' => 'Do you have a vet near Independence, KY?' ],
        [ 'key' => 'field_near_faq4_answer', 'label' => 'FAQ 4 Answer', 'name' => 'near_faq4_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Yes. Veterinary Medical Center Independence is located at 4147 Madison Pike and serves pets from Independence, Covington, Taylor Mill, Latonia, Erlanger, Florence, and central Northern Kentucky.' ],
        [ 'key' => 'field_near_faq5_question', 'label' => 'FAQ 5 Question', 'name' => 'near_faq5_question', 'type' => 'text', 'default_value' => 'Are you locally owned or corporate?' ],
        [ 'key' => 'field_near_faq5_answer', 'label' => 'FAQ 5 Answer', 'name' => 'near_faq5_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Veterinary Medical Center is independently owned and led by Dr. Kristi Baker. Local ownership helps us stay focused on continuity, community relationships, practical communication, and care decisions made close to home.' ],
        [ 'key' => 'field_near_faq6_question', 'label' => 'FAQ 6 Question', 'name' => 'near_faq6_question', 'type' => 'text', 'default_value' => 'Do you provide Fear Free or cat-friendly veterinary care?' ],
        [ 'key' => 'field_near_faq6_answer', 'label' => 'FAQ 6 Answer', 'name' => 'near_faq6_answer', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Yes. Our team uses a comfort-focused, Fear Free approach, and we care deeply about making visits gentler for cats, nervous pets, and families who want a calmer veterinary experience.' ],

        [ 'key' => 'field_near_seo_eyebrow', 'label' => 'SEO Body Eyebrow', 'name' => 'near_seo_eyebrow', 'type' => 'text', 'default_value' => 'Local Veterinary Search Guide' ],
        [ 'key' => 'field_near_seo_heading', 'label' => 'SEO Body Heading', 'name' => 'near_seo_heading', 'type' => 'text', 'default_value' => 'When "vet near me" should mean local, personal, and close by.' ],
        [ 'key' => 'field_near_seo_body', 'label' => 'SEO Body', 'name' => 'near_seo_body', 'type' => 'wysiwyg', 'toolbar' => 'full', 'media_upload' => 0, 'default_value' => '' ],
        [ 'key' => 'field_near_final_btn1', 'label' => 'Final Button 1', 'name' => 'near_final_btn1', 'type' => 'text', 'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_near_final_btn2', 'label' => 'Final Button 2', 'name' => 'near_final_btn2', 'type' => 'text', 'default_value' => 'Contact Us' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// LOCATION SEO PAGES
// ══════════════════════════════════════════════════════════
$location_seo_templates = [
    [[
        'param'    => 'page_template',
        'operator' => '==',
        'value'    => 'template-vet-fort-thomas-ky.php',
    ]],
    [[
        'param'    => 'page_template',
        'operator' => '==',
        'value'    => 'template-vet-independence-ky.php',
    ]],
    [[
        'param'    => 'page_template',
        'operator' => '==',
        'value'    => 'template-vet-cincinnati.php',
    ]],
];

acf_add_local_field_group([
    'key'             => 'group_location_seo_pages',
    'title'           => 'Location SEO Page',
    'menu_order'      => 16,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => $location_seo_templates,
    'fields'          => [
        [
            'key'     => 'field_loc_rank_math_note',
            'label'   => 'Rank Math Setup Notes',
            'name'    => 'loc_rank_math_note',
            'type'    => 'message',
            'message' => '<strong>Recommended setup:</strong><br>Fort Thomas focus keyword: <code>vet in Fort Thomas KY</code><br>Independence focus keyword: <code>vet in Independence KY</code><br>Cincinnati focus keyword: <code>vet near Cincinnati</code><br><br>Each template includes long visible fallback copy, keyword-rich headings, local schema, FAQ schema, internal links, image alt text, and a visible block-editor content area near the bottom. Add 1-3 short paragraphs in the normal editor using the target keyword once so Rank Math can analyze native post content too.',
        ],
        [ 'key' => 'field_loc_hero_eyebrow', 'label' => 'Hero Eyebrow', 'name' => 'loc_hero_eyebrow', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_hero_heading', 'label' => 'Hero H1', 'name' => 'loc_hero_heading', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_hero_body', 'label' => 'Hero Body', 'name' => 'loc_hero_body', 'type' => 'textarea', 'rows' => 4, 'default_value' => '' ],
        [ 'key' => 'field_loc_primary_button', 'label' => 'Primary Button Label', 'name' => 'loc_primary_button', 'type' => 'text', 'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_loc_secondary_button', 'label' => 'Secondary Button Label', 'name' => 'loc_secondary_button', 'type' => 'text', 'default_value' => 'Get Directions' ],
        [ 'key' => 'field_loc_panel_heading', 'label' => 'Hero Panel Heading', 'name' => 'loc_panel_heading', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_panel_body', 'label' => 'Hero Panel Body', 'name' => 'loc_panel_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => '' ],
        [ 'key' => 'field_loc_intro_eyebrow', 'label' => 'Intro Eyebrow', 'name' => 'loc_intro_eyebrow', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_intro_heading', 'label' => 'Intro Heading', 'name' => 'loc_intro_heading', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_intro_body', 'label' => 'Intro Body', 'name' => 'loc_intro_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => '' ],
        [ 'key' => 'field_loc_image', 'label' => 'Location Image URL', 'name' => 'loc_image', 'type' => 'url', 'default_value' => '' ],
        [ 'key' => 'field_loc_image_alt', 'label' => 'Location Image Alt Text', 'name' => 'loc_image_alt', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_image_caption', 'label' => 'Location Image Caption', 'name' => 'loc_image_caption', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_quick_body', 'label' => 'Quick Facts Body', 'name' => 'loc_quick_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => '' ],
        [ 'key' => 'field_loc_resource_heading', 'label' => 'Resources Heading', 'name' => 'loc_resource_heading', 'type' => 'text', 'default_value' => '' ],
        [ 'key' => 'field_loc_resource_body', 'label' => 'Resources Body', 'name' => 'loc_resource_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => '' ],
        [ 'key' => 'field_loc_seo_body', 'label' => 'Editable SEO Body', 'name' => 'loc_seo_body', 'type' => 'wysiwyg', 'toolbar' => 'full', 'media_upload' => 0, 'default_value' => '' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// SERVICES PAGE – All Sections
// ══════════════════════════════════════════════════════════
$services_template = [[
    'param'    => 'page_template',
    'operator' => '==',
    'value'    => 'template-services.php',
]];

acf_add_local_field_group([
    'key'             => 'group_svc_hero',
    'title'           => 'Services – Hero',
    'menu_order'      => 10,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $services_template ],
    'fields'          => [
        [ 'key' => 'field_sv_hero_eyebrow',      'label' => 'Hero Eyebrow',             'name' => 'svc_hero_eyebrow',      'type' => 'text',     'default_value' => 'Veterinary Services' ],
        [ 'key' => 'field_sv_hero_title',        'label' => 'Hero H1 (first line)',     'name' => 'svc_hero_title',        'type' => 'text',     'default_value' => 'Veterinary services in Northern Kentucky,' ],
        [ 'key' => 'field_sv_hero_title_em',     'label' => 'Hero H1 (italic line)',    'name' => 'svc_hero_title_em',     'type' => 'text',     'default_value' => 'for every stage of your pet’s life.' ],
        [ 'key' => 'field_sv_hero_body',         'label' => 'Hero Body',                'name' => 'svc_hero_body',         'type' => 'textarea', 'rows' => 3, 'default_value' => "Veterinary Medical Center offers full-service veterinary services in Northern Kentucky for dogs, cats, and select small pets. From wellness exams and vaccines to dental care, surgery, urgent care, behavior support, and end-of-life guidance, our Fort Thomas and Independence teams make care clear, practical, and comfort-focused." ],
        [ 'key' => 'field_sv_hero_btn1_label',   'label' => 'Hero Btn 1 Label',         'name' => 'svc_hero_btn1_label',   'type' => 'text',     'default_value' => 'Request Appointment' ],
        [ 'key' => 'field_sv_hero_btn2_label',   'label' => 'Hero Btn 2 Label',         'name' => 'svc_hero_btn2_label',   'type' => 'text',     'default_value' => 'View Locations' ],
        [ 'key' => 'field_sv_stat1_value',       'label' => 'Stat 1 Value',             'name' => 'svc_stat1_value',       'type' => 'text',     'default_value' => 'Fear Free' ],
        [ 'key' => 'field_sv_stat1_label',       'label' => 'Stat 1 Label',             'name' => 'svc_stat1_label',       'type' => 'text',     'default_value' => 'Comfort-focused care' ],
        [ 'key' => 'field_sv_stat2_value',       'label' => 'Stat 2 Value',             'name' => 'svc_stat2_value',       'type' => 'text',     'default_value' => 'Urgent' ],
        [ 'key' => 'field_sv_stat2_label',       'label' => 'Stat 2 Label',             'name' => 'svc_stat2_label',       'type' => 'text',     'default_value' => 'Care available weekdays' ],
        [ 'key' => 'field_sv_stat3_value',       'label' => 'Stat 3 Value',             'name' => 'svc_stat3_value',       'type' => 'text',     'default_value' => 'Dogs to' ],
        [ 'key' => 'field_sv_stat3_label',       'label' => 'Stat 3 Label',             'name' => 'svc_stat3_label',       'type' => 'text',     'default_value' => 'Pocket pets & more' ],
        // Hero panel
        [ 'key' => 'field_sv_panel_heading',     'label' => 'Panel Heading',            'name' => 'svc_panel_heading',     'type' => 'text',     'default_value' => 'What makes care here different' ],
        [ 'key' => 'field_sv_panel_item1_title', 'label' => 'Panel Item 1 Title',       'name' => 'svc_panel_item1_title', 'type' => 'text',     'default_value' => 'Fear Free approach' ],
        [ 'key' => 'field_sv_panel_item1_body',  'label' => 'Panel Item 1 Body',        'name' => 'svc_panel_item1_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Gentle handling and lower-stress visits designed to help pets feel safer and people feel more supported.' ],
        [ 'key' => 'field_sv_panel_item2_title', 'label' => 'Panel Item 2 Title',       'name' => 'svc_panel_item2_title', 'type' => 'text',     'default_value' => 'Feline-exclusive appointment times' ],
        [ 'key' => 'field_sv_panel_item2_body',  'label' => 'Panel Item 2 Body',        'name' => 'svc_panel_item2_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Dedicated times designed to make visits more comfortable for cats and the people who love them.' ],
        [ 'key' => 'field_sv_panel_item3_title', 'label' => 'Panel Item 3 Title',       'name' => 'svc_panel_item3_title', 'type' => 'text',     'default_value' => 'Urgent care support' ],
        [ 'key' => 'field_sv_panel_item3_body',  'label' => 'Panel Item 3 Body',        'name' => 'svc_panel_item3_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Our team is equipped to handle many urgent medical needs during the work week.' ],
        [ 'key' => 'field_sv_panel_item4_title', 'label' => 'Panel Item 4 Title',       'name' => 'svc_panel_item4_title', 'type' => 'text',     'default_value' => 'Personalized recommendations' ],
        [ 'key' => 'field_sv_panel_item4_body',  'label' => 'Panel Item 4 Body',        'name' => 'svc_panel_item4_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => "Care plans are tailored to your pet's age, species, lifestyle, and health history." ],
        [ 'key' => 'field_sv_panel_note',        'label' => 'Panel Note',               'name' => 'svc_panel_note',        'type' => 'textarea', 'rows' => 2, 'default_value' => 'We see dogs, cats, rabbits, pocket pets, and select small farm animals. Availability may vary by veterinarian.' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_svc_cards',
    'title'           => 'Services – Service Cards',
    'menu_order'      => 20,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $services_template ],
    'fields'          => [
        [ 'key' => 'field_sv_svc_eyebrow', 'label' => 'Section Eyebrow', 'name' => 'svc_section_eyebrow', 'type' => 'text',     'default_value' => 'Our Services' ],
        [ 'key' => 'field_sv_svc_heading', 'label' => 'Section Heading', 'name' => 'svc_section_heading', 'type' => 'text',     'default_value' => 'Veterinary services Northern Kentucky pet owners can use through every life stage.' ],
        [ 'key' => 'field_sv_svc_body',    'label' => 'Section Body',    'name' => 'svc_section_body',    'type' => 'textarea', 'rows' => 3, 'default_value' => 'Our veterinary services in Northern Kentucky are designed to help pets stay healthy, address problems early, and support quality of life over time. Whether your pet is due for preventive care or needs more specialized attention, we aim to make the process clear, thoughtful, and manageable.' ],
        // Card 1
        [ 'key' => 'field_sv_c1_icon',  'label' => 'Card 1 Icon Key', 'name' => 'svc_card1_icon',  'type' => 'text',     'default_value' => 'cross',    'instructions' => 'Icon key: cross, tooth, scalpel, search, brain, heart' ],
        [ 'key' => 'field_sv_c1_title', 'label' => 'Card 1 Title',    'name' => 'svc_card1_title', 'type' => 'text',     'default_value' => 'Wellness & Preventive Care' ],
        [ 'key' => 'field_sv_c1_body',  'label' => 'Card 1 Body',     'name' => 'svc_card1_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Preventive care helps us build a complete picture of your pet\'s health and catch concerns before they become bigger problems.' ],
        [ 'key' => 'field_sv_c1_list',  'label' => 'Card 1 List (one per line)', 'name' => 'svc_card1_list', 'type' => 'textarea', 'rows' => 4, 'default_value' => "Wellness evaluations tailored to life stage\nVaccinations and preventive recommendations\nRoutine physical exams\nPersonalized care planning" ],
        [ 'key' => 'field_sv_c1_url',   'label' => 'Card 1 URL',      'name' => 'svc_card1_url',   'type' => 'url',      'default_value' => '/service-item/pet-wellness-exams-northern-kentucky/' ],
        // Card 2
        [ 'key' => 'field_sv_c2_icon',  'label' => 'Card 2 Icon Key', 'name' => 'svc_card2_icon',  'type' => 'text',     'default_value' => 'tooth' ],
        [ 'key' => 'field_sv_c2_title', 'label' => 'Card 2 Title',    'name' => 'svc_card2_title', 'type' => 'text',     'default_value' => 'Dental & Oral Health' ],
        [ 'key' => 'field_sv_c2_body',  'label' => 'Card 2 Body',     'name' => 'svc_card2_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Oral health affects comfort, appetite, and overall wellbeing. Dental care is an important part of long-term health.' ],
        [ 'key' => 'field_sv_c2_list',  'label' => 'Card 2 List',     'name' => 'svc_card2_list',  'type' => 'textarea', 'rows' => 4, 'default_value' => "Comprehensive Oral Health Assessment and Treatment (COHAT)\nDental cleanings\nOral exams and treatment planning\nRecommendations for ongoing home care" ],
        [ 'key' => 'field_sv_c2_url',   'label' => 'Card 2 URL',      'name' => 'svc_card2_url',   'type' => 'url',      'default_value' => '/service-item/veterinary-dental-care-northern-kentucky/' ],
        // Card 3
        [ 'key' => 'field_sv_c3_icon',  'label' => 'Card 3 Icon Key', 'name' => 'svc_card3_icon',  'type' => 'text',     'default_value' => 'scalpel' ],
        [ 'key' => 'field_sv_c3_title', 'label' => 'Card 3 Title',    'name' => 'svc_card3_title', 'type' => 'text',     'default_value' => 'Surgery' ],
        [ 'key' => 'field_sv_c3_body',  'label' => 'Card 3 Body',     'name' => 'svc_card3_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'When surgery is needed, we focus on careful planning, clear communication, and support before and after the procedure.' ],
        [ 'key' => 'field_sv_c3_list',  'label' => 'Card 3 List',     'name' => 'svc_card3_list',  'type' => 'textarea', 'rows' => 4, 'default_value' => "Soft tissue surgery\nPre-surgical evaluation\nRecovery guidance and follow-up care\nDischarge instructions and home monitoring support" ],
        [ 'key' => 'field_sv_c3_url',   'label' => 'Card 3 URL',      'name' => 'svc_card3_url',   'type' => 'url',      'default_value' => '/service-item/pet-soft-tissue-surgery-northern-kentucky/' ],
        // Card 4
        [ 'key' => 'field_sv_c4_icon',  'label' => 'Card 4 Icon Key', 'name' => 'svc_card4_icon',  'type' => 'text',     'default_value' => 'search' ],
        [ 'key' => 'field_sv_c4_title', 'label' => 'Card 4 Title',    'name' => 'svc_card4_title', 'type' => 'text',     'default_value' => 'Consultation & Second Opinions' ],
        [ 'key' => 'field_sv_c4_body',  'label' => 'Card 4 Body',     'name' => 'svc_card4_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Sometimes you need a fresh perspective or more time to talk through a complex issue. We are happy to help you make informed decisions.' ],
        [ 'key' => 'field_sv_c4_list',  'label' => 'Card 4 List',     'name' => 'svc_card4_list',  'type' => 'textarea', 'rows' => 4, 'default_value' => "Second-opinion consultations\nReview of previous history and records\nAdditional recommendations and care options\nGoal-based conversations for ongoing conditions" ],
        [ 'key' => 'field_sv_c4_url',   'label' => 'Card 4 URL',      'name' => 'svc_card4_url',   'type' => 'url',      'default_value' => '/service-item/urgent-veterinary-care-northern-kentucky/' ],
        // Card 5
        [ 'key' => 'field_sv_c5_icon',  'label' => 'Card 5 Icon Key', 'name' => 'svc_card5_icon',  'type' => 'text',     'default_value' => 'brain' ],
        [ 'key' => 'field_sv_c5_title', 'label' => 'Card 5 Title',    'name' => 'svc_card5_title', 'type' => 'text',     'default_value' => 'Behavior & Quality of Life' ],
        [ 'key' => 'field_sv_c5_body',  'label' => 'Card 5 Body',     'name' => 'svc_card5_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Behavior changes can affect daily life for both pets and people. We can help assess concerns and talk through realistic next steps.' ],
        [ 'key' => 'field_sv_c5_list',  'label' => 'Card 5 List',     'name' => 'svc_card5_list',  'type' => 'textarea', 'rows' => 4, 'default_value' => "Behavioral consultations\nStress-reduction recommendations\nSupport for lifestyle and home-management concerns\nQuality-of-life discussions when needs change" ],
        [ 'key' => 'field_sv_c5_url',   'label' => 'Card 5 URL',      'name' => 'svc_card5_url',   'type' => 'url',      'default_value' => '/service-item/pet-behavior-consultations-northern-kentucky/' ],
        // Card 6
        [ 'key' => 'field_sv_c6_icon',  'label' => 'Card 6 Icon Key', 'name' => 'svc_card6_icon',  'type' => 'text',     'default_value' => 'heart' ],
        [ 'key' => 'field_sv_c6_title', 'label' => 'Card 6 Title',    'name' => 'svc_card6_title', 'type' => 'text',     'default_value' => 'End-of-Life Care' ],
        [ 'key' => 'field_sv_c6_body',  'label' => 'Card 6 Body',     'name' => 'svc_card6_body',  'type' => 'textarea', 'rows' => 2, 'default_value' => 'Some of the most important care we provide happens during the hardest moments. We offer compassionate support centered on comfort, clarity, and dignity.' ],
        [ 'key' => 'field_sv_c6_list',  'label' => 'Card 6 List',     'name' => 'svc_card6_list',  'type' => 'textarea', 'rows' => 4, 'default_value' => "Euthanasia in office or at home\nGuidance for difficult decisions\nSupportive conversations about comfort and next steps" ],
        [ 'key' => 'field_sv_c6_url',   'label' => 'Card 6 URL',      'name' => 'svc_card6_url',   'type' => 'url',      'default_value' => '/service-item/cat-friendly-veterinarian-northern-kentucky/' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_svc_comfort',
    'title'           => 'Services – Comfort, Appointments & Species',
    'menu_order'      => 30,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $services_template ],
    'fields'          => [
        // Comfort section
        [ 'key' => 'field_sv_comf_eyebrow',    'label' => 'Comfort Eyebrow',         'name' => 'svc_comfort_eyebrow',    'type' => 'text',     'default_value' => 'Comfort-focused care' ],
        [ 'key' => 'field_sv_comf_heading',    'label' => 'Comfort Heading',         'name' => 'svc_comfort_heading',    'type' => 'text',     'default_value' => 'Care built around comfort, communication, and trust.' ],
        [ 'key' => 'field_sv_comf_body',       'label' => 'Comfort Body',            'name' => 'svc_comfort_body',       'type' => 'textarea', 'rows' => 3, 'default_value' => 'We believe good veterinary medicine is not just about treatment. It is also about how care feels. That means taking time to explain what we see, creating a lower-stress environment whenever possible, and helping you feel confident about the decisions you make for your pet.' ],
        [ 'key' => 'field_sv_cp1_title',       'label' => 'Comfort Point 1 Title',   'name' => 'svc_cp1_title',          'type' => 'text',     'default_value' => 'Calmer visits' ],
        [ 'key' => 'field_sv_cp1_body',        'label' => 'Comfort Point 1 Body',    'name' => 'svc_cp1_body',           'type' => 'textarea', 'rows' => 2, 'default_value' => 'Fear Free methods help reduce stress and make visits easier for nervous pets.' ],
        [ 'key' => 'field_sv_cp2_title',       'label' => 'Comfort Point 2 Title',   'name' => 'svc_cp2_title',          'type' => 'text',     'default_value' => 'Species-aware care' ],
        [ 'key' => 'field_sv_cp2_body',        'label' => 'Comfort Point 2 Body',    'name' => 'svc_cp2_body',           'type' => 'textarea', 'rows' => 2, 'default_value' => 'Different pets need different approaches, and care is tailored accordingly.' ],
        [ 'key' => 'field_sv_cp3_title',       'label' => 'Comfort Point 3 Title',   'name' => 'svc_cp3_title',          'type' => 'text',     'default_value' => 'Clear next steps' ],
        [ 'key' => 'field_sv_cp3_body',        'label' => 'Comfort Point 3 Body',    'name' => 'svc_cp3_body',           'type' => 'textarea', 'rows' => 2, 'default_value' => 'You leave with recommendations you can understand and act on.' ],
        // Appointments
        [ 'key' => 'field_sv_appt_eyebrow',    'label' => 'Appointments Eyebrow',    'name' => 'svc_appt_eyebrow',       'type' => 'text',     'default_value' => 'Appointments & Support' ],
        [ 'key' => 'field_sv_appt_heading',    'label' => 'Appointments Heading',    'name' => 'svc_appt_heading',       'type' => 'text',     'default_value' => 'Here when you need routine care, answers, or urgent support.' ],
        [ 'key' => 'field_sv_appt_body',       'label' => 'Appointments Body',       'name' => 'svc_appt_body',          'type' => 'textarea', 'rows' => 2, 'default_value' => 'Our appointment system is designed to help us schedule efficiently while still giving each pet the attention they need. We do our best to accommodate requests, and our team is available during the week to address many urgent medical concerns.' ],
        [ 'key' => 'field_sv_appt1_title',     'label' => 'Appt Card 1 Title',       'name' => 'svc_appt1_title',        'type' => 'text',     'default_value' => 'Appointments' ],
        [ 'key' => 'field_sv_appt1_body',      'label' => 'Appt Card 1 Body',        'name' => 'svc_appt1_body',         'type' => 'textarea', 'rows' => 3, 'default_value' => 'Our computerized appointment book helps us coordinate care efficiently and make the most of your visit. If you have scheduling concerns or need help choosing the right appointment type, our team is happy to guide you.' ],
        [ 'key' => 'field_sv_appt2_title',     'label' => 'Appt Card 2 Title',       'name' => 'svc_appt2_title',        'type' => 'text',     'default_value' => 'Urgent care' ],
        [ 'key' => 'field_sv_appt2_body',      'label' => 'Appt Card 2 Body',        'name' => 'svc_appt2_body',         'type' => 'textarea', 'rows' => 3, 'default_value' => 'We have a veterinarian and trained staff on duty five days a week who are equipped to handle urgent medical needs. If your pet needs prompt attention, contact us so we can help you determine the best next step.' ],
        // Pets We See
        [ 'key' => 'field_sv_pets_eyebrow',    'label' => 'Pets Eyebrow',            'name' => 'svc_pets_eyebrow',       'type' => 'text',     'default_value' => 'Pets We See' ],
        [ 'key' => 'field_sv_pets_heading',    'label' => 'Pets Heading',            'name' => 'svc_pets_heading',       'type' => 'text',     'default_value' => 'We care for more than just dogs and cats.' ],
        [ 'key' => 'field_sv_pets_body',       'label' => 'Pets Body',               'name' => 'svc_pets_body',          'type' => 'textarea', 'rows' => 2, 'default_value' => 'Because our veterinarians have a range of experience and interests, we are able to care for many different kinds of pets. Availability for some species may depend on the veterinarian, so please call if you have specific questions.' ],
        [ 'key' => 'field_sv_pets_list',       'label' => 'Species List (one per line)', 'name' => 'svc_pets_list',      'type' => 'textarea', 'rows' => 5, 'default_value' => "Dogs\nCats\nRabbits*\nPocket Pets*\nSmall Farm Animals*" ],
        [ 'key' => 'field_sv_pets_note',       'label' => 'Species Note',            'name' => 'svc_pets_note',          'type' => 'textarea', 'rows' => 2, 'default_value' => '*Select veterinarians only. Contact us for details about species-specific care and appointment availability.' ],
        // SEO body
        [ 'key' => 'field_sv_seo_body',        'label' => 'SEO Body (WYSIWYG)',      'name' => 'svc_seo_body',           'type' => 'wysiwyg',  'toolbar' => 'full', 'media_upload' => 0, 'default_value' => '' ],
    ],
]);

acf_add_local_field_group([
    'key'             => 'group_svc_links',
    'title'           => 'Services – SEO Links & Resources',
    'menu_order'      => 35,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [ $services_template ],
    'fields'          => [
        [ 'key' => 'field_sv_internal_heading', 'label' => 'Internal Links Heading', 'name' => 'svc_internal_heading', 'type' => 'text', 'default_value' => 'Explore veterinary services in Northern Kentucky' ],
        [ 'key' => 'field_sv_internal_body', 'label' => 'Internal Links Body', 'name' => 'svc_internal_body', 'type' => 'textarea', 'rows' => 2, 'default_value' => 'These internal pages help pet owners move from comparing services to choosing the right appointment.' ],
        [ 'key' => 'field_sv_priority_heading', 'label' => 'Priority Searches Heading', 'name' => 'svc_priority_heading', 'type' => 'text', 'default_value' => 'Common service searches we support' ],
        [ 'key' => 'field_sv_priority_body', 'label' => 'Priority Searches Body', 'name' => 'svc_priority_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Families often reach this page while comparing dog and cat vet services, pet wellness exams, veterinary dental care, pet surgery, urgent veterinary care, and cat-friendly veterinary care in Northern Kentucky.' ],
        [ 'key' => 'field_sv_resources_eyebrow', 'label' => 'Resources Eyebrow', 'name' => 'svc_resources_eyebrow', 'type' => 'text', 'default_value' => 'Pet Care Resources' ],
        [ 'key' => 'field_sv_resources_heading', 'label' => 'Resources Heading', 'name' => 'svc_resources_heading', 'type' => 'text', 'default_value' => 'Service planning links for Northern Kentucky pet families.' ],
        [ 'key' => 'field_sv_resources_body', 'label' => 'Resources Body', 'name' => 'svc_resources_body', 'type' => 'textarea', 'rows' => 3, 'default_value' => 'Good veterinary care includes reliable education. These outside resources are useful for pet owners researching preventive care, dental health, behavior, and lower-stress handling before or after a visit.' ],
    ],
]);

// ══════════════════════════════════════════════════════════
// SINGLE LOCATION PAGES — ACF Field Group
// Targets any page using the "Location Template" page template.
// Compatible with ACF free (no Pro required).
// Fields are stored under clean names (loc_*) and read in
// single-vmc_location.php via get_field(), with legacy
// _vmc_loc_* meta keys supported as a fallback.
// ══════════════════════════════════════════════════════════
acf_add_local_field_group([
    'key'             => 'group_vmc_location_page',
    'title'           => 'Location Details',
    'menu_order'      => 5,
    'position'        => 'normal',
    'label_placement' => 'top',
    'location'        => [[
        [
            'param'    => 'page_template',
            'operator' => '==',
            'value'    => 'single-vmc_location.php',
        ],
    ]],
    'fields' => [
        // ── Hero ──────────────────────────────────────────
        [
            'key'           => 'field_loc_subtitle',
            'label'         => 'Hero Subtitle',
            'name'          => 'loc_subtitle',
            'type'          => 'text',
            'instructions'  => 'One sentence shown below the page title in the hero.',
            'default_value' => 'Local, relationship-based veterinary care for dogs and cats.',
        ],
        // ── Intro card ────────────────────────────────────
        [
            'key'           => 'field_loc_intro',
            'label'         => 'Intro Paragraph',
            'name'          => 'loc_intro',
            'type'          => 'textarea',
            'rows'          => 4,
            'instructions'  => 'Shown in the intro card above the block-editor content. Falls back to the post excerpt when empty.',
            'default_value' => '',
        ],
        // ── Contact info ──────────────────────────────────
        [
            'key'           => 'field_loc_phone',
            'label'         => 'Phone (formatted)',
            'name'          => 'loc_phone',
            'type'          => 'text',
            'instructions'  => 'e.g. (859) 442-4420',
            'default_value' => '(859) 442-4420',
        ],
        [
            'key'           => 'field_loc_phone_link',
            'label'         => 'Phone Link (tel: href)',
            'name'          => 'loc_phone_link',
            'type'          => 'text',
            'instructions'  => 'e.g. tel:+18594424420 — used as the href for click-to-call.',
            'default_value' => 'tel:+18594424420',
        ],
        [
            'key'           => 'field_loc_address',
            'label'         => 'Address',
            'name'          => 'loc_address',
            'type'          => 'text',
            'instructions'  => 'Full street address, used in the sidebar, map card, and Google Maps links.',
            'default_value' => '2000 Memorial Pkwy, Fort Thomas, KY 41075',
        ],
        // ── Hours ─────────────────────────────────────────
        [
            'key'           => 'field_loc_hours',
            'label'         => 'Weekday Hours',
            'name'          => 'loc_hours',
            'type'          => 'text',
            'instructions'  => 'e.g. Mon–Fri 8:00 AM – 6:00 PM',
            'default_value' => 'Mon–Fri 8:00 AM – 6:00 PM',
        ],
        [
            'key'           => 'field_loc_sat_hours',
            'label'         => 'Saturday Hours',
            'name'          => 'loc_sat_hours',
            'type'          => 'text',
            'instructions'  => 'e.g. Sat 8:00 AM – 12:00 PM — leave blank if closed.',
            'default_value' => '',
        ],
        // ── Map ───────────────────────────────────────────
        [
            'key'           => 'field_loc_map_embed',
            'label'         => 'Google Maps Embed URL',
            'name'          => 'loc_map_embed',
            'type'          => 'url',
            'instructions'  => 'Paste only the src URL from the Google Maps embed iframe — not the full &lt;iframe&gt; tag. Leave blank to hide the map section.',
            'default_value' => '',
        ],
        // ── Highlights strip ──────────────────────────────
        [
            'key'           => 'field_loc_highlights',
            'label'         => 'Highlights Strip',
            'name'          => 'loc_highlights',
            'type'          => 'text',
            'instructions'  => 'Pipe-separated values shown in the red strip and sidebar. e.g. Locally owned|Fear-free certified|Same-day urgent care',
            'default_value' => '',
        ],
        // ── Nearby areas ──────────────────────────────────
        [
            'key'           => 'field_loc_nearby',
            'label'         => 'Nearby Areas We Serve',
            'name'          => 'loc_nearby',
            'type'          => 'text',
            'instructions'  => 'Pipe-separated community names shown as chips in the sidebar. e.g. Highland Heights|Bellevue|Newport|Fort Mitchell',
            'default_value' => '',
        ],
        // ── FAQs ──────────────────────────────────────────
        [
            'key'           => 'field_loc_faqs',
            'label'         => 'FAQs',
            'name'          => 'loc_faqs',
            'type'          => 'textarea',
            'rows'          => 10,
            'instructions'  => 'One FAQ per line. Format: Question||Answer — the FAQ section is hidden when this field is empty.',
            'default_value' => '',
        ],
        // ── CTA band ──────────────────────────────────────
        [
            'key'           => 'field_loc_cta_title',
            'label'         => 'CTA Band Heading',
            'name'          => 'loc_cta_title',
            'type'          => 'text',
            'instructions'  => 'Defaults to "Ready to visit {page title}?" when left blank.',
            'default_value' => '',
        ],
        [
            'key'           => 'field_loc_cta_text',
            'label'         => 'CTA Band Body Text',
            'name'          => 'loc_cta_text',
            'type'          => 'textarea',
            'rows'          => 2,
            'default_value' => 'Call, request an appointment online, or complete your new patient form before your first visit.',
        ],
    ],
]);
