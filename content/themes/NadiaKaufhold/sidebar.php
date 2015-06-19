<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$context['sidebar'] = Timber::get_widgets('blog-sidebar');
Timber::render(array('sidebar.twig'), $data);
