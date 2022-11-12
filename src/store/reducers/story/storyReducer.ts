import {StoryAction, StoryActionEnum, StoryState} from "./types";
import {IStory} from "../../../models/IStory";


const initialState: StoryState = {
    isLoading: false,
    error: '',
    stories: [] as IStory[]
}

export default function storyReducer(state = initialState, action:StoryAction): StoryState {
    switch (action.type) {
        case StoryActionEnum.SET_STORIES:
            return {...state, stories: action.payload, isLoading: false}
        case StoryActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        case StoryActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}