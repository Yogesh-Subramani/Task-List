export type Todo = {
    id:number;
    title:string;
    description:string;
    isImportant:boolean;    
    isCompleted:boolean;
    date:number;
}

export type MenuItem = {
    id: number;
    title: string;
    icon: React.ReactElement;
    link: string;
}

export type ErrorObject = {
    title?:string;
    description?:string;
    date?:string;
}