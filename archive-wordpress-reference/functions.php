<?php
/**
 * VMC Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// Load includes
require_once get_template_directory() . '/inc/nav-walkers.php';
require_once get_template_directory() . '/inc/acf-fields.php';


// Ensure dedicated SEO landing pages for portal/booking and online pharmacy exist.
add_action( 'init', function () {
    if ( ! function_exists( 'wp_insert_post' ) ) {
        return;
    }

    $pages = [
        [
            'title'    => 'Patient Portal & Online Booking | Northern Kentucky & Cincinnati',
            'slug'     => 'patient-portal-online-booking',
            'template' => 'template-patient-portal-online-booking.php',
            'content'  => '<p>Use this patient portal and online booking page to securely sign in and request care with Veterinary Medical Center.</p>',
        ],
        [
            'title'    => 'Northern Kentucky & Cincinnati Online Vet Pharmacy',
            'slug'     => 'online-vet-pharmacy-northern-kentucky-cincinnati',
            'template' => 'template-online-vet-pharmacy.php',
            'content'  => '<p>Use our online vet pharmacy page to request refills and browse eligible products from a trusted veterinary source.</p>',
        ],
    ];

    foreach ( $pages as $page ) {
        $existing = get_page_by_path( $page['slug'], OBJECT, 'page' );
        if ( $existing ) {
            if ( get_post_meta( $existing->ID, '_wp_page_template', true ) !== $page['template'] ) {
                update_post_meta( $existing->ID, '_wp_page_template', $page['template'] );
            }
            continue;
        }

        $page_id = wp_insert_post( [
            'post_title'   => $page['title'],
            'post_name'    => $page['slug'],
            'post_content' => $page['content'],
            'post_status'  => 'publish',
            'post_type'    => 'page',
        ] );

        if ( $page_id && ! is_wp_error( $page_id ) ) {
            update_post_meta( $page_id, '_wp_page_template', $page['template'] );
        }
    }
} );

define( 'VMC_VERSION', '2.0.4' );

/* ─────────────────────────────────────────
   THEME SETUP
───────────────────────────────────────── */
function vmc_setup() {
    load_theme_textdomain( 'vmc', get_template_directory() . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [ 'search-form','comment-form','comment-list','gallery','caption','style','script' ] );
    add_theme_support( 'custom-logo', [
        'height'      => 100,
        'width'       => 260,
        'flex-height' => true,
        'flex-width'  => true,
    ]);
    add_theme_support( 'customize-selective-refresh-widgets' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'editor-styles' );
    add_editor_style( 'assets/css/editor.css' );

    // Nav menus
    register_nav_menus([
        'primary' => __( 'Primary Navigation', 'vmc' ),
        'footer'  => __( 'Footer Navigation', 'vmc' ),
    ]);

    // Image sizes
    add_image_size( 'vmc-hero',   3200, 1800,  true );
    add_image_size( 'vmc-team',   700,  875,  true );
    add_image_size( 'vmc-staff',  600,  500,  true );
    add_image_size( 'vmc-square', 800,  800,  true );
}
add_action( 'after_setup_theme', 'vmc_setup' );

/* ─────────────────────────────────────────
   ENQUEUE SCRIPTS & STYLES
───────────────────────────────────────── */
function vmc_scripts() {
    // Google Fonts
    wp_enqueue_style(
        'vmc-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500;1,700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
        [],
        null
    );

    // Main stylesheet
    wp_enqueue_style(
        'vmc-main',
        get_template_directory_uri() . '/assets/css/main.css',
        [ 'vmc-fonts' ],
        VMC_VERSION
    );

    // WordPress core block styles (dequeue if not using Gutenberg blocks)
    // wp_dequeue_style('wp-block-library');

    // Main JS
    wp_enqueue_script(
        'vmc-main',
        get_template_directory_uri() . '/assets/js/main.js',
        [],
        VMC_VERSION,
        true
    );

    // Pass data to JS
    wp_localize_script( 'vmc-main', 'vmcData', [
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'vmc_nonce' ),
        'homeUrl' => home_url( '/' ),
    ] );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'vmc_scripts' );

/* ─────────────────────────────────────────
   SEO FALLBACKS
───────────────────────────────────────── */
function vmc_document_title_parts( $title ) {
    if ( is_page_template( 'templates-about.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Independently Owned Veterinary Hospital in Northern Kentucky';
        $title['site']  = 'Veterinary Medical Center';
    } elseif ( is_page_template( 'template-vet-near-me.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Vet Near Me in Northern Kentucky';
        $title['site']  = 'Veterinary Medical Center';
    } elseif ( is_page_template( 'template-vet-fort-thomas-ky.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Vet in Fort Thomas KY';
        $title['site']  = 'Veterinary Medical Center';
    } elseif ( is_page_template( 'template-vet-independence-ky.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Vet in Independence KY';
        $title['site']  = 'Veterinary Medical Center';
    } elseif ( is_page_template( 'template-vet-cincinnati.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Vet Near Cincinnati';
        $title['site']  = 'Veterinary Medical Center';
    } elseif ( is_page_template( 'template-services.php' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        $title['title'] = 'Veterinary Services in Northern Kentucky';
        $title['site']  = 'Veterinary Medical Center';
    }

    return $title;
}
add_filter( 'document_title_parts', 'vmc_document_title_parts' );

/* ─────────────────────────────────────────
   CUSTOMIZER SETTINGS
───────────────────────────────────────── */
function vmc_customize_register( $wp_customize ) {

    // ── PANEL: VMC Site Settings ──
    $wp_customize->add_panel( 'vmc_settings', [
        'title'    => __( 'VMC Site Settings', 'vmc' ),
        'priority' => 30,
    ] );

    // ── SECTION: Contact & Locations ──
    $wp_customize->add_section( 'vmc_contact', [
        'title'    => __( 'Contact & Locations', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 10,
    ] );

    $contact_fields = [
        'vmc_ft_address'           => [ 'Fort Thomas Address', '2000 Memorial Pkwy, Fort Thomas, KY 41075' ],
        'vmc_ft_phone'             => [ 'Fort Thomas Phone', '(859) 442-4420' ],
        'vmc_ft_phone_raw'         => [ 'Fort Thomas Phone (tel link)', '8594424420' ],
        'vmc_ind_address'          => [ 'Independence Address', '4147 Madison Pike, Covington, KY 41017' ],
        'vmc_ind_phone'            => [ 'Independence Phone', '(859) 356-2242' ],
        'vmc_ind_phone_raw'        => [ 'Independence Phone (tel link)', '8593562242' ],
        'vmc_portal_url'           => [ 'Patient Portal URL', 'https://tvmcft.use1.ezyvet.com/external/portal/main/login?id=2' ],
        'vmc_pharmacy_url'         => [ 'Online Pharmacy URL', 'https://nky-vet.ourvet.com/' ],
        'vmc_practice_email'       => [ 'Practice Email', 'information@nky.vet' ],
        'vmc_contact_form_shortcode' => [ 'Contact Form Shortcode', '' ],
        'vmc_google_maps_embed'    => [ 'Google Maps Embed URL', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3100!2d-84.4489!3d39.0795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8841b14d0be1c1c3%3A0x1!2s2000+Memorial+Pkwy%2C+Fort+Thomas%2C+KY+41075!5e0!3m2!1sen!2sus!4v1680000000' ],
    ];

    foreach ( $contact_fields as $id => [ $label, $default ] ) {
        if ( strpos( $id, '_url' ) !== false ) {
            $sanitize = 'esc_url_raw';
        } elseif ( strpos( $id, 'email' ) !== false ) {
            $sanitize = 'sanitize_email';
        } elseif ( strpos( $id, 'shortcode' ) !== false ) {
            $sanitize = 'sanitize_text_field';
        } else {
            $sanitize = 'sanitize_text_field';
        }

        $wp_customize->add_setting( $id, [
            'default'           => $default,
            'sanitize_callback' => $sanitize,
            'transport'         => 'refresh',
        ] );

        $wp_customize->add_control( $id, [
            'label'   => __( $label, 'vmc' ),
            'section' => 'vmc_contact',
            'type'    => 'text',
        ] );
    }

    // ── SECTION: Hours ──
    $wp_customize->add_section( 'vmc_hours', [
        'title'    => __( 'Hours', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 20,
    ] );

    $hours_fields = [
        'vmc_ft_hours_weekday'   => [ 'Fort Thomas Mon–Fri', '8:00 AM – 6:00 PM' ],
        'vmc_ft_hours_saturday'  => [ 'Fort Thomas Saturday', 'Rotating — call ahead' ],
        'vmc_ft_hours_sunday'    => [ 'Fort Thomas Sunday', 'Closed' ],
        'vmc_ind_hours_weekday'  => [ 'Independence Mon–Fri', '8:00 AM – 6:00 PM' ],
        'vmc_ind_hours_saturday' => [ 'Independence Saturday', 'Closed' ],
        'vmc_ind_hours_sunday'   => [ 'Independence Sunday', 'Closed' ],
    ];

    foreach ( $hours_fields as $id => [ $label, $default ] ) {
        $wp_customize->add_setting( $id, [
            'default'           => $default,
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );

        $wp_customize->add_control( $id, [
            'label'   => __( $label, 'vmc' ),
            'section' => 'vmc_hours',
            'type'    => 'text',
        ] );
    }

    // ── SECTION: Hero ──
    $wp_customize->add_section( 'vmc_hero', [
        'title'    => __( 'Homepage Hero', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 30,
    ] );

    $hero_fields = [
        'vmc_hero_eyebrow'   => [ 'Eyebrow Text', 'Fort Thomas & Independence, Kentucky' ],
        'vmc_hero_headline'  => [ 'Headline', 'Medicine that knows your pet\'s name.' ],
        'vmc_hero_subtext'   => [ 'Subtext', 'Fear-free visits, same-week appointments, and a team genuinely invested in this community. Two locations in Northern Kentucky built around real relationships.' ],
        'vmc_hero_btn1_text' => [ 'Button 1 Label', 'Book an Appointment' ],
        'vmc_hero_btn2_text' => [ 'Button 2 Label', 'Contact Us' ],
        'vmc_hero_btn2_link' => [ 'Button 2 URL', '/contact/' ],
        'vmc_stat1_num'      => [ 'Stat 1 Number', '4.8' ],
        'vmc_stat1_label'    => [ 'Stat 1 Label', 'Avg. Rating' ],
        'vmc_stat2_num'      => [ 'Stat 2 Number', '158' ],
        'vmc_stat2_label'    => [ 'Stat 2 Label', 'Reviews' ],
        'vmc_stat3_num'      => [ 'Stat 3 Number', '5+' ],
        'vmc_stat3_label'    => [ 'Stat 3 Label', 'Yrs Serving NKY' ],
    ];

    foreach ( $hero_fields as $id => [ $label, $default ] ) {
        $wp_customize->add_setting( $id, [
            'default'           => $default,
            'sanitize_callback' => 'sanitize_text_field',
            'transport'         => 'refresh',
        ] );

        $wp_customize->add_control( $id, [
            'label'   => __( $label, 'vmc' ),
            'section' => 'vmc_hero',
            'type'    => 'text',
        ] );
    }

    // Hero image
    $wp_customize->add_setting( 'vmc_hero_image', [
        'default'           => '',
        'sanitize_callback' => 'absint',
    ] );

    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'vmc_hero_image', [
        'label'     => __( 'Hero Image', 'vmc' ),
        'section'   => 'vmc_hero',
        'mime_type' => 'image',
    ] ) );

    // ── SECTION: Why VMC ──
    $wp_customize->add_section( 'vmc_why', [
        'title'    => __( 'Why VMC Section', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 40,
    ] );

    $wp_customize->add_setting( 'vmc_why_label', [
        'default'           => 'Why VMC',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'vmc_why_label', [
        'label'   => 'Section Label',
        'section' => 'vmc_why',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'vmc_why_headline', [
        'default'           => 'What makes us different from the rest.',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'vmc_why_headline', [
        'label'   => 'Headline',
        'section' => 'vmc_why',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'vmc_why_intro', [
        'default'           => 'Small practice, big commitment. Dr. Baker built VMC because Fort Thomas and Independence deserved a vet who actually stays — one who picks up the phone and remembers your pet\'s name.',
        'sanitize_callback' => 'wp_kses_post',
    ] );
    $wp_customize->add_control( 'vmc_why_intro', [
        'label'   => 'Intro Paragraph',
        'section' => 'vmc_why',
        'type'    => 'textarea',
    ] );

    for ( $i = 1; $i <= 4; $i++ ) {
        $wp_customize->add_setting( "vmc_why_{$i}_title", [
            'default'           => [ 'Fear-Free Certified', 'A Doctor Who Knows You', 'Honest, Upfront Medicine', 'Rooted in This Community' ][ $i - 1 ],
            'sanitize_callback' => 'sanitize_text_field',
        ] );
        $wp_customize->add_control( "vmc_why_{$i}_title", [
            'label'   => "Card {$i} Title",
            'section' => 'vmc_why',
            'type'    => 'text',
        ] );

        $defaults = [
            'Every visit is designed around your pet\'s comfort first. Anxiety minimized by design, not accident.',
            'Small practice means continuity. You\'re not seeing a different doctor every visit.',
            'We explain your options clearly, give you real pricing before we start, and never recommend something your pet doesn\'t need.',
            'Two locations planted in NKY neighborhoods, not a regional chain optimizing for throughput.',
        ];

        $wp_customize->add_setting( "vmc_why_{$i}_desc", [
            'default'           => $defaults[ $i - 1 ],
            'sanitize_callback' => 'wp_kses_post',
        ] );
        $wp_customize->add_control( "vmc_why_{$i}_desc", [
            'label'   => "Card {$i} Description",
            'section' => 'vmc_why',
            'type'    => 'textarea',
        ] );
    }

    // ── SECTION: Quote Banner ──
    $wp_customize->add_section( 'vmc_quote', [
        'title'    => __( 'Quote Banner', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 50,
    ] );

    $wp_customize->add_setting( 'vmc_quote_text', [
        'default'           => '"Our rescue used to shake from the moment we pulled into the parking lot. After a few visits here she walks in on her own."',
        'sanitize_callback' => 'wp_kses_post',
    ] );
    $wp_customize->add_control( 'vmc_quote_text', [
        'label'   => 'Quote Text',
        'section' => 'vmc_quote',
        'type'    => 'textarea',
    ] );

    $wp_customize->add_setting( 'vmc_quote_attr', [
        'default'           => '— Sarah M., Fort Thomas, KY · Google Review',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'vmc_quote_attr', [
        'label'   => 'Attribution',
        'section' => 'vmc_quote',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'vmc_quote_bg', [
        'default'           => '',
        'sanitize_callback' => 'absint',
    ] );
    $wp_customize->add_control( new WP_Customize_Media_Control( $wp_customize, 'vmc_quote_bg', [
        'label'     => __( 'Background Image', 'vmc' ),
        'section'   => 'vmc_quote',
        'mime_type' => 'image',
    ] ) );

    // ── SECTION: New Patients Page ──
    $wp_customize->add_section( 'vmc_new_patients', [
        'title'    => __( 'New Patients Page', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 75,
    ] );

    $np_fields = [
        'vmc_np_eyebrow'               => [ 'Eyebrow Text', 'New Patients · Fort Thomas & Independence' ],
        'vmc_np_headline'              => [ 'Headline', 'Everything you need before your first visit.' ],
        'vmc_np_subtext'               => [ 'Intro Text', 'We want your first experience with VMC to feel clear, calm, and well-prepared. From paperwork to what to bring and what surgery day looks like, this page walks you through the details so there are no surprises.' ],
        'vmc_np_form_registration_url' => [ 'New Patient Registration Form URL', '#' ],
        'vmc_np_form_surgery_url'      => [ 'Surgical Information Packet URL', '#' ],
    ];

    foreach ( $np_fields as $id => [ $label, $default ] ) {
        $sanitize = strpos( $id, '_url' ) !== false ? 'esc_url_raw' : 'sanitize_text_field';
        $type     = $id === 'vmc_np_subtext' ? 'textarea' : 'text';

        $wp_customize->add_setting( $id, [
            'default'           => $default,
            'sanitize_callback' => $sanitize,
        ] );

        $wp_customize->add_control( $id, [
            'label'   => $label,
            'section' => 'vmc_new_patients',
            'type'    => $type,
        ] );
    }

    // ── SECTION: Newsletter ──
    $wp_customize->add_section( 'vmc_newsletter', [
        'title'    => __( 'Newsletter Bar', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 80,
    ] );

    $wp_customize->add_setting( 'vmc_nl_text', [
        'default'           => 'Monthly pet health tips and clinic updates for Northern Kentucky pet owners.',
        'sanitize_callback' => 'wp_kses_post',
    ] );
    $wp_customize->add_control( 'vmc_nl_text', [
        'label'   => 'Newsletter Description',
        'section' => 'vmc_newsletter',
        'type'    => 'textarea',
    ] );

    // ── SECTION: Footer ──
    $wp_customize->add_section( 'vmc_footer', [
        'title'    => __( 'Footer', 'vmc' ),
        'panel'    => 'vmc_settings',
        'priority' => 90,
    ] );

    $wp_customize->add_setting( 'vmc_footer_tagline', [
        'default'           => 'Fort Thomas & Independence, Kentucky',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'vmc_footer_tagline', [
        'label'   => 'Footer Tagline',
        'section' => 'vmc_footer',
        'type'    => 'text',
    ] );

    $wp_customize->add_setting( 'vmc_footer_legal', [
        'default'           => 'Fear-Free Certified · Licensed in KY & OH',
        'sanitize_callback' => 'sanitize_text_field',
    ] );
    $wp_customize->add_control( 'vmc_footer_legal', [
        'label'   => 'Footer Legal Text',
        'section' => 'vmc_footer',
        'type'    => 'text',
    ] );
}
add_action( 'customize_register', 'vmc_customize_register' );

/* ─────────────────────────────────────────
   CUSTOM POST TYPES
───────────────────────────────────────── */
function vmc_register_post_types() {

register_post_type( 'vmc_service', [
    'labels' => [
        'name'          => __( 'Services', 'vmc' ),
        'singular_name' => __( 'Service', 'vmc' ),
        'add_new_item'  => __( 'Add New Service', 'vmc' ),
        'edit_item'     => __( 'Edit Service', 'vmc' ),
        'menu_name'     => __( 'Services', 'vmc' ),
    ],
    'public'        => true,
    'show_in_rest'  => true,
    'menu_icon'     => 'dashicons-heart',
    'supports'      => [ 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ],
    'has_archive'   => false,
    'rewrite'       => [ 'slug' => 'service-item' ],
    'menu_position' => 5,
] );

    // Team Members
    register_post_type( 'vmc_team', [
        'labels' => [
            'name'          => __( 'Team Members', 'vmc' ),
            'singular_name' => __( 'Team Member', 'vmc' ),
            'add_new_item'  => __( 'Add New Team Member', 'vmc' ),
            'edit_item'     => __( 'Edit Team Member', 'vmc' ),
            'menu_name'     => __( 'Team', 'vmc' ),
        ],
        'public'        => true,
        'show_in_rest'  => true,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => [ 'title', 'editor', 'thumbnail', 'custom-fields' ],
        'has_archive'   => false,
        'menu_position' => 6,
    ] );

    // Reviews / Testimonials
    register_post_type( 'vmc_review', [
        'labels' => [
            'name'          => __( 'Reviews', 'vmc' ),
            'singular_name' => __( 'Review', 'vmc' ),
            'add_new_item'  => __( 'Add New Review', 'vmc' ),
            'menu_name'     => __( 'Reviews', 'vmc' ),
        ],
        'public'        => false,
        'show_ui'       => true,
        'show_in_rest'  => true,
        'menu_icon'     => 'dashicons-star-filled',
        'supports'      => [ 'title', 'editor', 'custom-fields' ],
        'menu_position' => 7,
    ] );

    // FAQs
    register_post_type( 'vmc_faq', [
        'labels' => [
            'name'          => __( 'FAQs', 'vmc' ),
            'singular_name' => __( 'FAQ', 'vmc' ),
            'add_new_item'  => __( 'Add New FAQ', 'vmc' ),
            'menu_name'     => __( 'FAQs', 'vmc' ),
        ],
        'public'        => false,
        'show_ui'       => true,
        'show_in_rest'  => true,
        'menu_icon'     => 'dashicons-editor-help',
        'supports'      => [ 'title', 'editor' ],
        'menu_position' => 8,
    ] );
}
add_action( 'init', 'vmc_register_post_types' );

/* ─────────────────────────────────────────
   CUSTOM META BOXES
───────────────────────────────────────── */
function vmc_add_meta_boxes() {
    add_meta_box( 'vmc_service_meta', __( 'Service Details', 'vmc' ), 'vmc_service_meta_cb', 'vmc_service', 'side' );
    add_meta_box( 'vmc_team_meta', __( 'Team Member Details', 'vmc' ), 'vmc_team_meta_cb', 'vmc_team', 'side' );
    add_meta_box( 'vmc_review_meta', __( 'Review Details', 'vmc' ), 'vmc_review_meta_cb', 'vmc_review', 'side' );
}
add_action( 'add_meta_boxes', 'vmc_add_meta_boxes' );

function vmc_service_meta_cb( $post ) {
    $icon_slug = get_post_meta( $post->ID, '_vmc_service_icon', true );
    $order     = get_post_meta( $post->ID, '_vmc_service_order', true );

    echo '<p><label><strong>' . __( 'Icon Slug (e.g. wellness, dental, surgery)', 'vmc' ) . '</strong><br>';
    echo '<input type="text" name="vmc_service_icon" value="' . esc_attr( $icon_slug ) . '" style="width:100%"></label></p>';
    echo '<p><label><strong>' . __( 'Display Order', 'vmc' ) . '</strong><br>';
    echo '<input type="number" name="vmc_service_order" value="' . esc_attr( $order ?: 10 ) . '" style="width:100%"></label></p>';
    wp_nonce_field( 'vmc_meta_nonce', 'vmc_meta_nonce' );
}

function vmc_team_meta_cb( $post ) {
    $role        = get_post_meta( $post->ID, '_vmc_team_role', true );
    $credentials = get_post_meta( $post->ID, '_vmc_team_credentials', true );
    $is_primary  = get_post_meta( $post->ID, '_vmc_team_primary', true );

    echo '<p><label><strong>' . __( 'Role / Title', 'vmc' ) . '</strong><br>';
    echo '<input type="text" name="vmc_team_role" value="' . esc_attr( $role ) . '" style="width:100%"></label></p>';
    echo '<p><label><strong>' . __( 'Credentials (one per line)', 'vmc' ) . '</strong><br>';
    echo '<textarea name="vmc_team_credentials" rows="4" style="width:100%">' . esc_textarea( $credentials ) . '</textarea></label></p>';
    echo '<p><label><input type="checkbox" name="vmc_team_primary" value="1" ' . checked( $is_primary, '1', false ) . '> ' . __( 'Featured doctor (large profile)', 'vmc' ) . '</label></p>';
}

function vmc_review_meta_cb( $post ) {
    $author   = get_post_meta( $post->ID, '_vmc_review_author', true );
    $location = get_post_meta( $post->ID, '_vmc_review_location', true );
    $rating   = get_post_meta( $post->ID, '_vmc_review_rating', true );
    $initials = get_post_meta( $post->ID, '_vmc_review_initials', true );

    echo '<p><label><strong>' . __( 'Author Name', 'vmc' ) . '</strong><br><input type="text" name="vmc_review_author" value="' . esc_attr( $author ) . '" style="width:100%"></label></p>';
    echo '<p><label><strong>' . __( 'Location (e.g. Fort Thomas, KY)', 'vmc' ) . '</strong><br><input type="text" name="vmc_review_location" value="' . esc_attr( $location ) . '" style="width:100%"></label></p>';
    echo '<p><label><strong>' . __( 'Rating (1-5)', 'vmc' ) . '</strong><br><input type="number" name="vmc_review_rating" min="1" max="5" value="' . esc_attr( $rating ?: 5 ) . '" style="width:100%"></label></p>';
    echo '<p><label><strong>' . __( 'Initials (e.g. JD)', 'vmc' ) . '</strong><br><input type="text" name="vmc_review_initials" maxlength="3" value="' . esc_attr( $initials ) . '" style="width:100%"></label></p>';
}

function vmc_save_meta( $post_id ) {
    if ( ! isset( $_POST['vmc_meta_nonce'] ) || ! wp_verify_nonce( $_POST['vmc_meta_nonce'], 'vmc_meta_nonce' ) ) {
        return;
    }

    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }

    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    $fields = [
        'vmc_service_icon'     => '_vmc_service_icon',
        'vmc_service_order'    => '_vmc_service_order',
        'vmc_team_role'        => '_vmc_team_role',
        'vmc_team_credentials' => '_vmc_team_credentials',
        'vmc_review_author'    => '_vmc_review_author',
        'vmc_review_location'  => '_vmc_review_location',
        'vmc_review_rating'    => '_vmc_review_rating',
        'vmc_review_initials'  => '_vmc_review_initials',
    ];

    foreach ( $fields as $key => $meta_key ) {
        if ( isset( $_POST[ $key ] ) ) {
            update_post_meta( $post_id, $meta_key, sanitize_text_field( $_POST[ $key ] ) );
        }
    }

    // Checkbox
    $is_primary = isset( $_POST['vmc_team_primary'] ) ? '1' : '0';
    update_post_meta( $post_id, '_vmc_team_primary', $is_primary );
}
add_action( 'save_post', 'vmc_save_meta' );

/* ─────────────────────────────────────────
   HELPER FUNCTIONS
───────────────────────────────────────── */
function vmc_get( $key, $default = '' ) {
    $val = get_theme_mod( $key, $default );
    return $val ?: $default;
}

function vmc_phone_link( $key = 'ft' ) {
    $raw = ( $key === 'ft' )
        ? vmc_get( 'vmc_ft_phone_raw', '8594424420' )
        : vmc_get( 'vmc_ind_phone_raw', '8593562242' );

    return 'tel:' . preg_replace( '/[^0-9]/', '', $raw );
}

function vmc_patient_portal_page_url() {
    $page = get_page_by_path( 'patient-portal-online-booking' );
    return $page ? get_permalink( $page ) : home_url( '/patient-portal-online-booking/' );
}

function vmc_online_pharmacy_page_url() {
    $page = get_page_by_path( 'online-vet-pharmacy-northern-kentucky-cincinnati' );
    return $page ? get_permalink( $page ) : home_url( '/online-vet-pharmacy-northern-kentucky-cincinnati/' );
}

function vmc_get_hero_image_url() {
    $attachment_id = get_theme_mod( 'vmc_hero_image' );
    if ( $attachment_id ) {
        $img = wp_get_attachment_image_src( $attachment_id, 'vmc-hero' );
        if ( $img ) {
            return esc_url( $img[0] );
        }
    }

    return get_template_directory_uri() . '/assets/images/hero-placeholder.jpg';
}

function vmc_get_quote_bg_url() {
    $attachment_id = get_theme_mod( 'vmc_quote_bg' );
    if ( $attachment_id ) {
        $img = wp_get_attachment_image_src( $attachment_id, 'vmc-hero' );
        if ( $img ) {
            return esc_url( $img[0] );
        }
    }

    return '';
}

// Star rating helper
function vmc_stars( $rating = 5 ) {
    $out = '';
    for ( $i = 1; $i <= 5; $i++ ) {
        $out .= $i <= $rating ? '★' : '☆';
    }
    return $out;
}

/* ─────────────────────────────────────────
   AJAX: Newsletter signup
───────────────────────────────────────── */
function vmc_newsletter_signup() {
    check_ajax_referer( 'vmc_nonce', 'nonce' );

    $email = sanitize_email( $_POST['email'] ?? '' );
    if ( ! is_email( $email ) ) {
        wp_send_json_error( [ 'message' => 'Please enter a valid email address.' ] );
    }

    // Store in options as simple list (replace with Mailchimp/etc in production)
    $list = get_option( 'vmc_newsletter_list', [] );
    if ( ! in_array( $email, $list, true ) ) {
        $list[] = $email;
        update_option( 'vmc_newsletter_list', $list );
    }

    wp_send_json_success( [ 'message' => 'Subscribed! Thank you.' ] );
}
add_action( 'wp_ajax_vmc_newsletter', 'vmc_newsletter_signup' );
add_action( 'wp_ajax_nopriv_vmc_newsletter', 'vmc_newsletter_signup' );

/* ─────────────────────────────────────────
   AJAX: Appointment request
───────────────────────────────────────── */
function vmc_appointment_request() {
    check_ajax_referer( 'vmc_nonce', 'nonce' );

    $name  = sanitize_text_field( $_POST['name'] ?? '' );
    $phone = sanitize_text_field( $_POST['phone'] ?? '' );
    $email = sanitize_email( $_POST['email'] ?? '' );
    $pet   = sanitize_text_field( $_POST['pet_name'] ?? '' );
    $notes = sanitize_textarea_field( $_POST['notes'] ?? '' );

    if ( ! $name || ! $phone ) {
        wp_send_json_error( [ 'message' => 'Please fill in required fields.' ] );
    }

    // Save as a post for tracking
    wp_insert_post( [
        'post_title'   => 'Appointment: ' . $name . ' – ' . $pet,
        'post_content' => "Phone: $phone\nEmail: $email\nNotes: $notes",
        'post_status'  => 'private',
        'post_type'    => 'vmc_appointment',
        'meta_input'   => $_POST,
    ] );

    // Email notification
    $admin_email = get_option( 'admin_email' );
    $subject     = 'New Appointment Request: ' . $name;
    $body        = "Name: $name\nPhone: $phone\nEmail: $email\nPet: $pet\nNotes: $notes";
    wp_mail( $admin_email, $subject, $body );

    wp_send_json_success( [ 'message' => 'Request sent! We\'ll follow up within one business day.' ] );
}
add_action( 'wp_ajax_vmc_appointment', 'vmc_appointment_request' );
add_action( 'wp_ajax_nopriv_vmc_appointment', 'vmc_appointment_request' );

// Register appointment CPT (private, admin only)
function vmc_register_appointment_cpt() {
    register_post_type( 'vmc_appointment', [
        'labels'        => [ 'name' => 'Appointments', 'singular_name' => 'Appointment' ],
        'public'        => false,
        'show_ui'       => true,
        'show_in_menu'  => true,
        'menu_icon'     => 'dashicons-calendar-alt',
        'supports'      => [ 'title', 'editor' ],
        'menu_position' => 9,
    ] );
}
add_action( 'init', 'vmc_register_appointment_cpt' );

/* ─────────────────────────────────────────
   TITLE TAG
───────────────────────────────────────── */
function vmc_wp_title( $title ) {
    if ( defined( 'RANK_MATH_VERSION' ) ) {
        return $title;
    }

    if ( is_home() || is_front_page() ) {
        return get_bloginfo( 'name' ) . ' – ' . get_bloginfo( 'description' );
    }

    if ( is_page_template( 'template-vet-fort-thomas-ky.php' ) ) {
        return 'Vet in Fort Thomas KY | 5 Trusted Reasons Local Families Choose VMC';
    }

    if ( is_page_template( 'template-vet-independence-ky.php' ) ) {
        return 'Vet in Independence KY | Trusted Local Care Without the Corporate Feel';
    }

    if ( is_page_template( 'template-vet-cincinnati.php' ) ) {
        return 'Vet Near Cincinnati | 7 Smart Reasons Pet Owners Choose VMC in NKY';
    }

    return $title . ' | ' . get_bloginfo( 'name' );
}
add_filter( 'pre_get_document_title', 'vmc_wp_title' );

/* ─────────────────────────────────────────
   EXCERPT
───────────────────────────────────────── */
function vmc_excerpt_length() {
    return 25;
}
add_filter( 'excerpt_length', 'vmc_excerpt_length' );

/* ─────────────────────────────────────────
   CF7 → DOMPDF PDF GENERATION
───────────────────────────────────────── */

function vmc_val( $data, $key ) {
    if ( ! isset( $data[ $key ] ) ) {
        return '';
    }

    if ( is_array( $data[ $key ] ) ) {
        return esc_html( implode( ', ', $data[ $key ] ) );
    }

    return esc_html( $data[ $key ] );
}

function vmc_image_base64( $file_path ) {
    if ( ! file_exists( $file_path ) ) {
        return '';
    }

    $file_type = wp_check_filetype( $file_path );
    $mime      = ! empty( $file_type['type'] ) ? $file_type['type'] : 'image/jpeg';
    $contents  = file_get_contents( $file_path );

    if ( false === $contents ) {
        return '';
    }

    return 'data:' . $mime . ';base64,' . base64_encode( $contents );
}

add_action( 'wpcf7_before_send_mail', 'vmc_generate_cf7_pdf', 10, 1 );

function vmc_generate_cf7_pdf( $contact_form ) {
    if ( ! class_exists( 'WPCF7_Submission' ) ) {
        return;
    }

    $submission = WPCF7_Submission::get_instance();
    if ( ! $submission ) {
        return;
    }

    $data = $submission->get_posted_data();

    $dompdf_path = get_stylesheet_directory() . '/dompdf/autoload.inc.php';
    if ( ! file_exists( $dompdf_path ) ) {
        return;
    }

    require_once $dompdf_path;

    if ( ! class_exists( '\Dompdf\Dompdf' ) ) {
        return;
    }

    $logo_path = get_template_directory() . '/assets/images/VMC Social Media.jpg';
    $logo      = vmc_image_base64( $logo_path );

    $signature = 'Submitted electronically';
    if ( ! empty( $data['uacf7_signature-394'] ) ) {
        $signature_url = esc_url_raw( $data['uacf7_signature-394'] );
        $signature     = '<img src="' . $signature_url . '" style="max-width:220px; max-height:90px; border:1px solid #ddd; margin-top:6px;">';
    }

    $html = '
    <style>
    body {
      font-family: DejaVu Sans, Arial, sans-serif;
      font-size: 11px;
      color: #2F2A26;
      margin: 0;
      background: #f8f3ec;
    }

    .header {
      background: #f8f3ec;
      padding: 20px 30px;
      border-bottom: 1px solid #e6dfd7;
    }

    .logo {
      height: 50px;
      width: auto;
    }

    .container {
      background: #ffffff;
      margin: 20px 30px;
      padding: 24px 28px;
      border-radius: 6px;
    }

    .footer {
      background: #f8f3ec;
      padding: 14px 30px;
      font-size: 10px;
      color: #6a625b;
      border-top: 1px solid #e6dfd7;
    }

    h1 {
      font-size: 20px;
      margin: 0 0 6px 0;
    }

    h2 {
      font-size: 13px;
      margin: 18px 0 6px;
      border-bottom: 1px solid #e6dfd7;
      padding-bottom: 4px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }

    td {
      padding: 6px;
      border-bottom: 1px solid #eee7de;
      vertical-align: top;
    }

    .label {
      width: 34%;
      font-weight: bold;
      color: #6a625b;
    }

    .small {
      font-size: 10px;
      color: #6a625b;
      margin: 0 0 12px 0;
    }
    </style>

    <div class="header">'
        . ( $logo ? '<img src="' . $logo . '" class="logo" alt="VMC Logo">' : '' ) .
    '</div>

    <div class="container">
      <h1>New Patient Registration</h1>
      <p class="small">Submitted on ' . date_i18n( 'm/d/Y g:i A' ) . '</p>

      <h2>Owner Information</h2>
      <table>
        <tr><td class="label">Name</td><td>' . vmc_val( $data, 'owner_first_name' ) . ' ' . vmc_val( $data, 'owner_last_name' ) . '</td></tr>
        <tr><td class="label">Phone</td><td>' . vmc_val( $data, 'owner_phone' ) . ' / ' . vmc_val( $data, 'alt_phone' ) . '</td></tr>
        <tr><td class="label">Email</td><td>' . vmc_val( $data, 'owner_email' ) . '</td></tr>
        <tr><td class="label">Address</td><td>' . vmc_val( $data, 'address_street' ) . ', ' . vmc_val( $data, 'address_city' ) . ', ' . vmc_val( $data, 'address_state' ) . ' ' . vmc_val( $data, 'address_zip' ) . '</td></tr>
      </table>

      <h2>Pet Information</h2>
      <table>
        <tr><td class="label">Name</td><td>' . vmc_val( $data, 'pet_name' ) . '</td></tr>
        <tr><td class="label">Details</td><td>' . vmc_val( $data, 'pet_species' ) . ' / ' . vmc_val( $data, 'pet_gender' ) . ' / ' . vmc_val( $data, 'pet_breed' ) . '</td></tr>
        <tr><td class="label">Color</td><td>' . vmc_val( $data, 'pet_color' ) . '</td></tr>
        <tr><td class="label">DOB</td><td>' . vmc_val( $data, 'pet_dob' ) . '</td></tr>
      </table>

      <h2>Medical</h2>
      <table>
        <tr><td class="label">Vaccination History</td><td>' . nl2br( vmc_val( $data, 'vaccination_history' ) ) . '</td></tr>
        <tr><td class="label">Referral</td><td>' . vmc_val( $data, 'referral_source' ) . '</td></tr>
      </table>

      <h2>Authorization</h2>
      <table>
        <tr><td class="label">Date</td><td>' . vmc_val( $data, 'form_date' ) . '</td></tr>
        <tr><td class="label">Signature</td><td>' . $signature . '</td></tr>
      </table>
    </div>

    <div class="footer">
      Veterinary Medical Center · Fort Thomas & Independence, KY
    </div>
    ';

    $options = new \Dompdf\Options();
    $options->set( 'isRemoteEnabled', true );

    $dompdf = new \Dompdf\Dompdf( $options );
    $dompdf->loadHtml( $html );
    $dompdf->setPaper( 'A4', 'portrait' );
    $dompdf->render();

    $upload_dir = wp_upload_dir();

    if ( ! empty( $upload_dir['error'] ) ) {
        return;
    }

    $filename  = 'vmc-registration-' . time() . '.pdf';
    $file_path = trailingslashit( $upload_dir['path'] ) . $filename;

    $saved = file_put_contents( $file_path, $dompdf->output() );

    if ( false === $saved || ! file_exists( $file_path ) ) {
        return;
    }

    add_filter( 'wpcf7_mail_components', function( $components ) use ( $file_path ) {
        if ( empty( $components['attachments'] ) ) {
            $components['attachments'] = [];
        } elseif ( ! is_array( $components['attachments'] ) ) {
            $components['attachments'] = [ $components['attachments'] ];
        }

        $components['attachments'][] = $file_path;
        return $components;
    } );
}
