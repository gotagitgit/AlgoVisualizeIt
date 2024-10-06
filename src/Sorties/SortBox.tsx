import React from 'react'

export interface ISortBox
{
    index: number,
    value: number,
    // isActive: boolean,
    boxState: BoxState
}

export enum BoxState
{
  Normal,
  SwapBox1,
  SwapBox2
}

export function SortBox(props: ISortBox) {
    const { index, value, boxState } = props;

    let boxClass = "box";

    switch (boxState) {
      case BoxState.SwapBox1:
          boxClass = "box1";
        break;
      case BoxState.SwapBox2:
        boxClass = "box2";
        break;
      default:
        boxClass = "box";
        break;
    }

    return (
    <li className={boxClass} key={index}>{value}</li>
  )
}
