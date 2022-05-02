//MaterializeCSS: Initialize Components
M.AutoInit();

/**
 * Custom JS Code
 * 
 * In This File: Forcing Client-Side to do Server-Side processing.
 */

//A wrapper for all of the code to hide the functions and objects from console
//Somewhat redundant since the entire JS code can still be opened and edited from *another* console tab.
document.addEventListener("DOMContentLoaded", function(_ev){
    main();
});

function main(){

    let nav = document.querySelector("#main-navlist");
    let sitemap = document.querySelector("#footer-sitemap");
    let navMob = document.querySelector("#mobile-sidenav");
    let anchor_classList = "grey-text text-lighten-3";

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

    initAnchors(mainSiteLinks, nav, anchor_classList);
    initAnchors(mainSiteLinks, sitemap, anchor_classList);
    initAnchors(drawerSiteLinks, navMob);

    //Themes
    initTheme();

    if(document.getElementById("main_guns")){initGunList();}
}

function initAnchors(_dataSet, _targetElement, _classList = null){

    for(const item of _dataSet){
        let li = document.createElement("li");
        let anchor = document.createElement("a");

        if(item.isDivider){
            li.classList = "divider";
            _targetElement.appendChild(li);
            continue;
        }

        if(_classList){
            anchor.classList = _classList;
        }

        anchor.href = item.link;
        anchor.innerHTML = item.desc;
        li.appendChild(anchor);

        _targetElement.appendChild(li);
    }
}

function getThemeMap(){
    return {
        "body":{
            "dark":"white-text grey darken-2",
            "light":"black-text grey lighten-2"
        },
        "cards":{
            "dark":"card grey darken-4",
            "light":"card grey lighten-4"
        }
    };
}

function initTheme(){
        //Body theme
    let themeCheckbx = document.querySelector("#site_darkmodetoggle");
   
    initTheme_body(themeCheckbx, getThemeMap());

    if(document.getElementById("main_guns")){

        let cardList = Array.from( document.querySelectorAll(".card"));

        if(localStorage.hasOwnProperty("site_theme_cards")){
            initTheme_cards(cardList, getThemeMap(), 
                localStorage["site_theme_cards"] == getThemeMap().cards.dark);
        }

        themeCheckbx.addEventListener("click", function(){
            initTheme_cards(cardList, getThemeMap(), themeCheckbx.checked);
        });
    }
}

    function initTheme_body(_switchElem, _themeMap){
        
        let bodyTag = document.querySelector("body");
        
        //may be open for abuse, will add a ternary check.
        if(localStorage.hasOwnProperty("site_theme_body")){
            bodyTag.classList = (localStorage["site_theme_body"] == _themeMap.body.dark) ?
                _themeMap.body.dark:_themeMap.body.light;
            _switchElem.checked = (bodyTag.classList == _themeMap.body.dark);
        }

        _switchElem.addEventListener("click", function(){

            const themes = getThemeMap();
            bodyTag.classList = (_switchElem.checked) ? 
                themes.body.dark:themes.body.light;
            localStorage["site_theme_body"] = bodyTag.classList;
        });

    }

    function initTheme_cards(_cardList, _themeMap, _useDarkMode){

        const chosenTheme = (_useDarkMode) ?
            _themeMap.cards.dark : _themeMap.cards.light;

        _cardList.forEach(function(node, _idx){
            node.classList = chosenTheme;

        });

        localStorage["site_theme_cards"] = chosenTheme;
    }

function initGunList(){

    let cardList = Array.from( document.querySelectorAll(".card"));
    let targetModal = document.querySelector("#gunListModal");
    let modalTable = targetModal.querySelector(".modal-content").querySelector("table");
    let path_gundata = "./js/gundata.json";

    loadJSON(path_gundata, function(response){
        let JSONdata = JSON.parse(response);

        cardList.forEach(function(node, _idx){

            const gunName = node.outerText.split("\n")[0];
            node.querySelector(".stat-trigger").addEventListener("click", function(_ev){
                
                const tblcaption = "Showing Gun Stats for: ";
                const gunStats = findRowByField(JSONdata, "name", gunName);
                modalTable.querySelector("caption").innerHTML = tblcaption + gunStats.name;

                modalTable.querySelector("thead").replaceChildren(
                    (function(){
                        let tabrow = document.createElement("tr");

                        let header1 = document.createElement("th");
                        header1.textContent = "Field";
                        let header2 = document.createElement("th");
                        header2.textContent = "Value";

                        tabrow.appendChild(header1);
                        tabrow.appendChild(header2);

                        return tabrow;
                    })()
                );

                let rows = modalTable.querySelector("tbody");

                while(rows.firstChild)
                    rows.removeChild(rows.firstChild);

                for(const x in gunStats){
                    modalTable.querySelector("tbody").appendChild(
                        (function(){
                            let tabrow = document.createElement("tr");

                            let cell1 = document.createElement("td");
                            cell1.textContent = x;
                            let cell2 = document.createElement("td");
                            cell2.textContent = gunStats[x];

                            tabrow.appendChild(cell1);
                            tabrow.appendChild(cell2);

                            return tabrow;
                        })()
                    );
                }
                
            });
        });
        
    });
}

function findRowByField(json_arr, target_key, value){
    for(const x of json_arr)
        if(x[target_key] == value)
            return x;
}

function loadJSON(_src, _callbackFunc){
    let xhp = new XMLHttpRequest();

    xhp.overrideMimeType("application/json");
    xhp.open("GET", _src, true);

    xhp.onreadystatechange = function(){
        if(xhp.readyState == 4 && xhp.status == "200"){
            _callbackFunc(xhp.responseText);
        }
    };

    xhp.send(null);
}

