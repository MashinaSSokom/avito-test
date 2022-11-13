export interface IStory {
    id: number;
    type: string;
    by: string;
    time: number;
    score: number;
    descendants: number;
    title: string;
    url: string;
}

export interface IStoryIdList {
    id: [number]
}
