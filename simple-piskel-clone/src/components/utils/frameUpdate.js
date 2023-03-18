function updateFramesIndexes(frames) {
    frames.forEach((frame, index) => {
        frame.children[0].textContent = index + 1;
    })
}

function updateFramesState() {
    const frameContainers = document.querySelectorAll('.frame-container');
    
    return Array.from(frameContainers).map(frameContainer => frameContainer.firstElementChild);
}

function addActiveClassToFrame(frame, frames) {
    frames.forEach(elem => elem.classList.remove('frame--active'));
    frame.classList.add('frame--active');
}

export {updateFramesIndexes, addActiveClassToFrame, updateFramesState }