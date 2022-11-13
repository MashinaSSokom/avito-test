import {IComment} from "../../../models/IComment";
import {CommentAction, CommentActionEnum, CommentItem, CommentState} from "./types";


const initialState: CommentState = {
    isLoading: false,
    currentCommentsTree: [] as CommentItem[],
}

export default function commentReducer(state = initialState, action:CommentAction): CommentState {
    switch (action.type) {
        case CommentActionEnum.SET_CURRENT_COMMENT_TREE:
            return <CommentState>{...state, currentCommentsTree: action.payload}
        default:
            return state
    }
}