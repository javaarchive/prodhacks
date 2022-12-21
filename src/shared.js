export let config = {
    main: {},
    time_management: {},
    misc: {}
};

export const ALL_SECTIONS = ["main","time_management","misc"];

export async function getConfig(section = "main"){
    return (await chrome.storage.local.get(section))[section];
}

export async function getConfigOptions(sections = []){
    let outputConfig = await chrome.storage.local.get(sections);
    return outputConfig;
}

export async function loadConfig(sections = ALL_SECTIONS){
    config = Object.assign(config,await getConfigOptions(sections));
    console.log("Config Loaded: ", config);
}

export async function syncConfigSection(section = "main"){
    await chrome.storage.local.set({[section]: config[section]}); // use section as key
}

export async function syncConfigSections(sections = ALL_SECTIONS){
    let setObj = {};
    for(let section of sections){
        setObj[section] = config[section];
    }
    await chrome.storage.local.set(setObj);
}

export async function loadNormal(){
    await loadConfig();
}

export function emit(ev, data){
    chrome.runtime.sendMessage({event: ev, data});
}

export function on(ev, callback){
    chrome.runtime.onMessage.addListener((msg, sender, respond) => {
        if(msg.event == ev){
            callback(sender, respond, msg.data);
        }
    });
}

async function queryAllDiscord(){
    let discordTabs = [];
    discordTabs = discordTabs.concat((await chrome.tabs.query({url: "https://discord.com/*"})) || []);
    discordTabs = discordTabs.concat((await chrome.tabs.query({url: "https://canary.discord.com/*"})) || []);
    discordTabs = discordTabs.concat((await chrome.tabs.query({url: "https://ptb.discord.com/*"})) || []);
    return discordTabs;
}

/** @type {(import("./interfaces").Macro)[]} */
export const macros = [
    {
        title: "Hide Discord",
        id: "discord.hide",
        action: async () => {
            const tabs = await queryAllDiscord();
            for(let tab of tabs){
                await chrome.tabs.update(tab.id, {
                    muted: true,
                    pinned: true
                })
            }
        }
    },
    {
        title: "Show Discord",
        id: "discord.show",
        action: async () => {
            const tabs = await queryAllDiscord();
            for(let tab of tabs){
                await chrome.tabs.update(tab.id, {
                    muted: false,
                    pinned: false
                })
            }
        }
    },
    {
        title: "Kill Discord",
        id: "discord.kill",
        action: async () => {
            const tabs = await queryAllDiscord();
            for(let tab of tabs){
                await chrome.tabs.remove(tab.id);
            }
        }
    },{
        title: "Focus Discord",
        id: "discord.focus",
        action: async () => {
            const tabs = await queryAllDiscord();
            chrome.tabs.update(tabs[0].id, {
                active: true
            });
        }
    },{
        title: "Toggle Time Management Stopwatch Tabs",
        id: "time_management.toggle_stopwatch_tabs",
        action: async () => {
            config.time_management.stopwatch_tabs = !config.time_management.stopwatch_tabs;
            await syncConfigSection("time_management");
            const message = "Stopwatch Tabs is now " + (config.time_management.stopwatch_tabs ? "Enabled" : "Disabled");
            await chrome.notifications.create("time_mangement_stopwatch_tabs",{
                type: "basic",
                title: "Time Management",
                message: message,
                iconUrl: "/logo128.png"
            });
        }
    },{
        title: "Toggle Bomb Tabs",
        id: "time_management.toggle_bomb_tabs",
        action: async () => {
            config.time_management.bomb_tabs = !config.time_management.bomb_tabs;
            await syncConfigSection("time_management");
            const message = "BOMB Tabs is now " + (config.time_management.bomb_tabs ? "Enabled. You are safe! " : "Disabled. New tabs will autoclose when their timer reaches 0. ");
            await chrome.notifications.create("time_mangement_stopwatch_tabs",{
                type: "basic",
                title: "Bomb Tabs Alert",
                message: message,
                iconUrl: "/logo128.png"
            });
        }
    }
]

console.log("Share library loaded");

setInterval(() => {
    syncConfigSections();
}, 30 * 1000);