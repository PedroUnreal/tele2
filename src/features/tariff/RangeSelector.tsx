
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { addMinutesAction, addGigsAction, addSmsAction } from "../../store/rangeSelectorReducer";


type RangeSelectorProps = {
    label: string;
    values: string[];
    selectedValue: string
}

export function RangeSelector({ label, selectedValue, values }: RangeSelectorProps) {

    let counter = values.indexOf(selectedValue)
    const [chosenValue, setChosenValue] = useState(counter);
    const dispatch = useDispatch();
    const mapping = new Map()
    const max = values.length - 1
    values.forEach((value, index) => mapping.set(index, value))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChosenValue(+e.target.value);

    }
    let addToStore: Function

    if (label === "Минуты") {
        addToStore = (minute: number) => {
            dispatch(addMinutesAction(minute));
        };
    }

    if (label === "Трафик") {
        addToStore = (minute: number) => {
            dispatch(addGigsAction(minute));
        };
    }

    if (label === "СМС") {
        addToStore = (minute: number) => {
            dispatch(addSmsAction(minute));
        };
    }
    useEffect(() => {
        addToStore(mapping.get(chosenValue))
    }, [chosenValue])

    return (
        <div className="container px-4 mb-5" >
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
            <div className="current-option">{selectedValue}</div>
        </div>
    );
}