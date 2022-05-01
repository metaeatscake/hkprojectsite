//MaterializeCSS: Initialize Components
M.AutoInit();

/**
 * Custom JS Code
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
    }
];

let nav = document.querySelector("#main-navlist");

//Initialize main-navlist
for(const item of mainSiteLinks){
    let li = document.createElement("li");
    let anchor = document.createElement("a");

    anchor.href = item.link;
    anchor.innerHTML = item.desc;
    li.appendChild(anchor);

    nav.appendChild(li);
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
