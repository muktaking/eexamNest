import { BaseEntity } from "typeorm";
import { ExamProfile } from "./examProfile.entity";
export interface ExamStat {
    id: string;
    attemptNumbers: number;
    averageScore: number;
    totalMark: number;
    firstAttemptTime: number;
    lastAttemptTime: number;
}
export declare class Profile extends BaseEntity {
    id: number;
    user: string;
    exams: ExamProfile[];
}
