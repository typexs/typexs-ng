import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SearchEntryComponent} from './search-entry.component';
import {TreeObject} from '../../../libs/xsview/TreeObject';
import {ViewContent} from '../../../libs/xsview/decorators/ViewContent';
import {ViewComponent} from '../../../libs/xsview/decorators/ViewComponent';
import {AbstractComponent} from '../../../libs/xsview/AbstractComponent';


@ViewContent('view-parent')
export class ViewParent extends TreeObject {
  type = 'view-parent';
}

@ViewComponent('view-parent')
@Component({
  selector: 'view-parent',
  templateUrl: 'view-parent.component.html',

})
export class ViewParentComponent extends AbstractComponent<ViewParent> implements AfterViewInit,OnInit{

  @ViewChild(SearchEntryComponent) searchEntry: SearchEntryComponent;

  searchEntry2: SearchEntryComponent;

  title = 'ViewParent';

  ngOnInit(){
    console.log('INIT',this.searchEntry)
    console.log('INIT',this.searchEntry2)

  }

  ngAfterViewInit(){
    console.log('AFTERVIEWINIT',this.searchEntry)
    console.log('AFTERVIEWINIT',this.searchEntry2)
  }


}
