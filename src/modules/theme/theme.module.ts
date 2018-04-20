import {APP_BOOTSTRAP_LISTENER, APP_INITIALIZER, NgModule} from "@angular/core";


@NgModule({
  declarations: [],
  imports: [],
  exports:[],
  providers: [
/*
   {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [],
      useFactory: () => {

        return( startup );

        async function startup() {
          console.log('ASDASD');

        }

      }
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      deps: [],
      useValue: (compRef: any) => {
        console.log(compRef);
      }
    }
*/
  ]
})
export class ThemeModule {

}
