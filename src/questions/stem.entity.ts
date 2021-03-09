import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Stem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  qStem: string;

  @Column({ type: "varchar", length: 1, nullable: false })
  aStem: string;

  @Column({ type: "varchar", length: 200 })
  fbStem?: string;

  @ManyToOne(
    () => Question,
    (question) => question.stems
  )
  question: Question;
}
