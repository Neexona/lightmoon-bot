const { Client, RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let kickedUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!kickedUser) return message.channel.send("L'utilisateur n'existe pas !");
  let kickedReason = args.join(" ").slice(22);

  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Vous n'avez pas les permissions.");

  if (kickedUser.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("Vous ne pouvez pas kick cette personne.");

  let kickEmbed = new RichEmbed()
    .setDescription("Kicks")
    .setColor("#dc143c")
    .addField("Joueur kické", `${kickedUser} (ID: ${kickedUser.id})`)
    .addField(
      "Joueur ayant kické",
      `${message.author} (ID: ${message.author.id})`
    )
    .addField("Channel", message.channel)
    .addField("Raison", kickedReason);

  let kickChannel = message.guild.channels.find(`name`, "reports");
  if (!kickChannel)
    return message.channel.send(
      "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
    );

  message.delete();
  message.guild.member(kickedUser).kick(kickedReason);
  kickChannel.send(kickEmbed);
};

module.exports.help = {
  name: "kick"
};