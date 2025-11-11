import { Team } from "./team";

export type Court = {
    courtId: string;
    courtName: string;
    teams: Team[];
}