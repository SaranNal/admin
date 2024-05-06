import React from "react";
import axios from "axios";

export const PostApiMethod = (
    routeName: string,
    body: object,
    headers: { [index: string]: { [index: string]: string } } = { headers: {} }
) => {
    return axios.post(
        `${process.env.REACT_APP_API_URL}/${routeName}`,
        body,
        headers
    );
};

export const GetApiMethod = (routeName: string,headers: { [index: string]: { [index: string]: string } } = { headers: {} }) => {
    return axios.get(
        `${process.env.REACT_APP_API_URL}/${routeName}`,
        headers
    );
};

export const PutApiMethod = (routeName: string,body: object) => {
    return axios.put(
        `${process.env.REACT_APP_API_URL}/${routeName}`,
        JSON.stringify(body)
    );
};

export const DeleteApiMethod = (routeName: string) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/${routeName}`);
};