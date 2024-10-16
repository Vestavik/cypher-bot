const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let isRunning = false;
let canProcessCommands = true; // Control whether the bot can process commands

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Replace with your actual bot token
const TOKEN = 'MTI5NDgwNTQ4MzkyODE2MjM5NA.GOtzs9.H4jXV6clcdlxLe3TzckWE0axLj-QkKhlVLMz28';

function startBot() {
    if (!isRunning) {
        client.login(TOKEN)
            .then(() => {
                isRunning = true;
                console.log('Bot has started.');
                canProcessCommands = true; // Allow processing commands
            })
            .catch(err => {
                console.error('Error logging in:', err);
            });
    }
}

function stopBot() {
    if (isRunning) {
        console.log('Attempting to stop bot...');
        client.destroy()
            .then(() => {
                isRunning = false;
                canProcessCommands = false; // Prevent processing commands
                console.log('Bot has stopped.');
            })
            .catch(err => {
                console.error('Error logging out:', err);
            });
    } else {
        console.log('Bot is already stopped.');
    }
}


function getStatus() {
    return isRunning;
}

function canProcess() {
    return canProcessCommands;
}


module.exports = { startBot, stopBot, getStatus, canProcess };
