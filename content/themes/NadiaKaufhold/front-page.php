<?php
/**
 * The template for Front Page
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package 	WordPress
 * @subpackage 	Timber
 * @since 		Timber 0.1
 */

	if (!class_exists('Timber')){
		echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
	}
	$context = Timber::get_context();
	$args = array(
		'post_type' => array('photography', 'creative-direction'),
		'numberposts' => -1,
		'post_status' => 'publish',
        'orderby' => 'menu_order',
		'order'         => 'ASC',
		'suppress_filters' => false,
		'tax_query' => array(
            array(
                'taxonomy' => 'tb_tag',
                'field' => 'slug',
                'terms' => 'featured',
                'operator' => 'IN'
            )
        )
	);
	$context['posts'] = Timber::get_posts($args);

	Timber::render('front-page.twig', $context);
