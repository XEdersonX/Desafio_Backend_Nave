import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Candidate from './Candidate';
import Vacancy from './Vacancy';

@Entity('applications')
class Application {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  id_candidate: string;

  @ManyToOne(() => Candidate, { eager: true })
  @JoinColumn({ name: 'id_candidate' })
  candidate: Candidate;

  @Column('uuid')
  id_vacancies: string;

  @ManyToOne(() => Vacancy, { eager: true })
  @JoinColumn({ name: 'id_vacancies' })
  vacancies: Vacancy;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Application;
