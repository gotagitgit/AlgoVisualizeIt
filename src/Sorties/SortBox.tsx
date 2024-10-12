import React, { useContext } from 'react'
import { SortContext } from './Sort';

export interface ISortBox
{
    index: number,
    value: number,
    boxState: BoxState
}

export enum BoxState
{
  Normal,
  SwapBox1,
  SwapBox2
}

export function SortBox()
{
  const sortContext = useContext(SortContext);

  const boxes = sortContext.sortBoxes.map(x => createBox(x));

  return (
    <ul className="box-list">
      {boxes}
    </ul>
  )
}

function createBox(box: ISortBox)
{
  const { index, value, boxState } = box;

  const boxClass = getBoxStyle(boxState);

  return (
      <li className={boxClass} key={index}>{value}</li>
  )
}

function getBoxStyle(boxState: BoxState)
{
  switch (boxState)
  {
    case BoxState.SwapBox1:
      return "box1";

    case BoxState.SwapBox2:
      return "box2";

    default:
      return "box";
  }
}
