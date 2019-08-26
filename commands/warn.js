const { Client, RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let warnedUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!warnedUser) return message.channel.send("L'utilisateur n'existe pas !");
  let warnedReason = args.join(" ").slice(22);

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Vous n'avez pas les permissions.");

  if (warnedUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Vous ne pouvez pas kick cette personne.");

  let warnEmbed = new RichEmbed()
    .setDescription("Warn")
    .setColor("#dc143c")
    .addField("Joueur warn", `${warnedUser} (ID: ${warnedUser.id})`)
    .addField(
      "Joueur ayant warn",
      `${message.author} (ID: ${message.author.id})`
    )
    .addField("Raison", warnedReason);

  let warnChannel = message.guild.channels.find(`name`, "reports");
  if (!warnChannel)
    return message.channel.send(
      "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
    );

  message.delete();
  warnChannel.send(warnEmbed);

  let warnRole = message.guild.roles.find(`name`, 'warned');

  if (!warnRole) {
    try {
      warnRole = await message.guild.createRole({
        name: "warned",
        color: "#b30000",
        permissions: []
      });
    } catch (e) {
      console.log(e.stack)
    }
  }

  await warnedUser.addRole(warnRole.id);
  message.channel.send(`<@${warnedUser.id}> à été warn !`);
};

module.exports.help = {
  name: "warn"
};