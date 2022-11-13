import React, {FC} from 'react';
import {useHistory} from "react-router-dom";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Content} from "antd/es/layout/layout";
import {Button, Card, Col, Row} from "antd";
import {calcDate} from "../store/utils/calcDate";

const Story: FC = () => {
    const history = useHistory()
    const {currentStory} = useTypedSelector(state => state.storyReducer)


    return (
        <div>
            <Content style={{
                padding: '0 50px',
                height: 'calc(100vh - 64px)'
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
                </Row>
            </Content>
        </div>
    );
};

export default Story;



// TODO список комментариев в виде дерева
// Корневые комментарии подгружаются сразу же при входе на страницу, вложенные - по клику на корневой
// На странице должна быть кнопка для принудительного обновления списка комментариев
// На странице должна быть кнопка для возврата к списку новостей
