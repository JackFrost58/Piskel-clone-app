function createFrame(frameNumber) {
    const frameContainer = document.createElement('li');
    frameContainer.classList.add('frame-container');

    frameContainer.innerHTML = `
    <div class="frame">
        <div class="frame__number">${frameNumber}</div>
        <canvas class="frame__canvas"></canvas>
        <button class="frame__button frame__duplicate"></button>
        <button class="frame__button frame__delete"></button>
        <button class="frame__button frame__dragDrop"></button>
    </div>`
    
    return frameContainer;
}

export default createFrame;