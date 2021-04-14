import React from "react";
import { connect } from "react-redux";

class PodcastTitle extends React.Component {

    render() {
        
        if (this.props.rss) {
            return (
                <div className="vod__heading__title">
                    <h1>{this.props.rss.title}</h1>
                    <h2>{this.props.rss.description}</h2>
                </div>
            )
        } else {
            return (<div>Loading...</div>)
        }
    }
}

const mapStateToProps = state => ({
    rss: state.rss
})
export default connect(mapStateToProps)(PodcastTitle);