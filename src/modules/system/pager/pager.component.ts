import * as _ from 'lodash';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PagerAction} from './PagerAction';
import {ActivatedRoute, Router} from '@angular/router';
import {PagerService} from './PagerService';
import {Pager} from './Pager';

@Component({
  selector: 'txs-pager',
  templateUrl: 'pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit, OnDestroy {

  /**
   * Query identifier name for this pager
   */
  @Input()
  name = 'pager';


  /**
   * Emit events on pagechanges
   */
  @Output()
  pageChange: EventEmitter<PagerAction> = new EventEmitter();


  _frameSize: number;


  /**
   * Frame Size
   */
  get frameSize() {
    return this.pager ? this.pager.frameSize : this._frameSize;
  }

  @Input()
  set frameSize(nr: number) {
    if (this.pager) {
      this.pager.frameSize = nr;
    } else {
      this._frameSize = nr;
    }
  }

  _currentPage: number;

  /**
   * Current page
   */
  get currentPage() {
    return this.pager ? this.pager.currentPage : this._currentPage;
  }

  @Input()
  set currentPage(nr: number) {
    if (this.pager) {
      this.pager.currentPage = nr;
    } else {
      this._currentPage = nr;
    }
  }

  _totalPages: number;

  /**
   * Maximum pages
   */
  get totalPages() {
    return this.pager ? this.pager.totalPages : this._totalPages;
  }


  @Input()
  set totalPages(nr: number) {
    if (this.pager) {
      this.pager.totalPages = nr;
    } else {
      this._totalPages = nr;
    }
  }

  @Input()
  pager: Pager;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private pagerService: PagerService) {

  }

  setPage(nr: number) {
    if (0 < nr && nr <= this.totalPages) {
      this.pager.once(() => {
        this.currentPage = nr;

        const action = new PagerAction(nr, this.name);
        this.pageChange.emit(action);
        this.pager.calculatePages();
        const params: any = {};
        params[this.name] = nr;

        const urlTree = this.router.createUrlTree([], {
          queryParams: params,
          queryParamsHandling: 'merge',
          preserveFragment: true
        });

        this.router.navigateByUrl(urlTree);
      });
    } else {
      throw new Error('pager is out of range ' + nr + ' of max ' + this.totalPages);
    }
  }


  checkTotal() {
    if (!this.totalPages) {
      this.totalPages = 0;
    } else {
      if (_.isString(this.totalPages)) {
        this.totalPages = parseInt(this.totalPages, 0);
      }
    }
  }


  checkCurrent() {
    if (!this.currentPage) {
      this.currentPage = 1;
    } else {
      if (_.isString(this.currentPage)) {
        this.currentPage = parseInt(this.currentPage, 0);
      }
    }
  }

  checkFrameSize() {
    if (!this.frameSize) {
      this.frameSize = 1;
    } else {
      if (_.isString(this.frameSize)) {
        this.frameSize = parseInt(this.frameSize, 0);
      }
    }
  }


  ngOnInit(): void {
    // console.log('cache => ', this._cache);
    // for (const c of this._cache) {
    //   this[c.key] = c.value;
    // }

    let exists = true;
    if (!this.pager) {
      this.pager = this.pagerService.get(this.name);
      exists = false;
    }

    // Update fields if they where already
    if (!_.isUndefined(this._totalPages)) {
      this.totalPages = this._totalPages;
    }

    if (!_.isUndefined(this._currentPage)) {
      this.currentPage = this._currentPage;
    }

    if (!_.isUndefined(this._frameSize)) {
      this.frameSize = this._frameSize;
    }

    if (exists) {
      return;
    }


    this.checkCurrent();
    this.checkTotal();
    this.checkFrameSize();
    const pagerValue = this.activatedRoute.snapshot.queryParamMap.has(this.name);
    if (pagerValue) {
      const page = this.activatedRoute.snapshot.queryParamMap.get(this.name);
      if (/^\d+$/.test(page)) {
        try {
          this.setPage(parseInt(page, 0));
          return;
        } catch (e) {
        }
      }
    }
    this.pager.calculatePages();
  }


  ngOnDestroy(): void {
    this.pagerService.remove(this.name);
  }
}
