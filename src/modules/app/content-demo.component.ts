import {Component, OnInit} from '@angular/core';
import {ContentPart} from '../../libs/content/decorators/ContentPart';
import {TreeObject} from '../../libs/content/TreeObject';
import {SearchEntry} from './search/search-entry.component';

@ContentPart('search-result')
export class SearchResult extends TreeObject {
  type = 'search-result';
}

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
