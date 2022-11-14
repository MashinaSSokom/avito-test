export interface IComment {
    by: string;
    id: number;
    kids?: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
    deleted?: boolean; //TODO учесть что может вернуться удаленный комментарий (иначе после подгрузки будет видна только дата без текста)
}

