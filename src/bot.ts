import { Context, Telegraf } from 'telegraf';

const bot = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN!);

bot.use(async (_, next): Promise<void> => {
    const start = new Date();
    await next();
    const ms: number = new Date().valueOf() - start.valueOf();
    console.log('Response time: %sms', ms);
});

bot.start((ctx: Context) => { ctx.reply(`Welcome to neobot, ${ctx.message!.from.first_name}`); });

bot.launch();
