const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

//const app = new Telegraf('568826477:AAEubq_J8EKl4in5vW1YNDlrvZfULYMtiWM');
const app = new Telegraf('521458898:AAHa72gg-sC-PX_bUAMCtsQAx82A5g1FJbA');

app.start((ctx) => {
  console.log('started:', ctx.from.first_name);
  ctx.reply(`Welcome ${ctx.message.from.first_name} ${ctx.message.from.last_name} to sidea office!`);
  ctx.reply("Kini kantor sidea sudah menjadi smart-office (tahap Alpha). Awasi dan kendalikan kantor melalui bot ini! Coba say 'hi' atau 'hello', atau tanya 'Ada siapa di kantor?'")
  return ctx.reply("gunakan /help untuk bantuan. -cto-")
})

app.hears(['hi','hallo','hello'], ctx => {
  var ansq='Hi '+ctx.message.from.first_name+'!';
  return ctx.reply(ansq);
});

app.hears(['Ada siapa di kantor?', 'absen'], ctx => {
  ctx.reply('Saat ini di kantor ada: eka, sendirian. :(')
});


app.command('absen', (ctx)=>{
  ctx.reply("Saat ini di kantor ada: eka, opik, sugih, aldy")
})

app.command('matikanlampu', (ctx)=>{
  ctx.reply("Ciap. Lampu sudah dimatikan, bosq")
})
app.command('nyalakanlampu', (ctx)=>{
  ctx.reply("Siap. Sudah caang, bosq")
})

app.command('aktifkanalarm', (ctx)=>{
  ctx.reply("Sismod sudah aktif, bosq")
})
app.command('matikanalarm', (ctx)=>{
  ctx.reply("alarm sismod dimatikan, bosq")
})




app.command('help', (ctx) => {
  return ctx.reply('<b>HELP:</b> Sidea SmartOffice kita memiliki fitur yang dapat anda gunakan. <i>Silahkan pilih bosqu!</i>', Extra.HTML().markup((m) =>
      m.inlineKeyboard([
      m.callbackButton('Absensi', 'absen'),
      m.callbackButton('Lampu', 'lampu'),
      m.callbackButton('Alarm', 'alarm')
    ])))
})


app.command('lampu', (ctx) => {
  return ctx.reply("/matikanlampu atau /nyalakanlampu, bosq?")
})

app.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})


app.on('text', ctx => {
  console.log(ctx.message.text);
  return ctx.message.text;
});

app.catch((err) => {
  console.log('Ooops', err)
})

app.action(/.+/, (ctx) => {
console.log(ctx.callbackQuery);
  switch(ctx.callbackQuery.data) {
	case 'absen': ctx.reply("Saat ini di kantor ada: eka, opik, sugih, aldy");ctx.reply("firly dalam perjalanan");break;
	case 'lampu': ctx.reply("/matikanlampu atau /nyalakanlampu, bosq?");break;
	case 'alarm': ctx.reply("/aktifkanalarm atau /matikanalarm, bosq?");break;
	default: ctx.reply("hmm..");
}


  return ctx.answerCbQuery()
})

app.startPolling();