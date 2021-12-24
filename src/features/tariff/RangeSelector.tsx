
import React, {useState} from 'react';

type RangeSelectorProps = {
    label: string;
    values: string[];
}

export function RangeSelector({ label, values }: RangeSelectorProps) {
    const [chosenValue, setChosenValue] = useState(1);
    const mapping = new Map()
    const max = values.length-1

    values.forEach((value, index) => mapping.set(index, value) )
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChosenValue(+e.target.value);
    }
    
    return (
        <div className="container px-4 m-2" style={{border: 'solid 1px black'}}>
            <label htmlFor="customRange1" className="form-label">{label}
                <input
                    type="range"
                    value={chosenValue}
                    className="form-range"
                    min={0} 
                    max={max} 
                    step={1}
                    onChange={handleChange}
                />
            </label>
            <div>{mapping.get(chosenValue)}</div>
        </div>
    );
}

