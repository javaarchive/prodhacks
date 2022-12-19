import * as prodExt from './shared.js';

prodExt.loadNormal().then(async _ => {
    prodExt.config.time_management.stopwatch_tabs = true;
    console.log(prodExt.config);
    await prodExt.syncConfigSection("time_management");
    console.log("Testing enabled stopwatch tabs");
});