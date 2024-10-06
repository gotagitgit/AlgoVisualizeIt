import React, { useEffect, useState } from 'react'
import './sort.css'
import { ISortBox, SortBox } from './SortBox'

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
                    isActive: false
                }
            ));

            // setNumbers(randomNumbers);

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
                const box1: ISortBox = {...newSortBoxes[j], isActive: true };
                const box2: ISortBox = {...newSortBoxes[j + 1], isActive: true };

                await MoveBoxesToSwap(j, newSortBoxes, true, setSortBoxes);

                if (box1.value > box2.value)
                {
                    [newSortBoxes[j], newSortBoxes[j + 1]] = [box2, box1];

                    setSortBoxes([...newSortBoxes]);

                    await new Promise(x => setTimeout(x, 500));
                }

                await MoveBoxesToSwap(j, newSortBoxes, false, setSortBoxes);
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

async function MoveBoxesToSwap(
    index: number,
    boxes: ISortBox[],
    isActiveBox: boolean,
    callback: (movedBoxes: ISortBox[]) => void)
{
    const box1: ISortBox = {...boxes[index], isActive: isActiveBox };
    const box2: ISortBox = {...boxes[index + 1], isActive: isActiveBox };

    [boxes[index], boxes[index + 1]] = [box1, box2];

    callback([...boxes]);

    await new Promise(x => setTimeout(x, 500));
}