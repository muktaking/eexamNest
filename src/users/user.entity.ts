import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";

export enum RolePermitted {
  guest = 0,
  student = 1,
  mentor = 2,
  moderator = 3,
  coordinator = 4,
  admin = 5,
}
export enum Gender {
  male = "male",
  female = "female",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 15, nullable: false })
  firstName: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  userName: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  avatar: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "enum", enum: Gender })
  gender: Gender;

  @Column({ type: "enum", enum: RolePermitted, default: RolePermitted.student })
  role: RolePermitted;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Timestamp;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ nullable: true })
  resetTokenExpiration: string;
}
