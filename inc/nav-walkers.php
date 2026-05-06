<?php
/**
 * Navigation Walker Classes
 */

class VMC_Nav_Walker extends Walker_Nav_Menu {
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes  = implode(' ', $item->classes ?? []);
        $is_active= in_array('current-menu-item', $item->classes ?? []);
        $url      = $item->url ?? '#';
        $title    = apply_filters('the_title', $item->title, $item->ID);
        $output  .= '<a href="' . esc_url($url) . '" class="nav-a' . ($is_active ? ' active' : '') . '">' . esc_html($title) . '</a>';
    }
    function end_el( &$output, $item, $depth = 0, $args = null ) {}
    function start_lvl( &$output, $depth = 0, $args = null ) {}
    function end_lvl( &$output, $depth = 0, $args = null ) {}
}

class VMC_Mob_Nav_Walker extends Walker_Nav_Menu {
    function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $url   = $item->url ?? '#';
        $title = apply_filters('the_title', $item->title, $item->ID);
        $arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        $output .= '<a href="' . esc_url($url) . '" class="mob-link" onclick="closeMob()">' . esc_html($title) . $arrow . '</a>';
    }
    function end_el( &$output, $item, $depth = 0, $args = null ) {}
    function start_lvl( &$output, $depth = 0, $args = null ) {}
    function end_lvl( &$output, $depth = 0, $args = null ) {}
}

// Fallback nav functions
function vmc_default_nav() {
    echo '<a href="' . esc_url(home_url('/#why')) . '" class="nav-a">Why VMC</a>';
    echo '<a href="' . esc_url(home_url('/#services')) . '" class="nav-a">Services</a>';
    echo '<a href="' . esc_url(home_url('/#team')) . '" class="nav-a">Our Team</a>';
    echo '<a href="' . esc_url(home_url('/#new-patients')) . '" class="nav-a">New Patients</a>';
    echo '<a href="' . esc_url(home_url('/#reviews')) . '" class="nav-a">Reviews</a>';
    echo '<a href="' . esc_url(home_url('/#contact')) . '" class="nav-a">Locations</a>';
}

function vmc_default_mob_nav() {
    $links = [
        'Why VMC'     => home_url('/#why'),
        'Services'    => home_url('/#services'),
        'Our Team'    => home_url('/#team'),
        'New Patients'=> home_url('/#new-patients'),
        'Reviews'     => home_url('/#reviews'),
        'Locations'   => home_url('/#contact'),
    ];
    $arrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    foreach ($links as $label => $url) {
        echo '<a href="' . esc_url($url) . '" class="mob-link" onclick="closeMob()">' . esc_html($label) . $arrow . '</a>';
    }
}

function vmc_default_footer_nav() {
    $links = [
        'Why VMC'     => home_url('/#why'),
        'Services'    => home_url('/#services'),
        'Our Team'    => home_url('/#team'),
        'New Patients'=> home_url('/#new-patients'),
        'Reviews'     => home_url('/#reviews'),
        'FAQ'         => home_url('/#faq'),
    ];
    echo '<div class="flinks">';
    foreach ($links as $label => $url) {
        echo '<a href="' . esc_url($url) . '">' . esc_html($label) . '</a>';
    }
    echo '</div>';
}
