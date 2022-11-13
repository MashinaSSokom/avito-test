import {CommentActionEnum, SetCurrentCommentTreeAction} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IComment} from "../../../models/IComment";

export const CommentActionCreators = {
    setCurrentCommentTree: (payload: object): SetCurrentCommentTreeAction => ({
        type: CommentActionEnum.SET_CURRENT_COMMENT_TREE,
        payload: payload
    }),
    fetchRootComments: (ids: number[]) => async (dispatch: AppDispatch) => {
        try {
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
                    kids: comment.kids
                })
            }
            console.log(rootCommentTree)
            dispatch(CommentActionCreators.setCurrentCommentTree(rootCommentTree))
        } catch (e) {
            console.log(e)
        }
    },
    fetchComment: (id: number) => async (dispatch: AppDispatch) => {
        try {
            const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
}

