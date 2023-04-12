import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface PriceRangeSliderProps { 
	min: number;
	max: number;
	priceGap: number;
	setMinValue: Function;
	setMaxValue: Function;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = (props) => {
	const [minInput, setMinInput] = useState<number>(props.min);
	const [maxInput, setMaxInput] = useState<number>(props.max);
	
	const separatorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if(separatorRef.current) {
			if (maxInput - minInput < props.priceGap) {
				setMinInput(maxInput - props.priceGap);
				setMaxInput(minInput + props.priceGap);
			}
			else {
				separatorRef.current.style.left = `${(minInput / props.max) * 100}%`;
				separatorRef.current.style.right = `${100 - (maxInput / props.max) * 100}%`;
			}
			props.setMinValue(minInput);
			props.setMaxValue(maxInput);
		}
		//eslint-disable-next-line
	}, [minInput, maxInput]);	

	return (
		<div className={styles.wrapper}>
			<div className={styles.priceInput}>
				<div className={styles.field}>
					<span>Min</span>
					<input type="number" className="input-min" name="" value={minInput} onChange={e => setMinInput(parseInt(e.target.value))} disabled />
				</div>
				<div className={styles.separator}>-</div>
				<div className={styles.field}>
					<span>Max</span>
					<input type="number" className="input-max" name="" value={maxInput} onChange={e => setMaxInput(parseInt(e.target.value))} disabled />
				</div>
			</div>
			<div className={styles.slider}>
				<div className={styles.progress} ref={separatorRef}></div>
				<div className={styles.rangeInput}>
					<input type="range" className="range-min" min={props.min} max={props.max} value={minInput} onChange={e => setMinInput(parseInt(e.target.value))} />
					<input type="range" className="range-max" min={props.min} max={props.max} value={maxInput} onChange={e => setMaxInput(parseInt(e.target.value))} />
				</div>
			</div>
		</div>
	);
};

export default PriceRangeSlider;
