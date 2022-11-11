import {StoryAction, StoryActionEnum, StoryState} from "./types";
import {IStory} from "../../../models/IStory";


const initialState: StoryState = {
    isLoading: false,
    story: {} as IStory
}

export default function storyReducer(state = initialState, action:StoryAction): StoryState {
    switch (action.type) {
        case StoryActionEnum.SET_STORY:
            return {...state, story: action.payload, isLoading: false}
        case StoryActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state
    }
}