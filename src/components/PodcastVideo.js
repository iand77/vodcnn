import React from "react";
import { connect } from "react-redux";

class PodcastVideo extends React.Component {


    render() {
        return (
            <div className="vod__video">
                <div className="vod__video__player">
                    <video key={this.props.videoUrl} width="100%" height="auto" muted controls autoPlay>
                        <source src={this.props.videoUrl} type={this.props.videoType}/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="vod__video__description">
                    <p>{this.props.videoDescription}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    videoUrl: state.videoUrl,
    videoType: state.videoType,
    videoDescription: state.videoDescription
})
export default connect(mapStateToProps)(PodcastVideo);