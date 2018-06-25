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
  //logger: 'simple-console',
  //logging: 'all'
  // tablesPrefix: ""

};


@suite('functional/xsschema/xsschema_scenario_02_indirect_integration')
class Xsschema_scenario_02_indirect_integrationSpec {


  @test
  async 'initializing a schema with integrated property'() {
    XsRegistry.reset();
    const Author = require('./schemas/default/Author').Author;
    const Book = require('./schemas/default/Book').Book;
    const Summary = require('./schemas/default/Summary').Summary;

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
    expect(data_summary).to.have.length(7);

    await c.close();
    XsRegistry.reset();
  }


  @test
  async 'entity lifecycle for integrated property with save and load cycle'() {
    XsRegistry.reset();
    const Author = require('./schemas/default/Author').Author;
    const Book = require('./schemas/default/Book').Book;
    const Summary = require('./schemas/default/Summary').Summary;

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

    let summary = new Summary();
    summary.size = 1000;
    summary.content = 'This is a good summary';
    book.summary = summary;

    book = await xsem.save(book);


    let data2 = await c.connection.query('SELECT name FROM sqlite_master WHERE type=\'table\';');
    expect(data2).to.have.length(5);

    let data = await c.connection.query('select * from e_author');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from e_book');
    expect(data).to.have.length(1);
    expect(data[0].id).to.eq(1);

    data = await c.connection.query('select * from p_relations');
    expect(data).to.have.length(1);
    expect(data[0].source_id).to.eq(1);
    expect(data[0].target_id).to.eq(1);
    expect(data[0].source_seqnr).to.eq(-1);

    data = await c.connection.query('select * from p_summary');
    expect(data).to.have.length(1);
    expect(data[0].source_id).to.eq(1);
    expect(data[0].source_seqnr).to.eq(-1);


    let book2 = await xsem.find(Book, {id: 1});
    expect(book2).to.have.length(1);
    let _book2 = book2.shift();
    expect((_book2 as any).summary.size).to.be.eq(summary.size);
    expect(book).to.deep.eq(_book2);

    await c.close();
    XsRegistry.reset();
  }


  @test.only
  async 'entity lifecycle for integrated property with multiple save and load cycle'() {
    XsRegistry.reset();
    const Room = require('./schemas/default/Room').Room;
    const Equipment = require('./schemas/default/Equipment').Equipment;

    let ref = new StorageRef(TEST_STORAGE_OPTIONS);
    await ref.prepare();
    let schemaDef = XsRegistry.getSchema(TEST_STORAGE_OPTIONS.name);

    let xsem = new XsEntityManager(schemaDef, ref);
    await xsem.initialize();

    let c = await ref.connect();

    let r = new Room();
    r.equipment = [];

    let s = new Equipment();
    s.label = 'Seats';
    s.amount = 100;
    r.equipment.push(s);

    s = new Equipment();
    s.label = 'Beamer';
    s.amount = 2;
    r.equipment.push(s);

    r = await xsem.save(r);

    let data = await c.connection.query('select * from p_equipment');
    expect(data).to.have.length(2);

    let roomsIn = await xsem.find(Room, {id: 1});
    expect(roomsIn).to.have.length(1);

    let roomIn = roomsIn.shift();
    expect(roomIn).to.deep.eq(r);

    await c.close();
    XsRegistry.reset();
  }


}
