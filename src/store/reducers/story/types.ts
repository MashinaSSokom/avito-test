import {IStory} from "../../../models/IStory";

export interface StoryState {
    story: IStory;
    isLoading: boolean;
}

export enum StoryActionEnum {
    SET_STORY = 'SET_STORY',
    SET_IS_LOADING = 'SET_IS_LOADING',
}

interface SetStoryAction {
    type: StoryActionEnum.SET_STORY;
    payload: IStory;
}

interface SetIsLoadingAction {
    type: StoryActionEnum.SET_IS_LOADING;
    payload: boolean;
}

export type StoryAction =
    SetStoryAction |
    SetIsLoadingAction