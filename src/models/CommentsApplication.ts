import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Application from './Application';
import User from './User';

@Entity('comments_application')
class CommentsApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  id_application: string;

  @ManyToOne(() => Application, { eager: true })
  @JoinColumn({ name: 'id_application' })
  aplication: Application;

  @Column()
  description: string;

  @Column()
  id_user: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'id_user' })
  user: User;

  // @CreateDateColumn({ select: false })
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CommentsApplication;
