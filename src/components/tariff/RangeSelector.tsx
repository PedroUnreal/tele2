
import React, { useCallback } from 'react';

type RangeSelectorProps = {
	label: string;
	values: string[];
	selectedValue: string;
	onChange: (value: string) => void;
}

/**
 * Компонент выбора значения из диапазона
 */
export function RangeSelector({ label, selectedValue, values, onChange }: RangeSelectorProps) {
	const rangeSelectedValue = values.indexOf(selectedValue);
	const max = values.length - 1;

	const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = values[+event.target.value];
		onChange(newValue);
	}, [values, onChange]);

	return (
		<div className="container px-4 mb-5" >
			<label htmlFor="customRange1" className="form-label">
				{label}
				<input
					type="range"
					value={rangeSelectedValue}
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