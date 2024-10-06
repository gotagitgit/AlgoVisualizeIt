import React, { useEffect, useState } from 'react'
import './sort.css'
import { ISortBox, SortBox } from './SortBox'

export function Sort() {

    const [numbers, setNumbers] = useState<number[]>([]);

    const [isSorting, setIsSorting] = useState(false);

    useEffect(() =>
    {
        const generateRandomNumbers = () =>
        {
            const randomNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

            setNumbers(randomNumbers);
        };

        generateRandomNumbers();
    }, []);

    const swapNumbers = async () =>
    {
        setIsSorting(true);

        const sortNumbers = [ ...numbers];

        const numLength = numbers.length;

        for (let i = 0; i < numLength; i++)
        {
            for (let j = 0; j < numLength - 1 - i; j++)
            {
                if (sortNumbers[j] > sortNumbers[j + 1])
                {
                    [sortNumbers[j], sortNumbers[j + 1]] = [sortNumbers[j + 1], sortNumbers[j]];

                    setNumbers([...sortNumbers]);

                    await new Promise(x => setTimeout(x, 1000));
                }
            }
        }

        setIsSorting(false);
    };

    const boxes = numbers.map((number, index) => <SortBox index={index} value={number} isActive={false} />);

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

// function isAllBoxesActive(boxes: ISortBox[], isActive: boolean)
// {
//     const updatedNumbers = numbers.map(x => (
//         {
//             ...x,
//             isActive: isActive,
//         }
//     ));
// }