function getImageFromFrames() {
    const frameContainers = document.querySelectorAll('.frame-container');
    const imageFromFrames = Array.from(frameContainers).map(frame => 
        frame.firstElementChild.children[1].toDataURL());

    return imageFromFrames;
}

export default getImageFromFrames;