import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  REST,
  Routes,
  Client,
  GatewayIntentBits
} from 'discord.js'

import express from 'express'
import config from './config.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers
  ]
})

/* ================= WEB SERVER FOR RENDER ================= */

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send("Support Voice Pro Running")
})

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`)
})

/* ================= DISCORD BOT ================= */

client.once('ready', async () => {

  console.log("Support Voice Pro Ready")

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

  console.log("Slash command registered")
})

client.on('interactionCreate', async interaction => {

  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'sendpanel') {

    // 🔒 شرط رتبة السبورت
    if (!interaction.member.roles.cache.has(process.env.SUPPORT_ROLE_ID))
      return interaction.reply({
        content: "هذا الأمر مخصص لرتبة السبورت فقط",
        ephemeral: true
      })

    const embed = new EmbedBuilder()
      .setTitle("🎧 Support Control Panel")
      .setDescription("استخدم الأزرار للتحكم بحالتك")
      .setColor(0x00ff88)

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('login')
        .setLabel('Login')
        .setStyle(ButtonStyle.Success),

      new ButtonBuilder()
        .setCustomId('logout')
        .setLabel('Logout')
        .setStyle(ButtonStyle.Danger)
    )

    await interaction.channel.send({ embeds: [embed], components: [row] })
    await interaction.reply({ content: "تم إرسال البنل", ephemeral: true })
  }
})

client.login(config.token)
