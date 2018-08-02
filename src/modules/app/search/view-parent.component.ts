import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AbstractComponent} from '../../xsview/AbstractComponent';
import {TreeObject} from '../../xsview/TreeObject';
import {ViewContent} from '../../xsview/decorators/ViewContent';
import {ViewComponent} from '../../xsview/decorators/ViewComponent';
import {SearchEntryComponent} from './search-entry.component';


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
