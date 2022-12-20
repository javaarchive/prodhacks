import * as prodExt from './shared.js';

export function main(){
    console.log("Final main loaded. ");
    prodExt.loadNormal().then((_) => {
        if(prodExt.config.time_management && prodExt.config.time_management.stopwatch_tabs){
            console.log("Stopwatch enabling for this tab");
            let stopwatchCounter = 0;
            const stopwatchRefreshRate = 100;
            window["stopwatchSetInterval"] = setInterval(() => {
                if(!document.hasFocus()) return;
                stopwatchCounter += stopwatchRefreshRate;
                let stopwatchTimeStr = new Date(stopwatchCounter).toISOString().substr(11, 8);
                document.title = "[" + stopwatchTimeStr + "]";
            }, stopwatchRefreshRate);
        }
    });
}