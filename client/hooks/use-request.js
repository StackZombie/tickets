import { useState } from "react";
import axios from "axios";

export default ({url,method,body, onSuccess}) => {
  const [errors,setErrors] = useState('');

  const doRequest = async () => {
    try{
      setErrors(null);
      const response = await axios[method.toLowerCase()](url,body);
      if(onSuccess){
        onSuccess(response.data);
      }
    }catch(err){
      setErrors(<div className="alert alert-danger">
      <h4>Something went wrong ....</h4>
      <ul className="my-0">
         {err.response.data.errors.map(err=><li key={err.message}>{err.message}</li>)}
      </ul>
    </div>);
    }
  }

  return {errors, doRequest};
}