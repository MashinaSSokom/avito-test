import {IStory, IStoryIdList} from "../../../models/IStory";
import {AppDispatch, RootState} from "../../index";
import {SetCurrentStoryAction, SetErrorAction, SetIsLoadingAction, SetStoriesAction, StoryActionEnum} from "./types";
import axios from "axios";

export const StoryActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: StoryActionEnum.SET_IS_LOADING, payload: payload}),
    setError: (payload: string): SetErrorAction => ({type: StoryActionEnum.SET_ERROR, payload: payload}),
    setCurrentStory: (payload: IStory): SetCurrentStoryAction => ({type: StoryActionEnum.SET_CURRENT_STORY, payload}),
    setStories: (payload: IStory[]): SetStoriesAction => ({type: StoryActionEnum.SET_STORIES, payload}),
    fetchStories: () => async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            dispatch(StoryActionCreators.setIsLoading(true))
            const storiesInStore = getState().storyReducer.stories
            const lastStoryInStore = getState().storyReducer.stories[0]
            const fetchedStories: IStory[] = []
            const res = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json')
            if (res.data) {
                if (lastStoryInStore) {
                    // Чтобы не делать каждый раз по 100 запросов находим на каком теперь месте последняя статья в стейте находится на бэке и делаем запросы до нее
                    const lastStoryIndexInRes = res.data.indexOf(lastStoryInStore.id)
                    if (lastStoryIndexInRes > 0) {
                        for (let idx = 0; idx < lastStoryIndexInRes; idx++) {
                            const newStoryRes = await axios.get<IStory>(`https://hacker-news.firebaseio.com/v0/item/${res.data[idx]}.json`)
                            fetchedStories.push(newStoryRes.data)
                        }
                        fetchedStories.push(...storiesInStore.slice(lastStoryIndexInRes))
                        dispatch(StoryActionCreators.setStories(fetchedStories))
                    } else {
                        // console.log('Новые истории отсутствуют', fetchedStories)
                    }

                } else {
                    for (const id of res.data.slice(0, 100)) {
                        const res = await axios.get<IStory>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                        fetchedStories.push(res.data)
                    }
                    dispatch(StoryActionCreators.setStories(fetchedStories))
                }
            } else {
                dispatch(StoryActionCreators.setError('Не удалось получить список статей!'))
            }
            dispatch(StoryActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(StoryActionCreators.setError('Произошла ошибка!'))
        }
    }
}