<?php
/**
 * The Template for displaying all single posts
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;
$context['wp_title'] = $post->title();

if (post_password_required($post->ID)){
	Timber::render('single-password.twig', $context);
} else {
	$post_id = get_the_ID();
	$terms = wp_get_post_terms($post_id, 'project_tag' );
	if (!empty($terms)) {
		$terms_slugs = array_map(function($item) {
			                return $item->slug;
			            }, $terms);
		$related_posts = new WP_Query(array(
	        'post_type' => 'project',
	        'posts_per_page' => 3,
	        'post_status' => 'publish',
	        'orderby' => 'menu_order',
			'order'         => 'ASC',
			'suppress_filters' => false,
	        'post__not_in' => array($post_id),
	        'tax_query' => array(
	            array(
	                'taxonomy' => 'project_tag',
	                'field' => 'slug',
	                'terms' => $terms_slugs,
	                'operator' => 'IN'
	            )
	        )
	    ));
	  	$context['related'] = Timber::get_posts($related_posts);
	}

	Timber::render(array('single-' . $post->ID . '.twig', 'single-' . $post->post_type . '.twig', 'single.twig'), $context);
}
