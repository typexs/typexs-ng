export interface IXsProperty {

  propertyName?: string;

  sourceClass?: string | Function;

  type?: string

  form?: string

  cardinality?: number;

  targetClass?: string | Function

  propertyClass?: string | Function;

  /**
   * Marks if property is an identifier for the entity.
   */
  id?: boolean;
  pk?: boolean;

  /**
   * If a property is embedded then the subProperties must be integrated in the bound entity, default is false.
   * TODO implement this
   */
  embedded?:boolean;

  /**
   * Only if id or pk is set then the type determine the id should be automatic (autoinc or uuid generation) else an id must be providen, default will be true
   */
  auto?:boolean;



}
