<?php
// CORS
enable_cors();

// Global Error Bag
$errorBag = [];

sleep(2);

// simple valiadtion 
foreach (array_reverse($_POST) as $filed => $value) {
	// required rule
	if( empty($value) ) {
		addError($filed, ucwords( str_replace('_', ' ', $filed)) . " is required.");
	}

	// email rule
	if( $filed == 'email' ) {
		if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
			addError($filed, 'Invalid email address');
		}
	}
}

// check we have something in error bag
if( count($errorBag) ) {
	return json_response($errorBag, 422);	
} else {
	return json_response($_POST);
}


/**
 * Die a valid json response
 * 
 * @param $data
 * @param int $status_code
 */
function json_response($data, $status_code = 200) {
	$data = is_string($data) ? [$data] : $data;

	http_response_code($status_code);
	header('Content-Type: application/json');
	die(json_encode($data));
}

/**
 * Simple error bag to simulate Laravel like validation error
 * 
 * @param $filed
 * @param $msg
 */
function addError($field, $msg) {
	// access error bag
	global $errorBag;

	if( isset($errorBag[$field]) ) {
		array_push($errorBag[$field], $msg);
	} else {
		$errorBag[$field] = [$msg];
	}
}

/**
 * Enable CORS support
 * 
 */
function enable_cors() {
	// Allow from any origin
	if (isset($_SERVER['HTTP_ORIGIN'])) {
	    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
	    header('Access-Control-Allow-Credentials: true');
	    header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}

	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

	    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
	        header("Access-Control-Allow-Methods: GET, PUT, PATCH, DELETE, POST, OPTIONS");         

	    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
	        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

	    exit(0);
	}
}