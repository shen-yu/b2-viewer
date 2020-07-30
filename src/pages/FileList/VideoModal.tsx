import React from 'react'
import QierPlayer from 'qier-player';

export default ({ videoOrigin }) => {
    return (
        <QierPlayer
            srcOrigin={videoOrigin}
        />
    )
}