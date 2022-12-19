import * as prodExt from './shared.js';

chrome.omnibox.onInputEntered.addListener((text) => {
  const newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
  chrome.tabs.create({ url: newURL });
});