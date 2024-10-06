import React from 'react'

export interface ISortBox
{
    index: number,
    value: number,
    isActive: boolean
}

export function SortBox(props: ISortBox) {
    const { index, value, isActive } = props;

    const boxClass = isActive ? "box-swap" : "box";

    return (
    <li className={boxClass} key={index}>{value}</li>
  )
}
