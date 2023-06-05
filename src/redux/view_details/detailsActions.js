import { VIEW_DETAIL_OPEN, VIEW_DETAIL_CLOSE } from "./detailsType";

export const viewDetailOpen = () => {
    return {
        type: VIEW_DETAIL_OPEN,
        payload: VIEW_DETAIL_OPEN
    }
}

export const viewDetailClose = () => {
    return {
        type: VIEW_DETAIL_CLOSE,
        payload: VIEW_DETAIL_CLOSE
    }
}