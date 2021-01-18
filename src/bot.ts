import { Context, Telegraf } from 'telegraf';
import getWeather from './utils/getMarsWeather';

const bot = new Telegraf<Context>(process.env.TELEGRAM_BOT_TOKEN!);

bot.use(async (_, next): Promise<void> => {
    const start = new Date();
    await next();
    const ms: number = new Date().valueOf() - start.valueOf();
    console.log('Response time: %sms', ms);
});

bot.start((ctx: Context) => { ctx.reply(`Welcome to neobot, ${ctx.message!.from.first_name}`); });

bot.command('mars_weather_latest', async (ctx: Context) => {
    const data = await getWeather();
    ctx.telegram.sendMessage(ctx.chat!.id, 'There you go');
    ctx.telegram.sendMessage(ctx.chat!.id, `
        On ${data[data.length - 1].date} && sol ${data[data.length - 1].sol} 
        highTemp => ${data[data.length - 1].maxTemp} 
        lowTemp => ${data[data.length - 1].maxTemp}
        windSpeed => ${data[data.length - 1].windSpeed}
        windDirection => ${data[data.length - 1].windDirectionCardinal}
        windDirectionPoints => ${data[data.length - 1].windDirectionDegrees} 
    `);
});

bot.launch();
