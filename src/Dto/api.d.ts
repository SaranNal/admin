import { CommonArray,CommonObject } from "./generic";
import { AxiosError,AxiosResponse } from "axios";

interface Res {
  data: any;
  message: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string
}

interface loginUserInterface {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface ReblieAPIResponseInterface<T> {
  data: T;
  code: number;
  message: string;
  error: boolean;
  errors: CommonArray;
}

interface ReblieAPIErrorInterface {
  code: number;
  message: string;
  error: boolean;
  errors: Array;
}

export interface ApiResponse<T = any | undefined> extends AxiosResponse<ReblieAPIResponseInterface<T>,any> {
}
export interface ApiError extends AxiosError<ReblieAPIErrorInterface,any> {
}