const { createFrame } = require('../../components/frames/createFrame');

const resultTestOne = 
    `<li class="frame-container">
    <div class="frame">
        <div class="frame__number">2</div>
        <canvas class="frame__canvas"></canvas>
        <button class="frame__button frame__duplicate" />
        <button class="frame__button frame__delete" />
        <button class="frame__button frame__dragDrop" />
    </div></li>`


test('create frame number 2', () => {
    expect(createFrame(2)).toBe(resultTestOne);
})