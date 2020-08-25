import {Component, OnInit} from '@angular/core';
import {Pager} from '../../base/pager/Pager';
import {PagerService} from '../../base/pager/PagerService';
import {PagerAction} from '../../base/pager/PagerAction';


@Component({
  templateUrl: 'pager-demo.component.html',
})
export class PagerDemoComponent implements OnInit {

  /**
   * Simple pager 01
   */
  page_01: number;


  currentPage_3: number = 4;

  pager3: Pager = null;

  constructor(private pagerService: PagerService) {
  }

  onPageChange($event: PagerAction) {
  }


  ngOnInit(): void {
    this.pager3 = this.pagerService.get('pager3');
  }
}
