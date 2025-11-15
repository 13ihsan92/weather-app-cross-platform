import { UpdateState } from "./updateState";

export interface WeatherData {
    urlApi: URL,
    //dataApi?: Response,
    dataApi: Response | null, // pada API disarankan pengunaan null
    // pictureImg?: ImageData // ini dipake cuma untuk hal hal bersifat opsional
    isUpdate: UpdateState
};

export interface resDataProp {
    hourly: {
        time: string[],
        temperature_2m: number[]
    },
    hourly_units: {
        temperature_2m: string,
        time: string
    }
};