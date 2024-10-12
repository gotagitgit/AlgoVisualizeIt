import { ISortBox } from "./SortBox"

export enum SortActionTypes
{
    UPDATE_SORT_BOXES = "UPDATE_SORT_BOXES"
}

export type UpdateSortBoxesAction = {
    type: SortActionTypes.UPDATE_SORT_BOXES,
    payload: ISortBox[]
}

export type Actions =
| UpdateSortBoxesAction