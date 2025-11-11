export interface User {
    userId: string;
    userName: string;
    email: string;
    telephoneNumber: string;
}

export interface TeamJson {
    _id: string;
    id: string;
    name: string;
    description: string;
    members: User[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    __V: number;
}

export interface CourtItem {
    _id: string;
    id: string;
    name: string;
    location: string;
    type: string;
    capacity: number;
    pricePerHour: number;
    description: string;
    facilities: string[];
    available: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CourtJson {
    success: boolean;
    data: CourtItem[];
}