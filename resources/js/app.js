/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Header');
require('./components/Home');
require('./components/Footer');
require('./components/About');
require('./components/About2');
require('./components/ScriptModify');

/* Start the Router which will manage which components to render */
require('./Router');

/* Require interfaces */
require('./interfaces/RequestInterface.js');
require('./interfaces/CookieInterface.js');
require('./interfaces/AuthInterface.js');


