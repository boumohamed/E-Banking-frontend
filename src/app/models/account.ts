export interface Account {
    id:          string;
    type:        string;
    currantPage: number;
    totalePages: number;
    pageSize:    number;
    operations:  Operation[];
    balance:     number;
}

export interface Operation {
    id:            number;
    dateOperation: Date;
    amount:        number;
    type:          string;
    description:   string;
}