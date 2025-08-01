import React from 'react';

/**
 * Helper functions to create common control section patterns
 */

export interface ControlSectionConfig {
  title: string;
  content: React.ReactNode;
  condition?: boolean;
}

/**
 * Creates a basic info display section
 */
export const createInfoSection = (title: string, description: string | string[]): ControlSectionConfig => ({
  title,
  content: (
    <div className="info-display">
      {Array.isArray(description) ? (
        description.map((text, index) => <p key={index}>{text}</p>)
      ) : (
        <p>{description}</p>
      )}
    </div>
  )
});

/**
 * Creates a slider control section
 */
export const createSliderSection = (
  title: string,
  value: number,
  min: number,
  max: number,
  step: number,
  onChange: (value: number) => void,
  formatValue?: (value: number) => string,
  additionalInfo?: React.ReactNode
): ControlSectionConfig => ({
  title,
  content: (
    <div className="control-group">
      <label className="control-label">
        {title}: {formatValue ? formatValue(value) : value}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="control-slider"
      />
      {additionalInfo && <div className="info-display">{additionalInfo}</div>}
    </div>
  )
});

/**
 * Creates a button group section
 */
export const createButtonGroupSection = (
  title: string,
  buttons: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger' | 'warning';
    disabled?: boolean;
  }>,
  instruction?: string
): ControlSectionConfig => ({
  title,
  content: (
    <div className="control-group">
      {instruction && <p className="instruction">{instruction}</p>}
      <div className="button-group">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`control-button ${button.variant || 'primary'}`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  )
});

/**
 * Creates a color picker section
 */
export const createColorPickerSection = (
  title: string,
  selectedColor: string,
  colors: Array<{ name: string; value: string }>,
  onChange: (color: string) => void
): ControlSectionConfig => ({
  title,
  content: (
    <div className="control-group">
      <label className="control-label">{title}:</label>
      <div className="color-picker">
        {colors.map(color => (
          <button
            key={color.value}
            onClick={() => onChange(color.value)}
            className={`color-button ${selectedColor === color.value ? 'selected' : ''}`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          />
        ))}
      </div>
    </div>
  )
});

/**
 * Creates a list selection section
 */
export const createListSelectionSection = (
  title: string,
  items: Array<{
    id: string;
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  }>,
  selectedId: string | null,
  onSelect: (id: string) => void,
  instruction?: string
): ControlSectionConfig => ({
  title,
  content: (
    <div>
      {instruction && <p className="instruction">{instruction}</p>}
      <div className="list-selection">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`list-button ${selectedId === item.id ? 'selected' : ''}`}
            style={{
              borderColor: item.color,
              backgroundColor: selectedId === item.id ? (item.color + '20') : 'transparent'
            }}
          >
            {item.icon && <span className="list-icon">{item.icon}</span>}
            <div className="list-info">
              <strong>{item.name}</strong>
              {item.description && <div>{item.description}</div>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
});

/**
 * Creates a statistics display section
 */
export const createStatsSection = (
  title: string,
  stats: Array<{ label: string; value: string | number }>
): ControlSectionConfig => ({
  title,
  content: (
    <div className="stats-display">
      {stats.map((stat, index) => (
        <div key={index} className="stat-item">
          <strong>{stat.label}:</strong> {stat.value}
        </div>
      ))}
    </div>
  )
});

/**
 * Creates a toggle section
 */
export const createToggleSection = (
  title: string,
  isEnabled: boolean,
  onToggle: () => void,
  enabledLabel: string = 'Enabled',
  disabledLabel: string = 'Disabled',
  instruction?: string
): ControlSectionConfig => ({
  title,
  content: (
    <div className="control-group">
      {instruction && <p className="instruction">{instruction}</p>}
      <button 
        onClick={onToggle}
        className={`control-button ${isEnabled ? 'warning' : 'primary'}`}
      >
        {isEnabled ? enabledLabel : disabledLabel}
      </button>
    </div>
  )
});

/**
 * Formats distance values
 */
export const formatDistance = (value: number): string => {
  return value >= 1000 ? `${value/1000}km` : `${value}m`;
};

/**
 * Formats area values
 */
export const formatArea = (radius: number): string => {
  const area = Math.PI * Math.pow(radius, 2);
  return `${(area / 1000000).toFixed(2)} km²`;
};

/**
 * Formats coordinates
 */
export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};