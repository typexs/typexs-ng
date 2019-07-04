import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class SimpleItem {

  @PrimaryGeneratedColumn()
  id: number;

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
