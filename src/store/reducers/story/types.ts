import {IStory} from "../../../models/IStory";

export interface StoryState {
    stories: IStory[];
    error: string;
    isLoading: boolean;
}

export enum StoryActionEnum {
    SET_STORIES = 'SET_STORIES',
    SET_IS_LOADING = 'SET_IS_LOADING',
    SET_ERROR = 'SET_ERROR'
}

export interface SetStoriesAction {
    type: StoryActionEnum.SET_STORIES;
    payload: IStory[];
}

export interface SetIsLoadingAction {
    type: StoryActionEnum.SET_IS_LOADING;
    payload: boolean;
}

export interface SetErrorAction {
    type: StoryActionEnum.SET_ERROR;
    payload: string;
}

export type StoryAction =
    SetStoriesAction |
    SetIsLoadingAction |
    SetErrorAction