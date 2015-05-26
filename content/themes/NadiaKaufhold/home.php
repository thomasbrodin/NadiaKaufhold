<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package 	WordPress
 * @subpackage 	Timber
 * @since 		Timber 0.1
 */

	$context = Timber::get_context();

	$args = array('post_type' => array('post'), 'numberposts' => -1);

	$context['posts'] = Timber::get_posts($args);
	$context['journal'] = 'follow';

	Timber::render('home.twig', $context);


