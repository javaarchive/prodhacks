import * as prodExt from './shared.js';

export function main(){
    console.log("Final main loaded. ");
    prodExt.loadNormal().then((_) => {
        if(prodExt.config.time_management && prodExt.config.time_management.stopwatch_tabs){
            console.log("Stopwatch enabling for this tab");
            let stopwatchStart = Date.now();
            const stopwatchRefreshInterval = 100;
            window.stopwatchSetInterval = setInterval(() => {
                let stopwatchTime = new Date().getTime() - stopwatchStart;
                let stopwatchTimeStr = new Date(stopwatchTime).toISOString().substr(11, 8);
                document.title = stopwatchTimeStr;
            });
        }
    });
}