/*
 * @Author:  
 * @Date: 2024-03-15 18:03:48
 * @LastEditors:  
 * @LastEditTime: 2024-03-15 19:27:39
 * @FilePath: /coral-frontend/src/components/IncrementInput.tsx
 */
import React, { Fragment, useState } from 'react'

export default function IncrementInput({ value, onInput, onIncrement, onDecrement,text,onMint }) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && parseInt(inputValue) >= 1) {
      onInput(inputValue);
    }
  };
  return (
    <div>
    <div className='flex items-center justify-between'>
      <div className='add-minus' onClick={onIncrement}>+</div>
      <input
        className='value'
        type="text"
        placeholder="1"
        required
        value={value}
        onChange={handleInputChange}
      />
      <div className='add-minus' onClick={onDecrement}>-</div>
    </div>
    <div className='mint hidden md:block' onClick={onMint}>{text}</div>
  </div>
  )
}
