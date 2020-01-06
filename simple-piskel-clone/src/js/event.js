import currentSizeCanvas from "../components/canvas/currentSizeCanvas";

const select = document.getElementById('size');
const penSizeFields = document.querySelectorAll('.pen-size');
const previewField = document.getElementById('preview');


const func = () => {console.log('something')};

select.addEventListener('change', () => {
    if(select.value !== localStorage.getItem('size')) {
        localStorage.setItem('size', select.value);
        canvas.width = currentSizeCanvas();
        canvas.height = currentSizeCanvas(); 
        previewField.width = currentSizeCanvas();
        previewField.height = currentSizeCanvas(); 
    }
})

penSizeFields.forEach( (element) => {
    element.addEventListener('click', () => {
        penSizeFields.forEach((item) => {
            item.classList.remove('active');
        });
        element.classList.add('active');
        localStorage.setItem('sizePen', element.dataset.size);
    });
});

export {func};