const TwitchBot = require("twitch-bot")
require("dotenv").config()

const Bot = new TwitchBot({
  username: "Baggio",
  oauth: process.env.oauth,
  channels: ["plup"]
})
let comboCount = 1;
let oldMessage = "";
let oldUser = "";
let emoteArr = ["widepeepoHappy","PantsGrab"]
let emoteIndex = 0;
Bot.on("join", channel => {
  console.log(`Joined channel: ${channel}`)
})

Bot.on("error", err => {
  console.log(err)
})

Bot.on("message", chatter => {
	console.log(
`${chatter.display_name}:
${chatter.message}`
	)
	checkCombo(chatter.message,chatter.display_name);
	oldMessage = chatter.message;
	oldUser = chatter.display_name;
})

function checkCombo(newMessage,newUser){
	newMessage = newMessage.trim();
	if(oldMessage===newMessage&& oldUser!=newUser){
		comboCount++
	}else{
		if(comboCount>2){
			Bot.say(`${comboCount}x ${oldMessage} ${emoteArr[emoteIndex]} Clap`)
			if(emoteIndex === emoteArr.length -1){
				emoteIndex = 0;
			}else{
				emoteIndex++;
			}
		}
		comboCount= 1;
	}
}