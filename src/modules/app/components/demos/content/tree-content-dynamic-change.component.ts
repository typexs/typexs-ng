import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchEntry} from './search/search-entry.component';
import {ViewParent} from './search/view-parent.component';
import {ViewBuilderComponent} from '../../../../views/view-builder.component';


@Component({
  selector: 'content-view-child-demo',
  templateUrl: 'tree-content-dynamic-change.component.html',

})
export class TreeContentDynamicChangeComponent implements OnInit {
  treeContent: any;

  @ViewChild(ViewBuilderComponent, {static: true}) builder: ViewBuilderComponent<any>;

  ngOnInit() {
    this.treeContent = new ViewParent();
    this.treeContent.children.push(new SearchEntry(1, null));

    setTimeout(() => {
      this.treeContent = new ViewParent();
      this.treeContent.children.push(new SearchEntry(1, null));
    }, 5000);
  }

  onSubmit($event: any) {

  }
}
