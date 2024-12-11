import { API_ENDPOINTS } from "./client/endpoints";
import { HttpClient } from "./client/http-client";

import {
    useMutation,
  } from 'react-query';

import { useState } from 'react';

export function addProduct() {
    let [serverError, setServerError] = useState(null);
  
    const { mutate, isLoading } = useMutation( async (input)=>{
        const response = await HttpClient.post(API_ENDPOINTS.PRODUCTS, input);
        return response;
    }
    , {
      onSuccess: (data) => {
        console.log("Product Added Successfully");
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
        alert(error.message);
      },
    });
  
    return { mutate, isLoading,serverError, setServerError };
  }