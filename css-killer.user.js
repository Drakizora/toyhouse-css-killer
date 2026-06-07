// ==UserScript==
// @name         toyhouse css killer
// @version      1.0.0
// @description  turn off toyhouse css
// @author       Drakizora
// @match        https://toyhou.se/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=toyhou.se
// @downloadURL  https://raw.githubusercontent.com/Drakizora/toyhouse-css-killer/refs/heads/main/css-killer.user.js
// @updateURL    https://raw.githubusercontent.com/Drakizora/toyhouse-css-killer/refs/heads/main/css-killer.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    initializeList();
    var cssOn = true;
    var buttonType = "btn-warning";
    var buttonAction = "off"
    var buttonText = "Press this button to turn off CSS.";
    var buttonCreated = false;
    var cssButton = document.createElement('div');
    var values;


    waitForKeyElements(".page-body", function(jNode) {
        values = getId();
        if (values.id == -1) { return; }
        var disableCSS = checkCSS(values);
        if (disableCSS) {
            clicking();
        }

        // Creating button to control CSS
        cssButton.innerHTML = `<a id = "turnOffCSSButton" class="btn ${buttonType} tooltipster"`
            + `title="${buttonText}">`
            + '<span class="far fa-file-css mr-0"></span></a>';
        cssButton.setAttribute('class', 'navbar-notifications mx-1');

        // Adding button to page
        waitForKeyElements(".navbar-nav", createButton, true);

    });



    // Inserts the button into the page
    function createButton() {
        const navbar = document.getElementsByClassName("navbar-nav navbar-right")[0];
        navbar.insertBefore(cssButton, navbar.firstElementChild);
        // Linking button to do something when clicked
        const button = document.getElementById("turnOffCSSButton");
        button.addEventListener (
            "click", clicking, false
        );
        buttonCreated = true;
    }

    // Updates button display text
    function refreshText() {
        buttonText = `Press this button to turn ${buttonAction} CSS.`;
    }

    // Actions that happen when button is clicked
    function clicking(buttonCreated) {
        cssOn = !cssOn;

        if (cssOn) {
            buttonType = "btn-warning";
            buttonAction = "off";

        } else {
            buttonType = "btn-success";
            buttonAction = "on";

        }
        refreshText();

        const cssSheets = document.querySelectorAll('style');

        // Turn off (or on) CSS
        cssSheets.forEach((css) => {
            css.disabled = !css.disabled;
        });

        if (buttonCreated) {
            updateList(values, !cssOn);

            const button = document.getElementById("turnOffCSSButton");
            button.className = `btn ${buttonType} tooltipster`;
            button.setAttribute("title", buttonText);
            button.setAttribute("data-original-title", buttonText);
        }

    }

    // Returns the page type and its unique identifier
    function getId() {
        const page = document.getElementsByClassName("page-body")[0].className.split("-");
        const type = page[page.length-1];

        if (type == "character" || type == "group") {
            var uri = document.head.baseURI.split(".");
            uri = uri[uri.length-2].split("/");
            const id = uri[uri.length-1];

            return { "type" : type, "id" : id };

        } else {

            try {
                const report = document.getElementsByClassName("sidebar-li-report")[0].firstElementChild.pathname.split("/");
                const values = report.slice(report.length - 2);

                return { "type" : values[0], "id" : values[1] };
            } catch {
                // id could not be found
                return { "type" : "N/A", "id" : -1 };
            }
        }

    }

    // Returns if the specified user/character/world is on the list for CSS to be turned off
    function checkCSS(values) {
        var type = values.type;
        var id = values.id;
        var cssList = GM_getValue([type]);
        return cssList.includes(id);
    }

    // Update the list to include or remove an id
    function updateList(values, addToList) {
        var type = values.type;
        var id = values.id;
        var cssList = GM_getValue([type]);
        var index = cssList.indexOf(id);

        if (addToList) {
            cssList.push(id);
        } else {
            cssList.splice(index, 1);
        }

        GM_setValue(type, cssList);

    }

    // Creates the CSS lists
    function initializeList() {
        const keys = GM_listValues();

        if (!keys.includes("user")) {
            GM_setValue("user", []);
        }

        if (!keys.includes("character")) {
            GM_setValue("character", []);
        }

        if (!keys.includes("group")) {
            GM_setValue("group", []);
        }
    }


})();
