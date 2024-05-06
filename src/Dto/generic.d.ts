export interface CommonArray {
    forEach(arg0: (errors: any,index: any) => void): unknown;
    [index: number]: string | CommonObjectWithoutNull | number | null | void | CommonArray | boolean;
}

export interface CommonObject {
    [key: string | number]: string | number | void | CommonArray | CommonObjectWithoutNull | boolean | null;
}

export interface CommonObjectWithoutNull {
    [key: string | number]: string | number | void | CommonArray | CommonObjectWithoutNull | boolean;
}