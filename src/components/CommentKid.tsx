import React, {FC, useEffect, useState} from 'react';
import {CommentItem} from "../store/reducers/comment/types";
import axios from "axios";
import {IComment} from "../models/IComment";
import {Button, Comment} from "antd";
import {calcDate} from "../store/utils/calcDate";
import {createMarkup} from "../store/utils/createMarkup";

const Kid: FC<{ commentId: number }> = ({commentId}) => {
    const [kidCommentItem, setKidCommentItem] = useState({} as CommentItem)
    const [kidFetched, setKidFetched] = useState(false)
    const [renderForParentIds, setRenderForParentIds] = useState([] as number[])

    useEffect(() => {
        fetchKid(commentId).then(kidItem => setKidCommentItem(kidItem))
    }, [])

    const fetchKid = async (commentId: number) => {
        let commentItem = {} as CommentItem
        await axios.get<IComment>(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`).then(
            (res) => {

                const comment = res.data
                commentItem = {
                    id: comment.id,
                    text: comment.text,
                    parent: comment.parent,
                    by: comment.by,
                    time: comment.time,
                    kids: comment.kids
                }
            }
        )
        setKidFetched(true)
        return commentItem
    }
    return (
        <>
            {kidFetched &&
                <Comment content={<div dangerouslySetInnerHTML={createMarkup(kidCommentItem.text)}/>}
                         datetime={<span>{calcDate(kidCommentItem.time)}</span>}
                         author={kidCommentItem.by}
                         key={kidCommentItem.id}
                >
                    { kidCommentItem.kids &&
                        ((
                             !renderForParentIds.includes(kidCommentItem.id) &&
                            <Button
                                onClick={() => setRenderForParentIds([...renderForParentIds, kidCommentItem.id])}>
                                Подгрузить комментарии
                            </Button>
                        )
                        ||
                        (
                            kidCommentItem.kids.map(kidId =>
                                <Kid key={kidId}
                                     commentId={kidId}
                                />
                            )
                        ))
                    }
                </Comment>
            }
        </>
    )
}


export default Kid;