
import { Client, GatewayIntentBits } from 'discord.js'
import config from './config.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
})

client.once('ready', () => {
  console.log("Support Voice Pro Ready")
})

client.login(config.token)
