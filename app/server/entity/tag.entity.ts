import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '值' })
  value!: string;

  @Column({ comment: '键' })
  label!: string;

  @Column({ comment: '父级id' })
  parent_id!: string;

  @CreateDateColumn()
  create_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;
}
