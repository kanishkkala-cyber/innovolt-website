import React from 'react';

const RangeSlider = ({ min, max, value, onChange, label, formatValue, step = 1 }) => {
  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value.max) {
      onChange({ min: newMin, max: value.max });
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value.min) {
      onChange({ min: value.min, max: newMax });
    }
  };

  return (
    <div className="range-slider-container">
      <div className="range-slider-header">
        <h4>{label}</h4>
        <div className="range-values">
          <span className="min-value">{formatValue(value.min)}</span>
          <span className="separator">-</span>
          <span className="max-value">{formatValue(value.max)}</span>
        </div>
      </div>
      
      <div className="range-slider-wrapper">
        <div className="range-track">
          <div 
            className="range-fill" 
            style={{
              left: `${((value.min - min) / (max - min)) * 100}%`,
              width: `${((value.max - value.min) / (max - min)) * 100}%`
            }}
          ></div>
          
          <input
            type="range"
            min={min}
            max={max}
            value={value.min}
            onChange={handleMinChange}
            step={step}
            className="range-input range-input-min"
          />
          
          <input
            type="range"
            min={min}
            max={max}
            value={value.max}
            onChange={handleMaxChange}
            step={step}
            className="range-input range-input-max"
          />
        </div>
        
        <div className="range-labels">
          <span className="range-label-min">{formatValue(min)}</span>
          <span className="range-label-max">{formatValue(max)}</span>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
