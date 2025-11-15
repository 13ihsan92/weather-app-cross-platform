import { WeatherData, resDataProp } from "@/managementState/initialState"; // import interface
import { ParsedWeatherData } from "@/managementState/updateState";
import { readonly, Ref, ref } from "vue";

export const weatherData:Ref<WeatherData> = ref({
    urlApi: new URL('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m'),
    dataApi: null,
    isUpdate: { 
        status: { 
            type: 'idle',
            mappedApiData: null, 
            errorMessage: null
        }
    }
});

export async function getWeatherData() {
    try {
        weatherData.value.dataApi = await fetch(weatherData.value.urlApi);
        const res = weatherData.value.dataApi;

        if (!res.ok) {
            throw new Error("API Is Unreacheable");
        } else {
            const resData:resDataProp = await res.json();
            // debugging
            //console.info(resData);
            
            // define const/var untuk parsing
            const hourlyTime = resData.hourly.time;
            const hourlyTemp = resData.hourly.temperature_2m;
            const hourlyUnitTemp = resData.hourly_units.temperature_2m;

            // mapping data dengan double interface check dari parsedWeatherData dan resDataProp
            const mappedData:ParsedWeatherData[] = hourlyTime.map((timeString:string, index:number) => {
                return {
                    time:timeString,
                    temp:hourlyTemp[index],
                    unitTemp:hourlyUnitTemp
                };
            });
            // ngestore value ke state success
            // debugging
            // console.info(weatherData.value.mappedApiData);
            weatherData.value.isUpdate.status = {
                type: 'success',
                mappedApiData: mappedData,
                errorMessage: null
            };
            return readonly(weatherData);
        };
    } catch (error) {
        console.error("Application Uknown Error");
        alert(`Application Error: ${(error as Error).message}`);
        weatherData.value.isUpdate.status = {
            type: 'error',
            mappedApiData: null,
            errorMessage: (error as Error).message
        };
    };
};
