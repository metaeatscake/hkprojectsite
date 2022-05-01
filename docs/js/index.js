//MaterializeCSS: Initialize Components
M.AutoInit();

/**
 * Custom JS Code
 */

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

    if(localStorage.hasOwnProperty("site_theme_body")){
        bodyTag.classList = localStorage["site_theme_body"];
        themeCheckbx.checked = (bodyTag.classList == "dark-bg");
    }

    themeCheckbx.addEventListener("click", function(){
        bodyTag.classList = (themeCheckbx.checked) ? "dark-bg":"light-bg";
        localStorage["site_theme_body"] = bodyTag.classList;
    });

/*
    Preparations for JSON data handling
*/

    let path_gundata = "./js/gundata.json";
    let path_gunmapdesc = "./js/gunmapdesc.json";

    //Reading JSON was more complicated than expected...
    function loadJSON(JSONFilePath, callbackFunc){
        let xhp = new XMLHttpRequest();

        xhp.overrideMimeType("application/json");
        xhp.open("GET", JSONFilePath, true);

        xhp.onreadystatechange = function(){
            if(xhp.readyState == 4 && xhp.status == "200"){
                callbackFunc(xhp.responseText);
            }
        };

        xhp.send(null);
    }

    //Usage:
    /*
        loadJSON(path_var, function(response){
            let jsonvar = JSON.parse(response);

            --manipulate the data--
        });
    */

/*
    List Gun Data
*/

