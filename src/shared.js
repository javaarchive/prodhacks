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
    console.log("Config loaded: ", config);
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

console.log("Share library loaded");