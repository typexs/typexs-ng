import {Index,Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('p_relations')
export class XsRefProperty {

  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column('integer')
  source_id: number;

  @Index()
  @Column('integer',{nullable:true})
  source_rev_id: number;

  @Index()
  @Column('text')
  source_entity_type: string;

  @Index()
  @Column('text')
  source_property: string;

  @Column('integer')
  source_seqnr: number = 0;

  @Index()
  @Column('integer')
  target_id: number;

  @Index()
  @Column('integer',{nullable:true})
  target_rev_id: number;

  @Index()
  @Column('varchar')
  target_entity_type: string;
}
