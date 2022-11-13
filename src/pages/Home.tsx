import React, {FC, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {Button, Card, Col, Row} from "antd";
import {Content} from "antd/es/layout/layout";
import {useHistory} from "react-router-dom";

const Home: FC = () => {
    const history = useHistory()
    const {fetchStories} = useActions()
    const {stories, isLoading} = useTypedSelector(state => state.storyReducer)

    useEffect(() => {
        console.log('Первый рендер!')
        if (isLoading === false) {
            fetchStories()
        }
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Интервальное обновление!')
            // console.log('Сравнение', isLoading === false)
            if (isLoading === false) {
                fetchStories()
            }
        }, 60000)
        return () => clearInterval(interval)
    }, [fetchStories])

    const fetch = () => {
        fetchStories()
    }

    const calcDate = (unixTime: number) => {
        console.log(unixTime)
        return new Date(unixTime*1000).toLocaleString('ru-RU')
    }

    return (
        <Content style={{padding: '0 50px'}}>
            <div className={'stories'}>
                <Button onClick={fetch}
                        style={{marginBottom: '20px',
                                fontSize: '12px'
                        }}
                        disabled={isLoading}
                >
                    {isLoading ? `Обновление...` : `Обновить истории`}
                </Button>
                {stories.length > 0 &&
                    <Row>
                        {stories.map(story =>
                            <Col key={story.id} span={24}>
                                <Card className={'story-card'}>
                                    <p className={'story-card__title'}
                                       onClick={() => history.push(`/story/${story.id}`)}
                                    >
                                        Название: <span> {story.title} </span></p>
                                    <p className={'story-card__by'}>Автор: {story.by}</p>
                                    <p className={'story-card__descendants'}>Комментариев: {story.descendants}</p>
                                    <p className={'story-card__score'}>Рейтинг: {story.score}</p>
                                    <p className={'story-card__score'}>Дата публикации: {calcDate(story.time)}</p>
                                </Card>
                            </Col>
                        )}
                    </Row>
                }
            </div>
        </Content>
    );
};

export default Home;