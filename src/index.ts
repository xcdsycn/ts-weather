import commander from 'commander';
import colors from "colors";
import axios, { AxiosResponse } from 'axios';


const command = commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .parse(process.argv);

if (process.argv.slice(2).length === 0) {
    command.outputHelp(colors.red);
    process.exit();
}

interface IWeatherResponse {
    status: string;
    count: string;
    info: string;
    infocode: string;
    lives: ILive[];
}

interface ILive {
    province: string;
    city: string;
    adcode: string;
    weather: string;
    temperature: string;
    winddirection: string;
    windpower: string;
    humidity: string;
    reporttime: string;
}

const URL = "https://restapi.amap.com/v3/weather/weatherInfo";

const KEY = "31de2ee01c6dcb9f1f6df56b6920f7ac";
// const log = console.log;
async function getWeather(city: string) {
    try {
        const url = `${URL}?city=${encodeURI(command.city)}&key=${KEY}`;
        // await 只有与async 一起使用的时候才合法
        const response = await axios.get(url);

        const live = response.data.lives[0];
        // log(colors.yellow(live.reporttime));
        // log(colors.white(`${live.province} ${live.city}`));
        // log(colors.green(`${live.weather} ${live.temperature} 度`));

    } catch (e) {
        // log(colors.red("天气服务出现异常:" + e));
    }
}
getWeather(command.city);