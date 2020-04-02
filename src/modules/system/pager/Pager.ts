import * as _ from 'lodash';


export class Pager {

  static inc = 0;

  readonly name: string;

  private _inc = 0;

  private frameStart: number;

  private frameEnd: number;

  frameSize = 3;

  currentPage: number;

  totalPages: number;

  /**
   * Minimum pages
   */
  minPage = 1;

  /**
   * Pages for display
   */
  pages: number[] = [];

  wait: NodeJS.Timer;

  constructor(id: string = 'dummy') {
    this.name = id;
  }


  once(fn: () => void) {
    clearTimeout(this.wait);
    this.wait = setTimeout(fn, 50);
  }


  calculatePages() {
    if (this.minPage > 0 && this.totalPages > 0) {

      this.frameStart = this.currentPage - this.frameSize;
      this.frameEnd = this.currentPage + this.frameSize;
      if (this.frameStart < 1) {
        this.frameEnd += Math.abs(this.frameStart) + 1;
        this.frameStart = 1;
      }

      if (this.frameEnd > this.totalPages) {
        this.frameEnd = this.totalPages;
        this.frameStart = this.frameStart - (this.frameEnd - this.totalPages);
      }

      if (this.minPage <= this.frameStart &&
        this.frameStart <= this.currentPage &&
        this.currentPage <= this.frameEnd &&
        this.frameEnd <= this.totalPages) {
        this.pages = _.range(this.frameStart, this.frameEnd + 1);
      } else {
        throw new Error('pager error' +
          ' min=' + this.minPage +
          ' start=' + this.frameStart +
          ' current=' + this.currentPage +
          ' end=' + this.frameEnd +
          ' total=' + this.totalPages);
      }
    }
  }

  hasLeftSpace() {
    return this.minPage < this.frameStart;
  }


  hasRightSpace() {
    return this.frameEnd < this.totalPages;
  }

  isNotFrameFirst() {
    return this.currentPage > this.minPage;
  }


  isNotFrameLast() {
    return !(this.currentPage < this.totalPages);
  }

  inc() {
    this._inc++;
  }

  dec() {
    this._inc--;
  }

  free() {
    return this._inc <= 0;
  }
}
