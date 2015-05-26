<?php
// ===================================================
// Load database info and local development parameters
// ===================================================
if ( file_exists( dirname( __FILE__ ) . '/local-config.php' ) ) {
	define( 'WP_LOCAL_DEV', true );
	include( dirname( __FILE__ ) . '/local-config.php' );
} else {
	define( 'WP_LOCAL_DEV', false );
	define('DB_NAME', '');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
	define('DB_HOST', '');
	$table_prefix  = 'wp_gtkcr3_';
	define( 'SAVEQUERIES', false );
	define( 'WP_DEBUG', false );
}
// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

define( 'WP_PLUGIN_DIR', dirname(__FILE__) . '/content/plugins' );
define( 'WP_PLUGIN_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content/plugins' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==============================================================
// Salts, for security
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==============================================================
define('AUTH_KEY',         'N8[Kn*)8BVG7nNm[Bw-_O)4>fJ%#9t<=~*$q9jJ[vznA^wml_`Yc:YyXq:1d$BmW');
define('SECURE_AUTH_KEY',  '>aYYDSPf$Q9pw*=UCcH?T_`^bwkpZKx[ee^`yAvB/w@^KU6>_p[YLHp6OKwZs;?:');
define('LOGGED_IN_KEY',    'sSo/++T|%Ty(-P7I)l}:=s5AzsU^t0]&+w7H6.38@-eMcgP}^0^NfkpQP%uMED!P');
define('NONCE_KEY',        'e5_zx7i;ZdA6DhnqVN^ G+P~5%85NfQ1<op;qV(8l,o/<pkTjys9&E<YJ-[-W+!r');
define('AUTH_SALT',        '9yuJh+|401S-yh@Ht4S$f1LgmtbwX*=tAZmx_y[5E_ud]M}UKP;#xX@hT{:=@Kmz');
define('SECURE_AUTH_SALT', 'b)l(,oY|RXag%gAB}TOt/Q5`q)+8t3c;E_My;$9bW31KU>|ApU7GN6l-YzGtG#}V');
define('LOGGED_IN_SALT',   '=Nb}hwW4Z76593)6eUw$I}=`0t v4m29Hs8Pe^=L2[+LzXrw@H]e#-e@f:N/4yaF');
define('NONCE_SALT',       'zD,$ WDKkI32kjE?sBn:~X%%3+VVmY|-A)]%=:?8uw50s|.p<mqL_qFjobQ}|].B');

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ===========
// Hide errors
// ===========
ini_set( 'display_errors', 0 );
define( 'WP_DEBUG_DISPLAY', true );

// ===================
// Bootstrap WordPress
// ===================
if ( !defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
require_once( ABSPATH . 'wp-settings.php' );