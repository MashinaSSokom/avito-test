import React, {FC, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Content} from "antd/es/layout/layout";
import {Button, Card, Col, Comment, Layout, Row, Tree} from "antd";
import {calcDate} from "../store/utils/calcDate";
import Kid from "../components/Kid";
import ReactDOM from "react-dom/client";
import {createMarkup} from "../store/utils/createMarkup";


const Story: FC = () => {
    const [renderForParentIds, setRenderForParentIds] = useState([] as number[])
    const history = useHistory()
    const {currentStory} = useTypedSelector(state => state.storyReducer)
    const {currentCommentsTree, commentsIsLoading} = useTypedSelector(state => state.commentReducer)
    const {fetchRootComments, setCurrentCommentTree} = useActions()
    useEffect(() => {
        if (currentStory.kids) {
            fetchRootComments(currentStory.kids)
        } else {
            setCurrentCommentTree([])
        }
    }, [])

    const fetchComments = () => {
        if (currentStory.kids) {
            fetchRootComments(currentStory.kids)
        }
    }
    return (
        <Layout style={{
            height: 'calc(100vh + 100%)',
            minHeight: '100vh'
        }}>
            <Content style={{
                padding: '0 50px',
                height: 'calc(100% - 64px)'
            }}>
                <Button onClick={() => history.goBack()}
                        style={{
                            marginBottom: '20px',
                            fontSize: '12px'
                        }}
                >
                    Назад
                </Button>
                <Row>
                    <Col span={24}>
                        <Card>
                            <p className={'story-card__title'}> Название: {currentStory.title} </p>
                            <p className={'story-card__by'}>Автор: {currentStory.by}</p>
                            <p className={'story-card__score'}>Рейтинг: {currentStory.score}</p>
                            <p className={'story-card__score'}>Ссылка на оригинал: <a href={currentStory.url}
                                                                                      target={'_blank'}>Перейти</a></p>
                            <p className={'story-card__score'}>Дата публикации: {calcDate(currentStory.time)}</p>
                            <p className={'story-card__descendants'}>Комментарии: {currentStory.descendants}</p>
                        </Card>
                    </Col>
                    <Col span={24}>
                        {currentCommentsTree && currentStory.kids && !commentsIsLoading &&
                            <Button
                                style={{marginTop: '20px'}}
                                onClick={() => fetchComments()}>
                                Обновить комментарии
                            </Button>}
                        {
                            (!commentsIsLoading &&
                                currentCommentsTree.map(comment =>
                                    <Comment content={<div dangerouslySetInnerHTML={createMarkup(comment.text)}/>}
                                             datetime={<span>{calcDate(comment.time)}</span>}
                                             author={comment.by}
                                             key={comment.id}>
                                        {
                                            comment.kids &&
                                            ((
                                                    !renderForParentIds.includes(comment.id) &&

                                                    <Button
                                                        onClick={() => setRenderForParentIds([...renderForParentIds, comment.id])}>
                                                        Подгрузить комментарии
                                                    </Button>
                                                )
                                                ||
                                                (
                                                    comment.kids.map(kidId =>
                                                        <Kid key={kidId}
                                                             commentId={kidId}
                                                        />
                                                    )
                                                ))
                                        }
                                    </Comment>
                                )
                            ) ||
                            <p style={{marginTop: '20px'}}> Комментарии загружаются...</p>
                        }
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default Story;
