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
        alert(data.message);
      },
      onError: (error) => {
        console.log(error.message);
        alert(error.message);
      },
    });
  
    return { mutate, isLoading,serverError, setServerError };
  }

  export function updateProduct() {
    let [updateError, setUpdateError] = useState(null);
  
    const { mutate, isLoading } = useMutation( async (input)=>{
        console.log("update",input);
        const response = await HttpClient.put(`${API_ENDPOINTS.PRODUCTS}/${input.id}`, input);
        return response;
    }
    , {
      onSuccess: (data) => {
        console.log("Product updated Successfully");
        alert(data.message);
      },
      onError: (error) => {
        console.log(error.message);
        alert(error.message);
      },
    });
  
    return { mutate, isUpdateLoading:isLoading,updateError, setUpdateError };
  }