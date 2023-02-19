import '../css/style.css';
import '../css/style.scss';

import { initTool } from '../components/tools/tools';
import initFrames from '../components/frames/frames';
import initCanvas from '../components/canvas/canvas';
import initAnimation from '../components/animation/animation';
import initNetlify from '../components/login/login';
import { initCanvasSize } from '../components/canvas/currentSizeCanvas';
import initPenSize from '../components/tools/sizePen';
import {initColor} from '../components/tools/colorPen';


initTool();
initPenSize();
initColor()
initFrames();
initCanvasSize();
initCanvas();
initAnimation();
//initNetlify();