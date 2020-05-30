const { app } = require('electron');
const fs = require('fs');

const homePath = app.getPath("home");
const devPath = `${homePath}/.devbrowser`;

const configFile = `${devPath}/config.json`;

if(!fs.existsSync(devPath)){
    fs.mkdirSync(devPath);
    if(!fs.existsSync(configFile)){
        fs.writeFileSync(configFile, "{}");
    }
}

var data = {}

function loadConfig(){
    let text = fs.readFileSync(configFile, { encoding: 'utf8' }).toString();
    let configJson = JSON.parse(text);
    data = configJson;
}

function saveConfig(){
    let configText = JSON.stringify(data, null, 4);
    fs.writeFileSync(configFile, configText, { encoding: 'utf8' });

}

loadConfig();

module.exports = {
    load: loadConfig,
    save: saveConfig,
    data
}
