export interface DtoUserData {
    loading: boolean;
    adminData: { [index: string]: any };
    error: string;
    isAuthenticated: boolean;
}

export interface DtoRoutesDefinition {
    path: string;
    element: JSX.Element;
    redirectTo?: string;
    permission?: Array<string>;
}