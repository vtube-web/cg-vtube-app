import React, { useEffect } from 'react';
import fluidPlayer from 'fluid-player';

function VideoPlayer({video}) {
    useEffect(() => {
        var videoOptions = {
            "layoutControls": {
                "controlBar": {
                    "autoHideTimeout": 3,
                    "animated": true,
                    "autoHide": true
                },
                "htmlOnPauseBlock": {
                    "html": "huh?",
                    "height": "23rem",
                    "width": "20rem"
                },
                "autoPlay": true,
                "mute": false,
                "allowTheatre": true,
                "playPauseAnimation": true,
                "playbackRateEnabled": true,
                "allowDownload": true,
                "playButtonShowing": true,
                "fillToContainer": false,
                "posterImage": ""
            },
            "vastOptions": {
                "adList": [],
                "adCTAText": false,
                "adCTATextPosition": ""
            }
        };

        var videoElement = document.getElementById(video.id);
        var myFP = fluidPlayer(videoElement, videoOptions);

        return () => {
            myFP.destroy();
        };
    }, []);

    return (
        <div>
            <video id={video.id}>
                <source src={video.videoUrl} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoPlayer;