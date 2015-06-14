<?php
/*
Plugin Name: HEX Custom Post Types
Description: Custom Post Types for HEX websites.
Author: Thomas Brodin
Author URI: http://www.hexcreativenetwork.com
*/


add_action( 'init', 'hex_cpt' );
add_action( 'init', 'portfolio_taxonomies' );  
add_action( 'init','maybe_rewrite_rules' );

function hex_cpt() {
  $labels  = array(
            'name' => 'Projects',
            'singular_name' => 'Projects',
            'add_new' => __( 'Add New' ),
            'add_new_item' => __( 'Add New' ),
            );
  $args = array(
        'labels' => $labels,
        'description' => 'Nadia Kaufhold Projects Portfolio',
        'menu_icon'=> 'dashicons-portfolio',
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_nav_menus' => true,
        'show_in_admin_bar' => true,
        'menu_position' => 0,
        'has_archive' => true,
        'supports' => array( 'title', 'editor', 'thumbnail', 'revisions',),
        'rewrite' => array( 'slug' => 'projects'),
      );
  register_post_type( 'project', $args); 
}

function portfolio_taxonomies() {  
  register_taxonomy(  
    'project_category',  
    'project',
      array( 
          'hierarchical' => true,  
          'label' => 'Project category', 
          'show_admin_column' => true, 
          'query_var' => true,  
          'rewrite' => array('slug' => 'project-cat')  
      )  
    ); 
  register_taxonomy(  
    'project_tag',  
    'project',
      array( 
          'hierarchical' => false,  
          'label' => 'Project tag', 
          'show_admin_column' => true, 
          'query_var' => true,  
          'rewrite' => array('slug' => 'project-tag')  
      )  
    ); 
   function maybe_rewrite_rules() {
     
      $ver = filemtime( __FILE__ ); // Get the file time for this file as the version number
      $defaults = array( 'version' => 0, 'time' => time() );
      $r = wp_parse_args( get_option( __CLASS__ . '_flush', array() ), $defaults );
     
      if ( $r['version'] != $ver || $r['time'] + 172800 < time() ) { // Flush if ver changes or if 48hrs has passed.
        flush_rewrite_rules();
        // trace( 'flushed' );
        $args = array( 'version' => $ver, 'time' => time() );
        if ( ! update_option( __CLASS__ . '_flush', $args ) )
          add_option( __CLASS__ . '_flush', $args );
      }
     
    }
}