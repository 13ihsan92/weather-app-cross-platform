export interface UpdateState {
    status: StateIdle | StateLoading | StateSuccess | StateError
};

export interface StateIdle {
    type: 'idle',
    mappedApiData: null,
    errorMessage: null
};

export interface StateLoading {
    type: 'loading',
    mappedApiData: null,
    errorMessage: null
};

export interface StateSuccess {
    type: 'success',
    mappedApiData: ParsedWeatherData[],
    errorMessage: null
};

export interface StateError {
    type: 'error',
    mappedApiData: null,
    errorMessage: string
};

export interface ParsedWeatherData {
    time: string,
    temp: number,
    unitTemp: string
};

// proteksi interface type guard function
export function isSuccessState(state: UpdateState): state is { status: StateSuccess } {
    return state.status.type === 'success';
};

export function isErrorState(state: UpdateState): state is { status: StateError } {
    return state.status.type === 'error';
};

