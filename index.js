const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const welcomeChannelName = "환영합니다";
const byeChannelName = "잘가요ㅠㅠ";
const welcomeChannelComment = "Ashaonxen Discord방에 오신것을 환영합니다! 공지와 규칙 한번만 읽어주세요!";
const byeChannelComment = "Ashaonxen을 잊지 말아주세요ㅠㅠ";
const adminUserId = 250693463065100298;

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: 'Ashaonxen 봇 v.1.1.2' }, status: 'online' })
  
  let state_list = [
    'Ashaonxen 봇 v.1.1.2',
    '문의는 PLAYER#9642 로'
  ]
  let state_list_index = 1;
  let change_delay = 10000; //이건 초 - 1000이 1초

  function changeState() {
    setTimeout(() => {
      // console.log( '상태 변경 ->', state_list[state_list_index] );
      client.user.setPresence({ game: { name: state_list[state_list_index] }, status: 'online' })
      state_list_index += 1;
      if(state_list_index >= state_list.length) {
        state_list_index = 0;
      }
      changeState()
    }, change_delay);
  }

  changeState();
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "시청자"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '안녕하세요') {
    return message.reply('Ashaonxen 디스코드방에 오신것을 환영합니다!');
  }

  if(message.content == '!봇정보') {
    let embed = new Discord.RichEmbed()
    let img = 'https://postfiles.pstatic.net/MjAyMDA3MjhfMjYz/MDAxNTk1OTQxNTExNzEx.L7PmxCPS8OyHRXR3ApuJoTcW1OXAkfFyEkXTqMkeaGog.hpsnSNltgPtcr43dph0VDSXHYaHGmeKcsagx2rzKCmQg.JPEG.battleground_bloger/KakaoTalk_20200712_234541407.jpg?type=w773';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#FF0000')
    embed.setAuthor('server info of Ashaonxen 봇', img)
    embed.setFooter(`PLAYER`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `1`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Bot Version',   `v.1.1.2`, true);
    embed.addField('탄생일',         `2020.06.29`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `Ashaonxen's Discord`);

    embed.setTimestamp()
    message.channel.send(embed);
  }

  if(message.content == '!크루') {
    let img = 'https://postfiles.pstatic.net/MjAyMDA3MjhfMjYz/MDAxNTk1OTQxNTExNzEx.L7PmxCPS8OyHRXR3ApuJoTcW1OXAkfFyEkXTqMkeaGog.hpsnSNltgPtcr43dph0VDSXHYaHGmeKcsagx2rzKCmQg.JPEG.battleground_bloger/KakaoTalk_20200712_234541407.jpg?type=w773';
    let img2 = 'https://postfiles.pstatic.net/MjAyMDA3MjlfMTE3/MDAxNTk1OTg3OTI4MjM4.BUW6UH-rR415TVO92s4XbgIcUgu31f8HFwcBJR7s15gg.UKaWE8P95zcWGjtZsn4Ef62oJs0kOLu7IoFiWihtWP4g.PNG.battleground_bloger/PLAYER.png?type=w773';
    let embed = new Discord.RichEmbed()
      .setTitle('Ashaonxen Youtube')
      .setURL('https://www.youtube.com/channel/UCTcuqKBwbWD0r0KXOrlaYxA')
      .setAuthor('Ashaonxen', img, 'https://www.youtube.com/channel/UCTcuqKBwbWD0r0KXOrlaYxA')
      .setThumbnail(img)
      .addBlankField()
      .addField('Nightmare Musik (크루멤버)', 'Ashaonxen / 성태 / DRIP TARKO / Eeden')
      .addField('Ashaonxen', 'https://www.youtube.com/channel/UCTcuqKBwbWD0r0KXOrlaYxA')
      .addField('Eeden', 'https://www.youtube.com/channel/UCauyZwTelcO3xAcpbFFHwWA')
      .addField('성태', 'https://www.youtube.com/channel/UCPsNdtbKONGCjwSnEIPhWiw')
      .addField('DRIP TARKO', 'https://www.youtube.com/channel/UCdEVtwqVTVeUJddchMJFKHg')
      .addBlankField()
      .setTimestamp()
      .setFooter('Embed Made by PLAYER', img2)

    message.channel.send(embed)
  } else if(message.content == '!에션첸 help') {
    let helpImg = 'https://postfiles.pstatic.net/MjAyMDA3MjhfMjYz/MDAxNTk1OTQxNTExNzEx.L7PmxCPS8OyHRXR3ApuJoTcW1OXAkfFyEkXTqMkeaGog.hpsnSNltgPtcr43dph0VDSXHYaHGmeKcsagx2rzKCmQg.JPEG.battleground_bloger/KakaoTalk_20200712_234541407.jpg?type=w773';
    let commandList = [
      {name: '!크루', desc: 'Nightmare Musik 크루 List'},
      {name: '!에션첸 invite', desc: '무제한 초대코드 생성'},
      {name: '!에션첸 전체공지', desc: '개인메세지로 전체공지메세지 보내가(관리자 이상 등급만 가능)'},
      {name: '!에션첸 clean', desc: '메세지 삭제(관리자 이상 등급만 가능)'}
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of Ashaonxen 봇', helpImg)
      .setColor('#186de6')
      .setFooter(`Ashaonxen BOT`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  } else if(message.content == '!에션첸 invite') {
    if(message.channel.type == 'dm') {
      return message.reply('개인메세지에서 사용할 수 없는 명령어 입니다.');
    }
    message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
      .then(invite => {
        message.channel.send(invite.url)
      })
      .catch((err) => {
        if(err.code == 50013) {
          message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
        }
      })
  } else if(message.content.startsWith('!에션첸 전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!에션첸 전체공지'.length);
      let embed = new Discord.RichEmbed()
        .setAuthor('공지 of Ashaoxen Bot')
        .setColor('#186de6')
        .setFooter(`ASHAONXEN BOT`)
        .setTimestamp()
  
      embed.addField('공지: ', contents);
  
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(embed)
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  } else if(message.content.startsWith('!에션첸 clean')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

    var clearLine = message.content.slice('!에션첸 clean '.length);
    var isNum = !isNaN(clearLine)

    if(isNum && (clearLine <= 0 || 100 < clearLine)) {
      message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
      return;
    } else if(!isNum) { // c @나긋해 3
      if(message.content.split('<@').length == 2) {
        if(isNaN(message.content.split(' ')[2])) return;

        var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
        var count = parseInt(message.content.split(' ')[2])+1;
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
          collected.every(msg => {
            if(msg.author.id == user) {
              msg.delete();
              ++_cnt;
            }
            return !(_cnt == count);
          });
        });
      }
    } else {
      message.channel.bulkDelete(parseInt(clearLine)+1)
        .then(() => {
          AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
        })
        .catch(console.error)
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 사용하기 위해서는 관리자권한이 필요합니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
  let msg = await message.channel.send(str);

  setTimeout(() => {
    msg.delete();
  }, delay);
}


client.login(token);