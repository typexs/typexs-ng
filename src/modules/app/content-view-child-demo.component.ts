import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchEntry} from './search/search-entry.component';
import {SearchResult} from './search/search-result.component';
import {ViewParent} from './search/view-parent.component';
import {ViewBuilderComponent} from '../views/view-builder.component';


@Component({
  selector: 'content-view-child-demo',
  templateUrl: 'content-view-child-demo.component.html',

})
export class ContentViewChildDemoComponent implements OnInit {
  treeContent: any;

  @ViewChild(ViewBuilderComponent) builder: ViewBuilderComponent<any>;

  ngOnInit() {
    this.treeContent = new ViewParent();
    this.treeContent.children.push(new SearchEntry(1));

    setTimeout(() => {
      this.treeContent = new ViewParent();
      this.treeContent.children.push(new SearchEntry(1));
    }, 5000);
  }

  onSubmit($event: any) {

  }
}
