import { User } from "./user";

export type Team = {
    teamId: string;
    teamName: string;
    Users: User[];
}