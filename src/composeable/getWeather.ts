import { WeatherData, ParsedWeatherData } from "@/interface/interface"; //import interface
import { readonly, Ref, ref } from "vue";

export const weatherData:Ref<WeatherData> = ref({
    urlApi: new URL('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m'),
    dataApi: null,
    mappedApiData: null 
});

export async function getWeatherData() {
    try {
        weatherData.value.dataApi = await fetch(weatherData.value.urlApi);
        const res:Response = weatherData.value.dataApi;

        if (!res.ok) {
            throw new Error("API Is Unreacheable");
        } else {
            const resData:any = await res.json();
            // debugging
            //console.info(resData);
            
            // define const/var untuk parsing
            const hourlyTime:string[] = resData.hourly.time;
            const hourlyTemp:number[] = resData.hourly.temperature_2m;
            const hourlyUnitTemp:string = resData.hourly_units.temperature_2m;

            const mappedData:ParsedWeatherData[] = hourlyTime.map((timeString:string, index:number) => {
                return {
                    time:timeString,
                    temp:hourlyTemp[index],
                    unitTemp:hourlyUnitTemp
                };
            });
            weatherData.value.mappedApiData = mappedData; //storing value
            //debugging
            //console.info(weatherData.value.mappedApiData);
            return readonly(weatherData.value.mappedApiData);
        };
    } catch (error) {
        console.error("Application Uknown Error");
    };
};
