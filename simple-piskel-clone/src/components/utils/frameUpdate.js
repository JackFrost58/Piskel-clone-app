function updateFramesIndexes(frames) {
    frames.forEach((element, index) => {
        element.children[0].textContent = index + 1;
    })
}

function addActiveClassToFrame(frame, frames) {
    frames.forEach(element => element.classList.remove('frame--select'));
    frame.classList.add('frame--select');
}

function updateFramesState() {
    const frameContainers = document.querySelectorAll('.frame-container');
    
    return Array.from(frameContainers).map(frameContainer => frameContainer.firstElementChild);
}

export {updateFramesIndexes, addActiveClassToFrame, updateFramesState}