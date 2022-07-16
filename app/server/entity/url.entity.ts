import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '网址标题' })
  title!: string;

  @Column({ comment: '网址' })
  url!: string;

  @Column({ comment: '文章类型' })
  type!: string;

  @Column({ comment: '文章标签' })
  tag!: string;

  //   @Column({ comment: '展示标题' })
  //   file_title: string;

  //   @Column({ comment: '展示内容', type: 'text' })
  //   file_content: string;

  @Column({ comment: '阅读次数', default: 0 })
  readings!: number;

  @CreateDateColumn()
  create_time!: Date;

  @UpdateDateColumn()
  update_time!: Date;
}
