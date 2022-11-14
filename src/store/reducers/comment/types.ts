export interface CommentState {
    commentsIsLoading: boolean,
    currentCommentsTree: CommentItem[],
    commentError: string
}


export interface CommentItem {
    id: number
    parent: number
    text: string,
    by: string,
    time: number,
    deleted?: boolean,
    kids?: number[]
}

export enum CommentActionEnum {
    SET_CURRENT_COMMENT_TREE = 'SET_CURRENT_COMMENT_TREE',
    UPDATE_CURRENT_COMMENT_TREE = 'UPDATE_CURRENT_COMMENT_TREE',
    SET_COMMENTS_IS_LOADING = 'SET_COMMENTS_IS_LOADING',
    SET_COMMENT_ERROR = 'SET_COMMENT_ERROR'
}

export interface SetCurrentCommentTreeAction {
    type: CommentActionEnum.SET_CURRENT_COMMENT_TREE;
    payload: {};
}

export interface UpdateCurrentCommentTreeAction {
    type: CommentActionEnum.UPDATE_CURRENT_COMMENT_TREE,
    parentIds: []
    payload: {}
}

export interface SetCommentsIsLoadingAction {
    type: CommentActionEnum.SET_COMMENTS_IS_LOADING;
    payload: boolean;
}

export interface SetCommentErrorAction {
    type: CommentActionEnum.SET_COMMENT_ERROR;
    payload: string;
}

export type CommentAction =
    SetCurrentCommentTreeAction |
    UpdateCurrentCommentTreeAction |
    SetCommentsIsLoadingAction |
    SetCommentErrorAction