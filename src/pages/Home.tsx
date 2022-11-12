import React, {FC} from 'react';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Home:FC = () => {
    const {fetchStories} = useActions()
    // const {stories} = useTypedSelector(state => state.storyReducer)
    const fetch = () => {
        fetchStories()
    }
    return (
        <div>
            <button onClick={fetch}>Загрузить истории</button>
        </div>
    );
};

export default Home;