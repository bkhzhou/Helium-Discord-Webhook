const { WebhookClient, EmbedBuilder } = require('discord.js');
const webhook = new WebhookClient({ url: 'DISCORD-WEBHOOK-URL' });  //Add discord webhook url.

const hotspot = ''  //Add your hotspot ID
const api = `https://etl.hotspotty.org/api/v1/hotspot/activities/${hotspot}/?page=0`

let currentWitness = [];
let currentReward = [];

setInterval( async() => {
    var exist = false;
    fetch(api)
    .then(async (response) => {
        const res = await response.json()
        const witness = res.data.witnesses[0]
        const witnessHash = witness['hash']
        if(currentWitness.length == 0) {
            sendWebhookWitness(res);
        } else {
            if(currentWitness.includes(witnessHash)) {
                exist = true;
            } else {
                sendWebhookWitness(res);
            }
        }

        const reward = res.data.rewards['0']  //100000000
        const rewardHash = reward['hash']
        if(currentReward.length == 0) {
            sendWebhookReward(res);
        } else {
            if(currentReward.includes(rewardHash)) {
                exist = true;
            } else {
                sendWebhookReward(res);
            }
        }

        //Clean Array
        if(currentWitness.length === 5) {
            currentWitness.shift();
        }

        if(currentReward.length === 5) {
            currentReward.shift();
        }
    })
}, 30000);  //Can change higher delay

function sendWebhookWitness(res) {
    currentWitness.push(res.data.witnesses[0]['hash'])
    const witness = res.data.witnesses[0]
    console.log(res.data.witnesses)
    console.log(witness)
    const witnessBeaconer = witness['beaconer']
    const witnessChallenger = witness['challenger']
    const witnessBlock = witness['block'].toString()
    const witnessHash = witness['hash']
    const witnessTime = witness['time'].toString()
    const witnessValidation = witness['valid']
    const embed =  new EmbedBuilder()
        .setTitle('New Helium Witness')
        .setColor(0x62C0F3)
        .addFields(
            { name: 'Witness Hash', value: witnessHash},
            { name: 'Witness Beaconer', value: witnessBeaconer},
            { name: 'Witness Challenger', value: witnessChallenger},
            { name: 'Witness Block', value: witnessBlock},
            { name: 'Witness Time', value: witnessTime},
            { name: 'Witness Time', value: '<t:'+witnessTime+':f>'}
        )
    webhook.send({ embeds: [embed] });
}

function sendWebhookReward(res) {
    currentReward.push(res.data.rewards[0]['hash'])
    const reward = res.data.rewards[0]
    var rewardAmount = reward['amount']/100000000
    const rewardTime = reward['time'].toString()
    const rewardBlock = reward['block'].toString()
    const rewardHash = reward['hash']
    const embed =  new EmbedBuilder()
        .setTitle('New Helium Reward')
        .setColor(0x77EC7F)
        .addFields(
            { name: 'Reward Hash', value: rewardHash},
            { name: 'Reward Amount', value: rewardAmount.toString()},
            { name: 'Reward Block', value: rewardBlock},
            { name: 'Reward Time', value: rewardTime},
            { name: 'Reward Time', value: '<t:'+rewardTime+':f>'}
        )
    webhook.send({ embeds: [embed] });
}