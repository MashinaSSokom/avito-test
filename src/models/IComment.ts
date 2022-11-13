export interface IComment {
    by: string;
    id: number;
    kids?: [number];
    parent: number;
    text: string;
    time: number;
    type: string;
}

export interface ICommentIdList {
    id: [number]
}
