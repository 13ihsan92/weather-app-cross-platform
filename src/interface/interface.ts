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

export interface getWeatherData {
    res: Response,
    resData: any | R,
    hourlyTime: string[],
    hourlyTemp: number[],
    hourlyUnitTemp: string,
    mappedData: ParsedWeatherData[],
};

export interface WeatherDataPooler {
    fetchApiData(urlApi: URL): Promise<void>;
    parseApiData(): void;
    getMappedApiData(): ParsedWeatherData[] | null;
};