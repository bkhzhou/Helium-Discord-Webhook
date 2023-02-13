# Helium Discord Webhook
Helium (HNT) Discord webhook bot that monitors new witnesses and rewards

## Install
- Discord.js

```sh
$ npm install discord.js
```

## Update File
- Discord webhook URL, replace with your own discord webhook url.

```
const webhook = new WebhookClient({ url: 'DISCORD-WEBHOOK-URL' });  //Add discord webhook url.
```

- Helium Hotspot ID, replace with your helium hotspot ID. To retrieve locate your hotspot at `https://app.hotspotty.net/hotspots/`


```
const hotspot = ''  //Add your hotspot ID
```

## Run

```sh
$ node main.js
```

![image](https://user-images.githubusercontent.com/79166987/218474864-c071c6c8-7100-47b3-be32-3bf116c92b66.png)
