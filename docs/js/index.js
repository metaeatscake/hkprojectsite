//MaterializeCSS: Initialize Components
M.AutoInit();

/**
 * Custom JS Code
 * 
 * In This File: Forcing Client-Side to do Server-Side processing.
 */

//A wrapper for all of the code to hide the functions and objects from console
//Somewhat redundant since the entire JS code can still be opened and edited from *another* console tab.
document.addEventListener("DOMContentLoaded", function(ev){

    main();

});

function main(){
    /*
        NAVBAR/Footer LINKS
    */
    let mainSiteLinks = [
        {
            "link":"./index.html",
            "desc":"Home"
        },
        {
            "link":"./guns.html",
            "desc":"Guns"
        },
        {
            "link":"./gunmap.html",
            "desc":"Gun Map"
        },
        {
            "link":"./contact.html",
            "desc":"Contact"
        }
    ];

    let nav = document.querySelector("#main-navlist");
    let sitemap = document.querySelector("#footer-sitemap");

    //Initialize main-navlist & footer
    for(const item of mainSiteLinks){
        let li = document.createElement("li");
        let anchor = document.createElement("a");

        anchor.href = item.link;
        anchor.innerHTML = item.desc;
        anchor.classList = "grey-text text-lighten-3";
        li.appendChild(anchor);

        nav.appendChild(li);
    }
    for(const item of mainSiteLinks){
        let li = document.createElement("li");
        let anchor = document.createElement("a");

        anchor.href = item.link;
        anchor.innerHTML = item.desc;
        anchor.classList = "grey-text text-lighten-3";
        li.appendChild(anchor);

        sitemap.appendChild(li);
    }

    let drawerSiteLinks = [
        {
            "isDivider":false,
            "link": mainSiteLinks[0].link,
            "desc": mainSiteLinks[0].desc
        },
        {
            "isDivider":true
        },
        {
            "isDivider":false,
            "link": mainSiteLinks[1].link,
            "desc": mainSiteLinks[1].desc
        },
        {
            "isDivider":false,
            "link": mainSiteLinks[2].link,
            "desc": mainSiteLinks[2].desc
        },
        {
            "isDividier":false,
            "link": mainSiteLinks[3].link,
            "desc": mainSiteLinks[3].desc
        }
    ];

    let navMob = document.querySelector("#mobile-sidenav");

    //Initialize mobile mode navbar drawer
    for(const item of drawerSiteLinks){
        let li = document.createElement("li");
        let anchor = document.createElement("a");

        if(item.isDivider){
            li.classList = "divider";
            navMob.appendChild(li);
            continue;
        }

        anchor.href = item.link;
        anchor.innerHTML = item.desc;
        li.appendChild(anchor);

        navMob.appendChild(li);
    }

    /*
    Website Theme
    */

    //Body theme
    let themeCheckbx = document.querySelector("#site_darkmodetoggle");
    let bodyTag = document.querySelector("body");

    let bodyTheme_light = "black-text grey lighten-2";
    let bodyTheme_dark = "white-text grey darken-2";

    let useDark = (bodyTag.classList == bodyTheme_dark);

    //may be open for abuse, will add a ternary check.
    if(localStorage.hasOwnProperty("site_theme_body")){
        bodyTag.classList = (localStorage["site_theme_body"] == bodyTheme_dark) ?
            bodyTheme_dark:bodyTheme_light;
        themeCheckbx.checked = (bodyTag.classList == bodyTheme_dark);
    }

    themeCheckbx.addEventListener("click", function(){
        useDark = themeCheckbx.checked;
        bodyTag.classList = (useDark) ? bodyTheme_dark:bodyTheme_light;
        localStorage["site_theme_body"] = bodyTag.classList;
    });

    /*
    Preparations for JSON data handling
    */

    let path_gundata = "./js/gundata.json";
    let path_gunmapdesc = "./js/gunmapdesc.json";

    let path_list = {
        "gundata":path_gundata,
        "gunmapdesc":path_gunmapdesc
    };

    //Reading JSON was more complicated than expected...
    function loadJSON(path_list_key, callbackFunc){
        let xhp = new XMLHttpRequest();

        xhp.overrideMimeType("application/json");
        xhp.open("GET", path_list[path_list_key], true);

        xhp.onreadystatechange = function(){
            if(xhp.readyState == 4 && xhp.status == "200"){
                callbackFunc(xhp.responseText);
            }
        };

        xhp.send(null);
    }

    function findRowByField(json_arr, target_key, value){
        for(const x of json_arr)
            if(x[target_key] == value)
                return x;
    }

    //Usage:
    /*
        loadJSON(path_var, function(response){
            let jsonvar = JSON.parse(response);

            --manipulate the data--
        });
    */

    /*
    GunList related JS
    */

    let gunMain = document.getElementById("main_guns");
    if(gunMain){

        let cardList = Array.from( document.querySelectorAll(".card"));
        let themes = {
            "dark":"card grey darken-4",
            "light":"card grey lighten-4"
        };

        function setCardTheme(useDarkBool){

            cardList.forEach(function(node, _idx){
                
                let chosenTheme = (useDarkBool) ?
                    themes.dark : themes.light;
                
                node.classList = chosenTheme;
            });

            localStorage["site_theme_cards"] = (useDarkBool) ? 
                themes.dark : themes.light;
        }

        if(localStorage.hasOwnProperty("site_theme_cards")){
            setCardTheme(themeCheckbx.checked);
        }

        themeCheckbx.addEventListener("click", function(){
            setCardTheme(themeCheckbx.checked);
        });

        loadJSON("gundata", function(response){
            let JSONdata = JSON.parse(response);

            cardList.forEach(function(node, _idx){
                node.querySelector(".stat-trigger").addEventListener("click", function(_ev){
                    console.log("Card name: "+node.outerText.split("\n")[0]);
                    console.log("Object: ");
                    console.log(findRowByField(JSONdata, "name", node.outerText.split("\n")[0]));
                });
            });
        });

    }
}

//function initAnchors(_dataSet, _targetElement, _classList = null, _hasDivider = null)