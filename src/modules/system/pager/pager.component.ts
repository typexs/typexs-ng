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
  name: string = 'pager';


  /**
   * Emit events on pagechanges
   */
  @Output()
  onPageChange: EventEmitter<PagerAction> = new EventEmitter();

  _cache: any[] = [];

  /**
   * Frame Size
   */
  get frameSize() {
    return this.pager.frameSize;
  }

  @Input()
  set frameSize(nr: number) {
    if (this.pager) {
      this.pager.frameSize = nr;
    } else {
      this._cache.push({key: 'frameSize', value: nr});
    }

  }


  /**
   * Current page
   */
  get currentPage() {
    return this.pager.currentPage;
  }

  @Input()
  set currentPage(nr: number) {
    if (this.pager) {
      this.pager.currentPage = nr;
    } else {
      this._cache.push({key: 'currentPage', value: nr});
    }
  }

  /**
   * Maximum pages
   */
  get totalPages() {
    return this.pager.totalPages;
  }

  @Input()
  set totalPages(nr: number) {
    if (this.pager) {
      this.pager.totalPages = nr;
    } else {
      this._cache.push({key: 'totalPages', value: nr});
    }
  }

  pager: Pager;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pagerService: PagerService) {

  }

  setPage(nr: number) {
    if (0 < nr && nr <= this.totalPages) {
      this.currentPage = nr;

      let action = new PagerAction(nr, this.name);
      this.onPageChange.emit(action);
      this.pager.calculatePages();
      let params: any = {};
      params[this.name] = nr;

      const urlTree = this.router.createUrlTree([], {
        queryParams: params,
        queryParamsHandling: 'merge',
        preserveFragment: true
      });

      this.router.navigateByUrl(urlTree);
    } else {
      throw new Error('pager is out of range ' + nr + ' of max ' + this.totalPages);
    }
  }


  checkTotal() {
    if (!this.totalPages) {
      this.totalPages = 0;
    } else {
      if (_.isString(this.totalPages)) {
        this.totalPages = parseInt(this.totalPages);
      }
    }
  }


  checkCurrent() {
    if (!this.currentPage) {
      this.currentPage = 1;
    } else {
      if (_.isString(this.currentPage)) {
        this.currentPage = parseInt(this.currentPage);
      }
    }
  }

  checkFrameSize() {
    if (!this.frameSize) {
      this.frameSize = 1;
    } else {
      if (_.isString(this.frameSize)) {
        this.frameSize = parseInt(this.frameSize);
      }
    }
  }


  ngOnInit(): void {
    this.pager = this.pagerService.get(this.name);
    for(let c of this._cache){
      this[c.key] = c.value;
    }
    this.checkCurrent();
    this.checkTotal();
    this.checkFrameSize();
    let pagerValue = this.activatedRoute.snapshot.queryParamMap.has(this.name);
    if (pagerValue) {
      let page = this.activatedRoute.snapshot.queryParamMap.get(this.name);
      if (/^\d+$/.test(page)) {
        try {
          this.setPage(parseInt(page));
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
