import * as prodExt from './shared.js';

chrome.omnibox.onInputEntered.addListener((text) => {
  if(text.startsWith("prod:")){
     let id = text.slice(5);
     prodExt.macros.find(m => m.id === id).action();
     return;
  }
  const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});

chrome.omnibox.onInputChanged.addListener((text, doSuggest) => {
  const foundMacros = prodExt.macros.filter((macro) => {
    return macro.title.toLowerCase().includes(text.toLowerCase());
  });
  console.log("Found macros", foundMacros);
  let suggestions = foundMacros.map((macro) => {
    return {
      content: "prod:" + macro.id,
      description: macro.title,
      deletable: false
    }
  });
  console.log(suggestions);
  doSuggest(suggestions);
});

prodExt.loadNormal().then(_ => {
  prodExt.on("closetab", (sender, respond, data) => {
    chrome.tabs.remove(sender.tab.id);
  });

  prodExt.on("bomb_ignite", (sender, respond, data) => {
    chrome.tabs.remove(sender.tab.id);
  });
});