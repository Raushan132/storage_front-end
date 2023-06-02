import { GRIDVIEW,LISTVIEW } from "./viewTypes";

export const gridView =(view)=>{
    return { type: GRIDVIEW,
      payload: view
        }
    }

export const listView =(view)=>{
    return {
        type: LISTVIEW,
    payload: view
    }

}