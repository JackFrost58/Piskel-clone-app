import { setDefaultPenSize } from "../utils/saveLocalStorage";

const penSizeFields = document.querySelector('.pen-size-container');

function penSizeClickHandler(e) {
    const allSizePen = document.querySelectorAll('.pen-size');

    allSizePen.forEach((item) => {
        item.classList.remove('active');
    });

    const currentSize = e.target;

    currentSize.classList.add('active');
    localStorage.setItem('sizePen', currentSize.dataset.size);
}

function windowLoadHandler() {
    setDefaultPenSize();
}

function initPenSize() {
    penSizeFields.addEventListener('click', penSizeClickHandler);
    window.addEventListener('load', windowLoadHandler);
}

export default initPenSize;