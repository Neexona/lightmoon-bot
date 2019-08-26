const { Client, RichEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let servIcon = message.guild.iconURL;
  let servEmbed = new RichEmbed()
    .setDescription("Informations sur le bot")
    .setColor("#dc143c")
    .setThumbnail(servIcon)
    .addField("Nom du serveur", message.guild.name)
    .addField("Nombre total de membre", message.guild.memberCount)
    .addField("Créer le", message.guild.createdAt)
    .addField("Vous avez rejoint le", message.member.joinedAt)

  return message.channel.send(servEmbed);
};

module.exports.help = {
  name: "infoserv"
};