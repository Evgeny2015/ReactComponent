import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import SliderInput from './slider-input'
import './range-slider.css'

export interface RangeSliderProps {
    min: number
    max: number
    step: number
    onChange: (value: { min: number, max: number }) => void
}

const colors = { normal: '#20c93c', alert: '#be1c27' }

const RangeSlider: FC<RangeSliderProps> = ({ min, max, step, onChange }) => {
    const [minValue, SetMinValue] = useState(min)
    const [maxValue, SetMaxValue] = useState(max)
    const [color, SetColor] = useState(colors.normal)
    const minValueRef = useRef<HTMLInputElement>(null)
    const maxValueRef = useRef<HTMLInputElement>(null)
    const rangeRef = useRef<HTMLDivElement>(null)

    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    )

    const handleMinInputChanged = (value: number) => {
        const newValue = Math.min(value, maxValue - step)
        SetMinValue(newValue);
    }

    const handleMaxInputChanged = (value: number) => {
        const newValue = Math.max(value, minValue + step)
        SetMaxValue(newValue);
    }

    useEffect(() => {
        if (minValueRef.current) {
            const minPercent = getPercent(+minValueRef.current.value);
            const maxPercent = getPercent(maxValue);

            if (rangeRef.current) {
                rangeRef.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxValue, getPercent]);

    useEffect(() => {
        if (maxValueRef.current) {
            const minPercent = getPercent(minValue)
            const maxPercent = getPercent(+maxValueRef.current.value)

            if (rangeRef.current) {
                rangeRef.current.style.left = `${minPercent}%`
                rangeRef.current.style.width = `${maxPercent - minPercent}%`
            }
        }
    }, [minValue, getPercent]);

    useEffect(() => {
        if (rangeRef.current) {
            const observer = new ResizeObserver((entries) => {
                const { width } = entries[0].contentRect

                if (width > 100) {
                    SetColor(colors.normal)
                }
                else {
                    SetColor(colors.alert)
                }
            })

            observer.observe(rangeRef.current)

            return () => {
                observer.disconnect()
            }
        }
    }, []
    )

    useEffect(() => {
        onChange({ min: minValue, max: maxValue });
    }, [minValue, maxValue, onChange]);

    return (
        <div className='container'>
            <SliderInput
                min={min}
                max={max}
                step={step}
                value={minValue}
                inputRef={minValueRef}
                onChange={handleMinInputChanged}
                className='thumb thumb-left'
            />
            <SliderInput
                min={min}
                max={max}
                step={step}
                value={maxValue}
                inputRef={maxValueRef}
                onChange={handleMaxInputChanged}
                className='thumb thumb-right'
            />
            <div className='slider'>
                <div className='slider-track'/>
                <div ref={rangeRef} className='slider-range' style={{backgroundColor: color}}/>
                <div className='slider-left-value'>{minValue}</div>
                <div className='slider-right-value'>{maxValue}</div>
            </div>
        </div>
    )
}

export default RangeSlider

