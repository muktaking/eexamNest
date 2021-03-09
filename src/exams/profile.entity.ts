import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExamProfile } from "./examProfile.entity";

export interface ExamStat {
  id: string;
  attemptNumbers: number;
  averageScore: number;
  totalMark: number;
  firstAttemptTime: number;
  lastAttemptTime: number;
}

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user: string; // store user email

  @OneToMany(
    () => ExamProfile,
    (examProfile) => examProfile.profile,
    { cascade: true, eager: true }
  )
  @JoinColumn({ name: "exams" })
  exams: ExamProfile[];
}
