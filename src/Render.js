import { p5 } from 'p5';
import { sketch } from './sketch';
export class Render {
  contructor(element) {
    this.element = element;
    this.myp5;
    this.setup();
  }

  setup() {
    this.myp5 = new p5(sketch, this.element);
  }
}
