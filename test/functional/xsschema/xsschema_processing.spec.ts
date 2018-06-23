import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import * as _ from 'lodash';
import {XsRegistry} from '../../../src/libs/xsschema/XsRegistry';
import {XsEntityManager} from '../../../src/libs/xsschema/XsEntityManager';
import {IStorageOptions, StorageRef} from 'typexs-base';
import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import {Author} from './schemas/default/Author';
import {Book} from './schemas/default/Book';

export const TEST_STORAGE_OPTIONS: IStorageOptions = <SqliteConnectionOptions>{
  name: 'default',
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  //logger: 'simple-console',
  //logging: 'all'
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


  @test
  async 'initializing a schema with entity referencing property'() {
    XsRegistry.reset();

    require('./schemas/default/Author');
    require('./schemas/default/Book');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    let c = await ref.connect();

    let data_author = await c.connection.query('PRAGMA table_info(\'e_author\')');
    let data_book = await c.connection.query('PRAGMA table_info(\'e_book\')');
    let data_relations = await c.connection.query('PRAGMA table_info(\'p_relations\')');

    expect(data_author).to.have.length(3);
    expect(data_book).to.have.length(2);
    expect(data_relations).to.have.length(8);

    await c.close();
    XsRegistry.reset();
  }


  @test
  async 'entity lifecycle for entity referencing property with save and load cycle'() {
    XsRegistry.reset();
    require('./schemas/default/Author');
    require('./schemas/default/Book');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    let c = await ref.connect();

    let a = new Author();
    a.firstName = 'Robert';
    a.lastName = 'Kania';

    let book = new Book();
    book.content = 'This is a good book';
    book.author = a;

    book = await xsem.save(book);
    expect(book.id).to.be.eq(1);
    expect(book.author.id).to.be.eq(1);


    let data = await c.connection.query('select * from e_author');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from e_book');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from p_relations');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);
    expect(data[0].source_id).to.eq(1);
    expect(data[0].target_id).to.eq(1);

    let book2 = await xsem.find<Book>(Book, {id: 1});
    expect(book2).to.have.length(1);
    expect(book).to.deep.eq(book2.shift());

    // TODO delete

    await c.close();
    XsRegistry.reset();
  }




  @test.only
  async 'initializing a schema with embedded reference'() {
    XsRegistry.reset();
    require('./schemas/default/Author');
    require('./schemas/default/Book');
    require('./schemas/default/Summary');

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    let c = await ref.connect();

    let data_author = await c.connection.query('PRAGMA table_info(\'e_author\')');
    let data_book = await c.connection.query('PRAGMA table_info(\'e_book\')');
    let data_relations = await c.connection.query('PRAGMA table_info(\'p_relations\')');
    let data_summary = await c.connection.query('PRAGMA table_info(\'p_summary\')');


    expect(data_author).to.have.length(3);
    expect(data_book).to.have.length(2);
    expect(data_relations).to.have.length(8);
    expect(data_summary).to.have.length(6);

    await c.close();
    XsRegistry.reset();
  }


}

