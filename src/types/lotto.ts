export interface LottoApiResponse {
    data: LottoData;
}

export interface LottoData {
    status: string;
    response: Response;
}


export interface Response {
    date: string;
    endpoint: string;
    prizes: Prizes[];
    runningNumbers: RunningNumbers[];
}

export interface Prizes {
    id: "prizeFirst" | "prizeFirstNear" | "prizeSecond" | "prizeThird" | "prizeForth" | "prizeFifth";
    name: string;
    reward: string;
    amount: number;
    number: string[];
}

export interface RunningNumbers {
    id: "runningNumberFrontThree" | "runningNumberBackThree" | "runningNumberBackTwo";
    name: string;
    reward: string;
    amount: number;
    number: string[];
}