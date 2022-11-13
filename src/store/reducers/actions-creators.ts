import {StoryActionCreators} from "./story/action-creators";
import {CommentActionCreators} from "./comment/action-creators";


export const actionsCreators = {
    ...StoryActionCreators,
    ...CommentActionCreators
}