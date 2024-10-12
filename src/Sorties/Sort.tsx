import React, { createContext, useEffect, useReducer, useState } from 'react'
import './sort.css'
import { BoxState, ISortBox, SortBox } from './SortBox'
import { UpdateSortBoxesAction, SortActionTypes } from './sortActions';
import { initialState, ISortState, reducer } from './reducer';

const timeOut = 500;

export const SortContext = createContext<ISortState>(initialState);

export function Sort()
{
    const [state, dispatch] = useReducer(reducer, initialState)

    const [isSorting, setIsSorting] = useState(false);

    useEffect(() =>
    {
        const randomBoxes = generateRandomBoxes();

        updateSortBoxes(dispatch, randomBoxes);
    }, []);

    const swapNumbers = async () =>
    {
        setIsSorting(true);

        await swapBoxes(state, dispatch);

        setIsSorting(false);
    };

    return (
        <SortContext.Provider value={state}>
            <div className="container">
                <SortBox />
                <button className="action-button" onClick={swapNumbers}>
                    {isSorting ? 'Sorting ...' : 'Sort'}
                </button>
            </div>
        </SortContext.Provider>
    )
}

async function swapBoxes(state: ISortState, dispatch: React.Dispatch<UpdateSortBoxesAction>)
{
    let newSortBoxes = [ ...state.sortBoxes];

    const numLength = state.sortBoxes.length;

    for (let i = 0; i < numLength; i++)
    {
        for (let j = 0; j < numLength - 1 - i; j++)
        {
            const box1: ISortBox = {...newSortBoxes[j], boxState: BoxState.SwapBox1 };
            const box2: ISortBox = {...newSortBoxes[j + 1], boxState: BoxState.SwapBox2 };

            await swapBoxesState(j, newSortBoxes, BoxState.SwapBox1, BoxState.SwapBox2, dispatch);

            if (box1.value > box2.value)
            {
                [newSortBoxes[j], newSortBoxes[j + 1]] = [box2, box1];

                updateSortBoxes(dispatch, [...newSortBoxes]);

                await new Promise(x => setTimeout(x, timeOut + 300));
            }

            await swapBoxesState(j, newSortBoxes, BoxState.Normal, BoxState.Normal, dispatch);
        }
    }
}

function updateSortBoxes(dispatch: React.Dispatch<UpdateSortBoxesAction>, boxes: ISortBox[]) {
    dispatch(
    {
        type: SortActionTypes.UPDATE_SORT_BOXES,
        payload: boxes
    });
}

function generateRandomBoxes()
{
    const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

    const boxes: ISortBox[] = randomNumbers.map((x, index) => (
    {
        index: index,
        value: x,
        boxState: BoxState.Normal
    }));

    return boxes;
}

async function swapBoxesState(
    index: number,
    boxes: ISortBox[],
    box1State: BoxState,
    box2State: BoxState,
    dispatch: React.Dispatch<UpdateSortBoxesAction>)
{
    const box1: ISortBox = {...boxes[index], boxState: box1State };
    const box2: ISortBox = {...boxes[index + 1], boxState: box2State };

    [boxes[index], boxes[index + 1]] = [box1, box2];

    updateSortBoxes(dispatch, [...boxes]);

    await new Promise(x => setTimeout(x, timeOut));
}