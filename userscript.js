// ==UserScript==
// @name         Territorial.io bot
// @version      0.1
// @description  Trying to create a bot for the game territorial.io
// @author       TechAle
// @match        https://territorial.io/
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @require      https://raw.githubusercontent.com/TechAle/jsInjection/main/inject.js
// @require      https://raw.githubusercontent.com/TechAle/jsInjection/main/injectClassFile.js
// ==/UserScript==

(function() {
    'use strict';


    let nuovoFile = new injectClass({
        file: "https://territorial.io/",
        method: "GET",
        function: "nY",
        pre: () => {
            console.log("ciao")
        }
    });

    let nuovoFile2 = new injectClass({
        file: "https://territorial.io/favicon.ico",
        method: "GET",
        function: "nY",
        pre: () => {
            console.log("ciao")
        }
    });

    let nuovoFile3 = new injectClass({
        file: "https://territorial.io/favicon.ico",
        method: "GET",
        function: "nYY",
        pre: () => {
            console.log("ciao")
        }
    });

    calculateLinks()
    links.forEach(u => {
        setTimeout(
            GM_xmlhttpRequest({
                method: u.method,
                url: u.file,
                onload: res => {
                    console.log(res.finalUrl)
                }
            }), 0
        )
    })



})();