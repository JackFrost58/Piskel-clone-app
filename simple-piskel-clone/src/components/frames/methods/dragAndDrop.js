import { updateFramesIndexes, updateFramesState } from "../../utils/frameUpdate";

function changeStyleFrame(currentFrame, position, zIndex, display, top) {
    const frame = currentFrame;
    frame.style.position = position;
    frame.style.zIndex = zIndex;
    frame.style.display = display;
    frame.style.top = `${top}px`;
}

function dragAndDrop(event) {
    const FRAME_CONTAINER_CENTER = 290;

    if (event.target.classList.contains('frame__dragDrop')) {
        const frame = event.target.parentElement;
        const frameContainer = frame.parentElement;

        frameContainer.classList.add('dragContainer');

        const shiftMouseY = event.clientY - frame.getBoundingClientRect().top;
        let currentDroppable = null;

        const onMouseMove = (e) => {
            const frameStyleTop = e.pageY - shiftMouseY;
            changeStyleFrame(frame, 'absolute', 6, 'none', frameStyleTop);

            const belowEl = document.elementFromPoint(FRAME_CONTAINER_CENTER, e.clientY);
            frame.style.display = 'block';

            if(!belowEl) return;

            const droppableBelow = belowEl.closest('.frame');

            if(currentDroppable !== droppableBelow) {
                if(currentDroppable) {
                    currentDroppable.classList.remove('frame-dragged');
                } 

                currentDroppable = droppableBelow;
                
                if(currentDroppable) {
                    droppableBelow.classList.add('frame-dragged');
                }
            }
        }

        const swapFrames = () => {
            frameContainer.classList.remove('dragContainer');

            const replaceableFrame = currentDroppable;

            if (currentDroppable && frame) {
                frameContainer.removeChild(frame);
                currentDroppable.parentElement.append(frame);
                frameContainer.append(replaceableFrame);
            }

            changeStyleFrame(frame, 'relative', 1, 'block', 0);

            if(replaceableFrame) {
                replaceableFrame.classList.remove('frame-dragged');
            }

            frames = updateFramesState();
            updateFramesIndexes(frames);
        }

        const onMouseUp = () => {
            swapFrames();

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}

export default dragAndDrop;