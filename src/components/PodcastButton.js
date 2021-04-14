import React from "react";
import { connect } from "react-redux";

class PodcastButton extends React.Component {

    render() {

        this.className = ["vod__button"];
        
        if (parseInt(this.props.groupIndex) === this.props.buttonActive) {
            this.className.push("vod__button--active");
        }
        if (parseInt(this.props.index) === this.props.buttonSelected) {
            this.className.push("vod__button--selected");
        }
        
        return (
            <div className={this.className.join(" ")}>
                <video className="vod__button__video" width="auto" height="100%" muted>
                    <source src={this.props.videoUrl} type={this.props.videoType}/>
                    Your browser does not support the video tag.
                </video>
                <div className="vod__button__meta">
                    <p className="vod__button__meta__caption">{this.props.caption}</p>
                    <p className="vod__button__meta__date">{this.props.date}</p>
                </div>
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
export default connect(mapStateToProps)(PodcastButton);