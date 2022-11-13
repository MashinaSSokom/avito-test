import {CommentAction, CommentActionEnum, CommentItem, CommentState} from "./types";


const initialState: CommentState = {
    commentsIsLoading: false,
    currentCommentsTree: [] as CommentItem[],
}

export default function commentReducer(state = initialState, action:CommentAction): CommentState {
    switch (action.type) {
        case CommentActionEnum.SET_CURRENT_COMMENT_TREE:
            return <CommentState>{...state, currentCommentsTree: action.payload}
        case CommentActionEnum.SET_COMMENTS_IS_LOADING:
            return {...state, commentsIsLoading: action.payload}
        default:
            return state
    }
}