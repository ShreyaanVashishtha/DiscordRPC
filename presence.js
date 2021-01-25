import RPC from 'discord-rpc';
import chalk from 'chalk';
import fs from 'fs';
import os from 'os';

const client = new RPC.Client({ transport: 'ipc' })

const dir = `${os.userInfo().homedir}/${process.platform === 'win32' ? '/AppData/Roaming' : '/.config'}`;
const rawdata = fs.readFileSync(`${dir}/drg-options.json`);
const options = JSON.parse(rawdata);

//console.log(options);

let activity = {};
let assets = {};

if (options['largeimage'] !== "") {
	assets.large_image = options['largeimage'];
	assets.large_text = "Made with ThatOneCalculator's Discord RPC Generator!";
}
if (options['smallimage'] !== "") {
	assets.small_image = options['smallimage'];
	assets.small_text = "https://github.com/ThatOneCalculator/DiscordRPCGenerator"
}
if (assets !== {}) { activity.assets = assets; }
if (options['description'] !== "") { activity.details = options['description']; }
if (options['state'] !== "") { activity.state = options['state']; }
if (options['buttons'].length !== 0) { activity.buttons = options['buttons']; }

client.on('ready', () => {
    client.request('SET_ACTIVITY', {
        pid: process.pid,
        activity: activity
      })
    console.log(chalk`{bold.green Your Rich Presence has started!} Generated by {blue.underline https://github.com/ThatOneCalculator/DiscordRPCGenerator}.`)
})

client.login({clientId: options['clientid']})
