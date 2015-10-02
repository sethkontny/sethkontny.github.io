<?php
session_start();
require_once("twitteroauth.php"); //Path to twitteroauth library
 
$twitteruser = "envato";
$notweets = 50;
$consumerkey = "K7VxRF0nleOY3B9YRjFww";
$consumersecret = "xrt1GWcWAG1BmR7JguxZxrzgdrnJZ4Ug3YkfLDRTNqs";
$accesstoken = "633123766-ivOQw2ht6cSbPBuFEGOIZhfHMYRlvhkZ1T9DN7e2";
$accesstokensecret = "i6gtEdvjNBEgzHoeOkBAtycKpBBJXJYRlU7Fq5k7VKI";

 
function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
  return $connection;
}
  
$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);
 
$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);
 
echo json_encode($tweets);
?>