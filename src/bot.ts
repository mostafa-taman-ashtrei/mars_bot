import { Context, Telegraf } from 'telegraf';

import { WeatherData } from './interfaces/weatherData';
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
    await ctx.telegram.sendMessage(ctx.chat!.id, 'There you go');
    await ctx.telegram.sendMessage(ctx.chat!.id, `
        On ${data[data.length - 1].date} && sol ${data[data.length - 1].sol} 
        highTemp => ${data[data.length - 1].maxTemp} 
        lowTemp => ${data[data.length - 1].minTemp}
        windSpeed => ${data[data.length - 1].windSpeed}
        windDirection => ${data[data.length - 1].windDirectionCardinal}
        windDirectionPoints => ${data[data.length - 1].windDirectionDegrees} 
    `);
});

bot.command('mars_weather_all', async (ctx: Context) => {
    const res = await getWeather();
    await ctx.telegram.sendMessage(ctx.chat!.id, `There you go Data from ${res[0].date} to ${res[res.length - 1].date}`);

    res.map(async (
        {
            sol,
            maxTemp,
            minTemp,
            windDirectionDegrees,
            windDirectionCardinal,
            windSpeed,
            date,
        }: WeatherData,
    ) => {
        await ctx.telegram.sendMessage(ctx.chat!.id, `
            On ${date} && sol ${sol} 
            highTemp => ${maxTemp} 
            lowTemp => ${minTemp}
            windSpeed => ${windSpeed}
            windDirection => ${windDirectionCardinal}
            windDirectionPoints => ${windDirectionDegrees} 
        `);
    });
});

bot.launch();
