import React from "react";
import { toErrorWithMessage } from "~/utils/errors";

export default function useFetch() {
  return {
    get: async function get<T>(
      url: string,
      init?: RequestInit
    ): Promise<T | Error> {
      try {
        const req = await fetch(url, init);
        if(!req.ok) {
          console.log('a')
          let err: Error
          switch(req.status){
            case 404:
              err = new Error(`page ${req.url} not found`);
              throw err;
          }
          throw (await req.json())
        }
        return await req.json();
      } catch (error) {
        return new Error(toErrorWithMessage(error).message)
      }
    },
  };
}
