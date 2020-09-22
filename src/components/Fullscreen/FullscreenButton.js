import fscreen from 'fscreen';
import React, {useEffect, useState} from "react";

export const FullscreenButton = () => {

    const [fullscreen, setFullscreen] = useState(fscreen.fullscreenElement);

    const toggleFullscreen = () => {
        if (fscreen.fullscreenEnabled) {
            if (!fscreen.fullscreenElement) {
                fscreen.requestFullscreen(document.documentElement);
            } else {
                fscreen.exitFullscreen();
            }
        }
    }

    useEffect(() => {
        document.onfullscreenchange = (event) => setFullscreen(fscreen.fullscreenElement);
        return document.onfullscreenchange;
    }, [])

    return <i
        className={`fas ${fullscreen ? 'fa-compress-arrows-alt' : 'fa-expand-arrows-alt'} fa-2x`}
        style={{color: "whitesmoke", cursor: "pointer"}}
        onClick={toggleFullscreen}
    />
}
