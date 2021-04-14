import React from "react";
import Parser from "rss-parser";
import { connect } from "react-redux";
import PodcastButton from "./PodcastButton";

class PodcastButtonContainer extends React.Component {

    componentDidUpdate = () => {
        
        // Create thumb of clip - better way would be to cache images generated via ffmpeg
        // but that would require writing an express server script and out of scope for this test
        let videos = document.querySelectorAll('video.vod__button__video');
        console.log(videos);
        Array.prototype.forEach.call(videos, (video, i) => {
            // this._intervals[i] = setInterval(() => {
            //     video.currentTime = Math.random() * 120 + 60;
            // }, 5000);
            video.currentTime = 70;
        });
    }

    
    loadingComplete(feed) {

        this.props.dispatch({type: "UPDATE_FEED", payload: feed});
        this.props.dispatch({type: "CONTROLLER_ENTER"});
        
        // Code for remote controller
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        
    }

    handleEvent = (event) => {

        switch(event.key) {
            case 'ArrowUp':
                this.props.dispatch({type:'CONTROLLER_UP'});
                break;
            case 'ArrowDown':
                this.props.dispatch({type:'CONTROLLER_DOWN'});
                break;
            case 'Enter':
                this.props.dispatch({type:'CONTROLLER_ENTER'});
                break;
        }
    }

    handleKeyUp = () => {

        this.isKeyDown = false;
        clearInterval(this.controllerInterval);
    }
    
    handleKeyDown = (event) => {

        if (this.isKeyDown) return;
        this.isKeyDown = true;
        this.handleEvent(event);
        this.controllerInterval = setInterval(()=>this.handleEvent(event), 500);
    }

    componentDidMount() {
       
        let parser = new Parser();
        fetch(window.VODCNN.corsproxy + window.VODCNN.rssurl)
        .then(response=>response.text())
        .then(data=>{
            parser.parseString(data)
            .then(feed=>this.loadingComplete(feed));
        });
    }

    render() {
        
        if (this.props.rss === null) {
            return (<div>Loading...</div>);
        }

        // Make sure there's a maximum of 4 podcasts displayed at any one time
        let buttonActive = this.props.buttonActive;
        let podcasts = this.props.rss.items;
        let offset = this.props.offset || 0;
        let classNames = {
            "up":   ["vod__button", "vod__button--up"],
            "down": ["vod__button", "vod__button--down"]
        };
        
        if (buttonActive === 0) {
            classNames["up"].push("vod__button--active");
        } else if (buttonActive === 5) {
            classNames["down"].push("vod__button--active");
        } 
        if ( Array.isArray(podcasts) ) {
            podcasts = podcasts.slice(offset, offset + 4);
            this.podcastButtons = podcasts.map((item, key) =>
                <PodcastButton caption={item.title} key={item.title} groupIndex={key+1} index={key+1+offset} date={item.pubDate} videoUrl={item.enclosure.url} videoType={item.enclosure.type}/>
            )
        } else {
            this.podcastButtons = (<div>Loading...</div>)
        }

        return (
            <div className="vod__button-container">
                <div className={classNames["up"].join(" ")}></div>
                <div className="vod__button-container__group">
                    {this.podcastButtons}
                </div>
                <div className={classNames["down"].join(" ")}></div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rss: state.rss,
    buttonActive: state.buttonActive,
    buttonSelected: state.buttonSelected,
    offset: state.offset
})
export default connect(mapStateToProps)(PodcastButtonContainer);