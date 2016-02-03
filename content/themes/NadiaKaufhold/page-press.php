<?php
/*
 * Template Name: Press Page
 *
 */


$context = Timber::get_context();
$post = new TimberPost();
$context['post'] = $post;

Timber::render(array('page-press.twig'), $context);
