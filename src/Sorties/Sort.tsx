import React, { useEffect, useState } from 'react'
import './sort.css'
import { BoxState, ISortBox, SortBox } from './SortBox'

export function Sort()
{
    const [sortBoxes, setSortBoxes] = useState<ISortBox[]>([]);

    const [isSorting, setIsSorting] = useState(false);

    useEffect(() =>
    {
        const generateRandomNumbers = () =>
        {
            const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

            const boxes: ISortBox[] = randomNumbers.map((x, index) => (
                {
                    index: index,
                    value: x,
                    boxState: BoxState.Normal
                }
            ));

            setSortBoxes(boxes);
        };

        generateRandomNumbers();
    }, []);

    const swapNumbers = async () =>
    {
        setIsSorting(true);

        let newSortBoxes = [ ...sortBoxes];

        const numLength = sortBoxes.length;

        for (let i = 0; i < numLength; i++)
        {
            for (let j = 0; j < numLength - 1 - i; j++)
            {
                const box1: ISortBox = {...newSortBoxes[j], boxState: BoxState.SwapBox1 };
                const box2: ISortBox = {...newSortBoxes[j + 1], boxState: BoxState.SwapBox2 };

                await ToggleActiveBoxes(j, newSortBoxes, BoxState.SwapBox1, BoxState.SwapBox2, setSortBoxes);

                if (box1.value > box2.value)
                {
                    [newSortBoxes[j], newSortBoxes[j + 1]] = [box2, box1];

                    setSortBoxes([...newSortBoxes]);

                    await new Promise(x => setTimeout(x, 800));
                }

                await ToggleActiveBoxes(j, newSortBoxes, BoxState.Normal, BoxState.Normal, setSortBoxes);
            }
        }

        setIsSorting(false);
    };

    const boxes = sortBoxes.map((box, _) => <SortBox {...box} />);

    return (
        <div className="container">
            <ul className="box-list">
                {boxes}
            </ul>
            <button className="action-button" onClick={swapNumbers}>
                {isSorting ? 'Sorting ...' : 'Sort'}
            </button>
        </div>
    )
}

async function ToggleActiveBoxes(
    index: number,
    boxes: ISortBox[],
    box1State: BoxState,
    box2State: BoxState,
    callback: (movedBoxes: ISortBox[]) => void)
{
    const box1: ISortBox = {...boxes[index], boxState: box1State };
    const box2: ISortBox = {...boxes[index + 1], boxState: box2State };

    [boxes[index], boxes[index + 1]] = [box1, box2];

    callback([...boxes]);

    await new Promise(x => setTimeout(x, 500));
}