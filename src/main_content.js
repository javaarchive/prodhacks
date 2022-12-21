import * as prodExt from './shared.js';

export function main(){
    console.log("Final main loaded. ");
    prodExt.loadNormal().then((_) => {
        if(prodExt.config.time_management){
            if(prodExt.config.time_management.stopwatch_tabs){
                console.log("Stopwatch enabling for this tab");
                let stopwatchCounter = 0;
                const stopwatchRefreshRate = 100;
                window["stopwatchSetInterval"] = setInterval(() => {
                    if(!document.hasFocus()) return;
                    stopwatchCounter += stopwatchRefreshRate;
                    let stopwatchTimeStr = new Date(stopwatchCounter).toISOString().substr(11, 8);
                    document.title = "[" + stopwatchTimeStr + "]";
                }, stopwatchRefreshRate);
            }else if(prodExt.config.time_management.bomb_tabs){
                // Bomb Tabs
                // you can only use the tab for a specified amount of time
                console.log("Bomb enabling for this tab");
                let bombTime = 10 * 60 * 1000;
                const bombRefreshRate = 25;
                window["bombSetInterval"] = setInterval(() => {
                    if(!document.hasFocus()) return;
                    bombTime -= bombRefreshRate;
                    let bombTimeStr = new Date(bombTime).toISOString().substr(11, 8);
                    if(bombTime > 10 * 1000){
                        document.title = ":( [" + bombTimeStr + "]";
                    }else if(bombTime > 3 * 1000){
                        document.title = "Bomb in " + bombTime/1000 + "s";
                    }else{
                        document.title = "💣 " + bombTime/1000 + "s :(";
                    }
                    if(bombTime < 0){
                        prodExt.emit("bomb_ignite", bombTime);
                    }
                }, bombRefreshRate);
            }
        }
    });
}