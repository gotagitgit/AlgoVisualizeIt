import { Actions, SortActionTypes } from "./sortActions"
import { ISortBox } from "./SortBox"

export type ISortState =
{
    sortBoxes: ISortBox[]
}

export const initialState: ISortState =
{
    sortBoxes: []
}

export function reducer(state: ISortState, action: Actions)
{
    switch (action.type) {
        case SortActionTypes.UPDATE_SORT_BOXES:
            return {
                ...state,
                sortBoxes: action.payload
            }
        default:
            return state;
    }
}
