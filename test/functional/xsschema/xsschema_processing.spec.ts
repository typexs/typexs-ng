import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import * as _ from 'lodash';
import {XsRegistry} from '../../../src/libs/xsschema/XsRegistry';
import {XsEntityDef} from '../../../src/libs/xsschema/XsEntityDef';
import {XsEntityManager} from '../../../src/libs/xsschema/XsEntityManager';
import {IStorageOptions, StorageRef} from 'typexs-base';
import {getMetadataArgsStorage, Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {Author} from './schemas/default/Author';
import {Book} from './schemas/default/Book';

export const TEST_STORAGE_OPTIONS: IStorageOptions = <SqliteConnectionOptions>{
  name: 'default',
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
logger:'simple-console',
  logging:'all'
  // tablesPrefix: ""

};


@suite('functional/xsschema/xsschema_processing')
class Form_parseSpec {


  @test
  async 'initializing a simple schema'() {
    XsRegistry.reset();
    require('./schemas/default/Author');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    // console.log(ref['options'],getMetadataArgsStorage());

    let c = await ref.connect();
    let data = await c.connection.query('PRAGMA table_info(\'e_author\')');

    //console.log(data);
    expect(data).to.have.length(3);
    expect(_.find(data, {name: 'last_name'})).to.deep.include({name: 'last_name', type: 'text'});
    await c.close();
    XsRegistry.reset();
  }


  @test.only
  async 'initializing a schema with embedded property'() {
    XsRegistry.reset();
    require('./schemas/default/Author');
    require('./schemas/default/Book');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    // console.log(ref['options'],getMetadataArgsStorage());

    let c = await ref.connect();
    let data = await c.connection.query('PRAGMA table_info(\'e_author\')');
    console.log(data);

    data = await c.connection.query('PRAGMA table_info(\'e_book\')');
    console.log(data);

    data = await c.connection.query('PRAGMA table_info(\'p_relations\')');
    console.log(data);


    let a = new Author();
    a.firstName = 'Robert';
    a.lastName = 'Kania';

    let book = new Book();
    book.content = 'This is a good book';
    book.author = a;

    console.log('BEFRE', book);
    book = await xsem.save(book);
    console.log('DONE', book);

    data = await c.connection.query('select * from e_author');
    console.log("AUTHOR",data);

    data = await c.connection.query('select * from e_book');
    console.log("BOOK",data);

    data = await c.connection.query('select * from p_relations');
    console.log("RELATIONS",data);
    //expect(data).to.have.length(3);
    //expect(_.find(data, {name: 'last_name'})).to.deep.include({name: 'last_name', type: 'text'});


    let book2 = await xsem.find<Book>(Book,{id:1});
    console.log('LOADED',book2);

    await c.close();
    XsRegistry.reset();
  }


  /*
  @test
  async 'create, save, load, update simple instance'() {
    XsRegistry.reset();
    require('./schemas/default/Author');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);



    let entityDef = XsRegistry.getEntityDefFor('Author');
    let instance = entityDef.new<any>();

    instance = xsem.save(instance);

    // let xsem = XsEntityManager.save(instance);
    // let xsem2 = XsEntityManager.findById('default','author', xsem.id);


    XsRegistry.reset();
  }
*/
}

