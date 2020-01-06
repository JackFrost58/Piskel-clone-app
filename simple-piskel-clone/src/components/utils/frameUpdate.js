function updateFramesIndexes(frames) {
    frames.forEach((frame, index) => {
        frame.children[0].textContent = index + 1;
    })
}

function addActiveClassToFrame(frame, frames) {
    frames.forEach(elem => elem.classList.remove('frame--active'));
    frame.classList.add('frame--active');
}

function updateFramesState() {
    const frameContainers = document.querySelectorAll('.frame-container');
    
    return Array.from(frameContainers).map(frameContainer => frameContainer.firstElementChild);
}

export {updateFramesIndexes, addActiveClassToFrame, updateFramesState}