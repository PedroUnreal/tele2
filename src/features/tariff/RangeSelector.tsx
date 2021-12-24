
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addMinutesAction, addGigsAction, addSmsAction } from "../../store/rangeSelectorReducer";

type RangeSelectorProps = {
    label: string;
    values: string[];
}

export function RangeSelector({ label, values }: RangeSelectorProps) {
    const [chosenValue, setChosenValue] = useState(1);
    const dispatch = useDispatch();
    const mapping = new Map()
    const max = values.length - 1


    values.forEach((value, index) => mapping.set(index, value))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChosenValue(+e.target.value);
    }
    
    if (label === "Минуты") {
        var addToStore = (minute: number) => {
            dispatch(addMinutesAction(minute));
        };
    }

    if (label === "Трафик") {
        var addToStore = (minute: number) => {
            dispatch(addGigsAction(minute));
        };
    }

    if (label === "СМС") {
        var addToStore = (minute: number) => {
            dispatch(addSmsAction(minute));
        };
    }
    useEffect(() => addToStore(mapping.get(chosenValue)))


    return (
        <div className="container px-4 m-2" style={{ border: 'solid 1px black' }}>
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

