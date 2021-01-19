import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Label} from '../../../src/libs/forms/decorators/Label';


@Entity()
export class SimpleItem {

  @PrimaryGeneratedColumn()
  id: number;

  @Label()
  @Column()
  name: string;

  @Column()
  text: string;

  @Column()
  start: number;

  @Column()
  stop: number;

  @CreateDateColumn()
  created: Date = new Date();


}
