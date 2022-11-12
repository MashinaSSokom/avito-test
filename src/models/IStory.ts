export interface IStory {
    id: Number;
    type: String;
    by: String;
    time: Number;
    score: Number;
    descendants: Number;
    title: String;
    url: String;
}

export interface IStoryIdList {
    id: [number]
}
