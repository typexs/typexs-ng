import {suite, test} from 'mocha-typescript';
import {expect} from 'chai';
import * as _ from 'lodash';
import {XsRegistry} from '../../../src/libs/xsschema/XsRegistry';
import {XsEntityManager} from '../../../src/libs/xsschema/XsEntityManager';
import {IStorageOptions, StorageRef} from 'typexs-base';
import {SqliteConnectionOptions} from 'typeorm/driver/sqlite/SqliteConnectionOptions';

export const TEST_STORAGE_OPTIONS: IStorageOptions = <SqliteConnectionOptions>{
  name: 'default',
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  logger: 'simple-console',
  logging: 'all'
  // tablesPrefix: ""

};


@suite('functional/xsschema/xsschema_scenario_01_direct_referencing')
class Xsschema_scenario_01_direct_referencingSpec {


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
    let tables: any[] = await c.connection.query('SELECT * FROM sqlite_master WHERE type=\'table\';');
    let tableNames = tables.map(x => x.name);
    expect(tableNames).to.have.length(4);
    expect(tableNames).to.contain('p_author_author');

    let data_author = await c.connection.query('PRAGMA table_info(\'author\')');
    let data_book = await c.connection.query('PRAGMA table_info(\'book\')');
    let data_relations = await c.connection.query('PRAGMA table_info(\'p_author_author\')');

    expect(data_author).to.have.length(3);
    expect(data_book).to.have.length(2);
    expect(data_relations).to.have.length(4);

    await c.close();
    XsRegistry.reset();
  }


  @test
  async 'entity lifecycle for entity referencing property'() {
    XsRegistry.reset();
    const Author = require('./schemas/default/Author').Author;
    const Book = require('./schemas/default/Book').Book;

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


    let data = await c.connection.query('select * from author');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from book');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from p_author_author');
    expect(data).to.have.length(1);
    expect(data[0].source_id).to.eq(1);
    expect(data[0].target_id).to.eq(1);

    let book2 = await xsem.find<any>(Book, {id: 1});
    expect(book2).to.have.length(1);
    expect(book).to.deep.eq(book2.shift());

    // TODO delete

    await c.close();
    XsRegistry.reset();
  }

  // TODO NULLABLE!!!

  @test.only()
  async 'entity lifecycle for referencing property E-P-SP-E'() {
    XsRegistry.reset();
    const Car = require('./schemas/direct_property/Car').Car;
    const Skil = require('./schemas/direct_property/Skil').Skil;
    const Driver = require('./schemas/direct_property/Driver').Driver;

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema('direct_property');

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    let c = await ref.connect();

    let tables: any[] = await c.connection.query('SELECT * FROM sqlite_master WHERE type=\'table\';');
    console.log(tables);

    let car = new Car();
    car.producer = 'Volvo';
    car.driver = new Driver();
    car.driver.age = 30;
    car.driver.nickName = 'Fireball';
    car.driver.skill = new Skil();
    car.driver.skill.label = 'ASD';
    car.driver.skill.quality = 123;

    car = await xsem.save(car);
    console.log(car);

    await c.close();
    XsRegistry.reset();
  }


  @test.skip
  async 'entity lifecycle for multiple direct entity referencing E-P-SP[]-E'() {


  }

  @test.skip
  async 'error on referencing sub-property with multiple entity references E-P-SP-E[]'() {


  }
}
