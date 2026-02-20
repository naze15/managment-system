import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  REST,
  Routes
} from 'discord.js'
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
const commands = [
  new SlashCommandBuilder()
    .setName('sendpanel')
    .setDescription('إرسال بنل السبورت')
]

const rest = new REST({ version: '10' }).setToken(config.token)

await rest.put(
  Routes.applicationGuildCommands(client.user.id, config.guildId),
  { body: commands }
)

client.login(config.token)

import express from 'express'
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Support Voice Pro Running")
})

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`)
})
