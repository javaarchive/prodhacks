// https://stackoverflow.com/questions/48104433/how-to-import-es6-modules-in-content-script-for-chrome-extension
(async () => {
    console.log("Bootstrapping ProdHacks content script :)");
    const src = chrome.runtime.getURL("src/main_content.js");
    const contentMain = await import(src);
    contentMain.main();
})();