
import dotenv from 'dotenv'
dotenv.config()

export default {
  token: process.env.TOKEN,
  guildId: process.env.GUILD_ID,
  waitingChannel: process.env.WAITING_CHANNEL_ID,
  supportChannels: process.env.SUPPORT_CHANNELS.split(","),
  panelChannel: process.env.PANEL_CHANNEL_ID,
  helpedChannel: process.env.HELPED_CHANNEL_ID,
  minSessionTime: 60
}
