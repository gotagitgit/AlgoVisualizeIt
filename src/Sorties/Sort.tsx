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

        const newSortBoxes = [ ...sortBoxes];

        const numLength = sortBoxes.length;

        for (let i = 0; i < numLength; i++)
        {
            for (let j = 0; j < numLength - 1 - i; j++)
            {
                const box1: ISortBox = {...newSortBoxes[j], isActive: true };
                const box2: ISortBox = {...newSortBoxes[j + 1], isActive: true };

                if (box1.value > box2.value)
                {
                    [newSortBoxes[j], newSortBoxes[j + 1]] = [box2, box1];

                    setSortBoxes([...newSortBoxes]);

                    await new Promise(x => setTimeout(x, 500));
                }
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