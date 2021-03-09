import { BaseEntity, Timestamp } from "typeorm";
import { Profile } from "./profile.entity";
export declare class ExamProfile extends BaseEntity {
    updateAvgScore(v: any): any;
    id: number;
    examId: number;
    attemptNumbers: number;
    averageScore: number;
    totalMark: number;
    firstAttemptTime: Timestamp;
    lastAttemptTime: Timestamp;
    profile: Profile;
}
