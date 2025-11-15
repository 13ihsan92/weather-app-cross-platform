export interface WeatherData {
    urlApi: URL,
    //dataApi?: Response,
    dataApi: Response | null, // pada API disarankan pengunaan null
    // pictureImg?: ImageData // ini dipake cuma untuk hal hal bersifat opsional
    mappedApiData: ParsedWeatherData[] | null
};

export interface ParsedWeatherData {
    time: string,
    temp: number,
    unitTemp: string
};