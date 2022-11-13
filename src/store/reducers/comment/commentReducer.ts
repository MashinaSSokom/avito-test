import {CommentAction, CommentActionEnum, CommentItem, CommentState} from "./types";


const initialState: CommentState = {
    commentsIsLoading: false,
    currentCommentsTree: [] as CommentItem[],
}

export default function commentReducer(state = initialState, action:CommentAction): CommentState {
    switch (action.type) {
        case CommentActionEnum.SET_CURRENT_COMMENT_TREE:
            return <CommentState>{...state, currentCommentsTree: action.payload}
        case CommentActionEnum.UPDATE_CURRENT_COMMENT_TREE: {
            const desiredIndex = []
            const updatedTree = JSON.parse(JSON.stringify(state.currentCommentsTree))
            action.parentIds.forEach(() => {
            })
            return {...state, currentCommentsTree: updatedTree}
        }
        case CommentActionEnum.SET_COMMENTS_IS_LOADING: {
            console.log('Загрузка комментариев!')
            return {...state, commentsIsLoading: action.payload}
        }
        default:
            return state
    }
}