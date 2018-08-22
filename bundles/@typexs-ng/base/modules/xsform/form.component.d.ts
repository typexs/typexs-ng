import { ComponentFactoryResolver, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormService } from './form.service';
import { AbstractFormComponent } from '../../libs/xsform/AbstractFormComponent';
import { Form } from '../../libs/xsform/elements';
export declare class FormComponent extends AbstractFormComponent<Form> implements OnInit {
    private formService;
    injector: Injector;
    r: ComponentFactoryResolver;
    ngSubmit: EventEmitter<{}>;
    formName: string;
    instance: any;
    constructor(formService: FormService, injector: Injector, r: ComponentFactoryResolver);
    ngOnInit(): void;
    onSubmit($event: Event): Promise<boolean>;
}
