import {IStory, IStoryIdList} from "../../../models/IStory";
import {AppDispatch, RootState} from "../../index";
import {SetCurrentStoryAction, SetErrorAction, SetIsLoadingAction, SetStoriesAction, StoryActionEnum} from "./types";
import axios from "axios";

export const StoryActionCreators = {
    setIsLoading: (payload: boolean):SetIsLoadingAction  => ({type: StoryActionEnum.SET_IS_LOADING, payload: payload}),
    setError: (payload: string): SetErrorAction => ({type: StoryActionEnum.SET_ERROR, payload: payload}),
    setCurrentStory: (payload: IStory): SetCurrentStoryAction => ({type: StoryActionEnum.SET_CURRENT_STORY, payload}),
    setStories: (payload: IStory[]): SetStoriesAction => ({type: StoryActionEnum.SET_STORIES, payload}),
    fetchStories: () => async (dispatch: AppDispatch, getState: RootState) => {
        try {
            dispatch(StoryActionCreators.setIsLoading(true))
            const stories = []
            const res = await axios.get<IStoryIdList[]>('https://hacker-news.firebaseio.com/v0/newstories.json')
            if (res.data) {
                //TODO сделать проверку изменения id последнего поста в стейте, чтобы не делать заново все сто запросов
                for (const id of res.data.slice(0,100)) {
                    const res = await axios.get<IStory>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    stories.push(res.data)
                }
                dispatch(StoryActionCreators.setStories(stories))
            } else {
                dispatch(StoryActionCreators.setError('Не удалось получить список статей!'))
            }
            dispatch(StoryActionCreators.setIsLoading(false))
        } catch (e) {
            dispatch(StoryActionCreators.setError('Произошла ошибка!'))
        }
    }
}