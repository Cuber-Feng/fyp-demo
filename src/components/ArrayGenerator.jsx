import { useState } from 'react';

export default function ArrayGenerator({ maxLength, onGenerate }) {
  const [arrayLength, setArrayLength] = useState('6');
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [arrayOrder, setArrayOrder] = useState('random');

  const generateArray = (_length, _duplicates, _order) => {
    const length = _length || Number(arrayLength);
    const duplicates = _duplicates !== undefined ? _duplicates : allowDuplicates;
    const order = _order || arrayOrder;
    const values = [];

    console.log(`Generate array with length: ${length}, duplicates: ${duplicates}, order: ${order}`);

    if (duplicates) {
      let duplicatesCount = 0;
      let numCounts = new Map();
      for (let index = 0; index < length; index += 1) {
        const val = Math.floor(Math.random() * 100) + 1;
        values.push(val);
        numCounts.set(val, (numCounts.get(val) || 0) + 1);
        if (numCounts.get(val) > 1) duplicatesCount++;
        if (index == length - 1 && duplicatesCount === 0) {
          // If no duplicates were generated, force a duplicate
          const duplicateIndex = Math.floor(Math.random() * (length-1));
          values[index] = values[duplicateIndex];
        }
      }
    } else {
      const pool = Array.from({ length: 100 }, (_, index) => index + 1);
      for (let index = 0; index < length; index += 1) {
        const randomIndex = index + Math.floor(Math.random() * (pool.length - index));
        [pool[index], pool[randomIndex]] = [pool[randomIndex], pool[index]];
        values.push(pool[index]);
      }
    }

    if (order === 'ascending') values.sort((a, b) => a - b);
    if (order === 'descending') values.sort((a, b) => b - a);

    onGenerate(values);
  };

  return (
    <div className="array-generator" aria-label="Generate an array">
      <label className="generator-length">
        <span>Length: {arrayLength}</span>
        <input
          type="range"
          min="2"
          max={maxLength}
          value={arrayLength}
          onChange={(event) => { setArrayLength(event.target.value); generateArray(event.target.value, undefined, undefined); }}
        />
      </label>
      <label className="generator-duplicates">
        <input
          type="checkbox"
          checked={allowDuplicates}
          onChange={(event) => { setAllowDuplicates(event.target.checked); generateArray(undefined, event.target.checked, undefined); }}
        />
        <span>Duplicates</span>
      </label>
      
      <label className="generator-order">
        <span>Order</span>
        <select value={arrayOrder} onChange={(event) => { setArrayOrder(event.target.value); generateArray(undefined, undefined, event.target.value); }}>
          <option value="random">Random</option>
          <option value="ascending">Sorted</option>
          <option value="descending">Reverse order</option>
        </select>
      </label>
      <button className="generate-button" type="button" onClick={(e) => generateArray()}>Generate</button>
    </div>
  );
}