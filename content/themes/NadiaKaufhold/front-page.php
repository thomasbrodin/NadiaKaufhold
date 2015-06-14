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
	$context['post'] = Timber::get_post();
	Timber::render('front-page.twig', $context);
