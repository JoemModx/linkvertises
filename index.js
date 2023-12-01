const { Client, Intents, MessageEmbed } = require('discord.js@13.16.0');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const token = "BOT TOKEN"

client.once('ready', () => {
  console.log(`bot running as: ${client.user.tag}!`);
  client.user.setActivity('@whoisvax on github.')
  client.api.applications(client.user.id).commands.post({
    data: {
      name: 'linkvertise',
      description: 'Bypasses Linkvertise Links.',
      options: [
        {
          name: 'url',
          description: 'The URL to bypass.',
          type: 3,
          required: true,
        },
      ],
    },
  });
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand() && interaction.commandName === 'linkvertise') {
    const url = interaction.options.getString('url');
    if (!url) {
    await interaction.reply('Please provide a URL.');
      return;
    }
    const data = await (await fetch(`https://bypass.pm/bypass2?url=${encodeURIComponent(url)}`)).json();
    if (data.success === false) {
      const fail = new MessageEmbed()
       .setTitle('**FAILED | 🚫**')
       .setColor('FF0000')
       .addField('Error:', data.msg, true)
       .setTimestamp()
       .setFooter('by @whoisvax')
    await interaction.reply({ embeds: [fail] })
    return;
    }
    try {
    const success = new MessageEmbed()
       .setTitle('**SUCCESS | ✅**')
       .setColor('66ff00')
       .addField('Error:',  data.destination, true)
       .setTimestamp()
       .setFooter('by @whoisvax')
    await interaction.reply({ embeds: [success] })
    return;
    } catch (error) {
    await interaction.reply(`Error: ${error.message}`);
    return;
    }
  }
});

client.login(token)
