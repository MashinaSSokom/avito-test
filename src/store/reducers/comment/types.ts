import {IStory} from "../../../models/IStory";

export interface CommentState {
    isLoading: boolean,
    currentCommentsTree: CommentItem[],
}


export interface CommentItem {
    id: number
    parent: number
    text: string,
    by: string,
    time: number,
    kids?: CommentItem[]
}

export enum CommentActionEnum {
    SET_CURRENT_COMMENT_TREE = 'SET_CURRENT_COMMENT_TREE',
}

export interface SetCurrentCommentTreeAction {
    type: CommentActionEnum.SET_CURRENT_COMMENT_TREE;
    payload: {};
}


// export interface SetIsLoadingAction {
//     type: CommentActionEnum.SET_IS_LOADING;
//     payload: boolean;
// }


export type CommentAction =
    SetCurrentCommentTreeAction