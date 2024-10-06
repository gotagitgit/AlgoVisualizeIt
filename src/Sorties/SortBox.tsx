import React from 'react'

export interface ISortBox
{
    index: number,
    value: number,
    isActive: boolean
}

export function SortBox(props: ISortBox) {
    const { index, value } = props;

    return (
    <li className="box" key={index}>{value}</li>
  )
}
