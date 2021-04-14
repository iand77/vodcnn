import React from "react";
import ReactDOM from "react-dom";

// React components
import PodcastTitle from "./components/PodcastTitle";
import PodcastButtonContainer from "./components/PodcastButtonContainer";
import PodcastVideo from "./components/PodcastVideo";

// The styling for our VOD app
import "./components/App.scss";

// Redux Dependencies
import { createStore } from "redux";
import { Provider } from "react-redux";

// Config settings
import Settings from "./settings.json"; 

// Styling
import "./components/App.scss";

// Make settings accessible globally
window.VODCNN = Settings;

const initialState = {
    rss: null, // JSON object with RSS feed data
    buttonActive: 1, // Active button [0-X=min(5, length(rss.items)))] / 0=UP / X=DOWN
    buttonSelected: 1, // Active selected video index [1-length(rss.items)]
    offset: 0, // ScrollTop / How many video buttons are "hidden" above the up arrow
}

function reducer(state = initialState, action) {
    
    let totalPodcasts = (state.rss !== null && Array.isArray(state.rss.items) ? state.rss.items.length : 0);
    let buttonUpIndex = 0;
    let buttonDownIndex = Math.min(totalPodcasts + 1, 5);

    switch(action.type) {
        case "UPDATE_FEED":
            return {
                rss: action.payload,
                buttonActive: 1,
                buttonSelected: 1,
                offset: state.offset,
                videoUrl: state.videoUrl,
                videoType: state.videoType,
                videoDescription: state.videoDescription
            }
        case "CONTROLLER_UP":
            return {
                rss: state.rss,
                buttonActive: !state.buttonActive ? buttonUpIndex : state.buttonActive - 1,
                buttonSelected: state.buttonSelected,
                offset: state.offset,
                videoUrl: state.videoUrl,
                videoType: state.videoType,
                videoDescription: state.videoDescription
            };
        case "CONTROLLER_DOWN":
            return {
                rss: state.rss,
                buttonActive: state.buttonActive === buttonDownIndex ? buttonDownIndex : state.buttonActive + 1,
                buttonSelected: state.buttonSelected,
                offset: state.offset,
                videoUrl: state.videoUrl,
                videoType: state.videoType,
                videoDescription: state.videoDescription
            };
        case "CONTROLLER_ENTER":
            
            let videoUrl = state.videoUrl;
            let videoType = state.videoType;
            let videoDescription = state.videoDescription;
            let buttonSelected = state.buttonSelected;
            let offset = null;

            // If current selected button is an arrow:
            if (totalPodcasts > 4) {
                if (state.buttonActive === buttonUpIndex) {
                    offset = state.offset === 0 ? 0 : state.offset - 1;
                } else if (state.buttonActive === buttonDownIndex) {
                    offset = state.offset >= totalPodcasts - 4 ? totalPodcasts - 4 : state.offset + 1;
                } 
            } 
            
            // If current selected button is a video
            if (offset === null) {
                offset = state.offset;
                buttonSelected = state.offset + state.buttonActive;
                videoUrl = state.rss.items[buttonSelected-1].enclosure.url;
                videoType = state.rss.items[buttonSelected-1].enclosure.type;
                videoDescription = state.rss.items[buttonSelected-1].contentSnippet;
            }

            return {
                rss: state.rss,
                buttonActive: state.buttonActive,
                buttonSelected: buttonSelected,
                offset: offset,
                videoUrl: videoUrl,
                videoType: videoType,
                videoDescription: videoDescription
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
        <div className="vod">
            <div className="vod__logo"></div>
            <div className="vod__heading">
                <PodcastTitle title="test"/>
            </div>
            <div className="vod__body">
                <div className="vod__body__lhs">
                    <PodcastButtonContainer/>
                </div>
                <div className="vod__body__rhs">
                    <PodcastVideo />
                </div>
            </div>
        </div>
    </Provider>
  )

ReactDOM.render(<App />, document.getElementById("index"));