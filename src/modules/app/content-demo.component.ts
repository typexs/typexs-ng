import {Component, OnInit} from '@angular/core';
import {SearchEntry} from './search/search-entry.component';
import {SearchResult} from './search/search-result.component';


@Component({
  selector: 'contentDemo',
  templateUrl: 'content-demo.component.html',

})
export class ContentDemoComponent implements OnInit {


  treeContent: any;

  ngOnInit() {
    this.treeContent = new SearchResult();
    this.treeContent.children.push(new SearchEntry(1))
    this.treeContent.children.push(new SearchEntry(2))

  }


  onSubmit($event: any) {

  }
}
