import {
    CommentActionEnum,
    SetCommentErrorAction,
    SetCommentsIsLoadingAction,
    SetCurrentCommentTreeAction
} from "./types";
import {AppDispatch} from "../../index";
import {IComment} from "../../../models/IComment";

import axios from "axios";


export const CommentActionCreators = {
    setCurrentCommentTree: (payload: object): SetCurrentCommentTreeAction => ({
        type: CommentActionEnum.SET_CURRENT_COMMENT_TREE,
        payload: payload
    }),
    setIsLoading: (payload: boolean): SetCommentsIsLoadingAction => ({
        type: CommentActionEnum.SET_COMMENTS_IS_LOADING,
        payload: payload
    }),
    setCommentError: (payload: string): SetCommentErrorAction => ({
        type: CommentActionEnum.SET_COMMENT_ERROR,
        payload: payload
    }),
    fetchRootComments: (ids: number[]) => async (dispatch: AppDispatch) => {
        try {
            dispatch(CommentActionCreators.setIsLoading(true))
            const rootCommentTree = []
            for (const id of ids) {
                const res = await axios.get<IComment>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                const comment = res.data
                rootCommentTree.push({
                    id: comment.id,
                    text: comment.text,
                    parent: comment.parent,
                    by: comment.by,
                    time: comment.time,
                    deleted: comment.deleted,
                    kids: comment.kids
                })
            }
            dispatch(CommentActionCreators.setCurrentCommentTree(rootCommentTree))
            dispatch(CommentActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(CommentActionCreators.setCommentError(`Произошла ошибка: ${e}`))
        }
    },
    // fetchComment: (id: number) => async (dispatch: AppDispatch) => {
    //     try {
    //         const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}

