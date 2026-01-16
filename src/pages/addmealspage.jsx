// Custom dropdown for meal types with color circle
function MealTypeDropdown({ mealTypes, value, onChange, mealTypeColors }) {
  const [open, setOpen] = useState(false);
  const handleSelect = (type) => {
    onChange(type);
    setOpen(false);
  };
  return (
    <div className="custom-dropdown" tabIndex={0} onBlur={() => setOpen(false)}>
      <div className="dropdown-selected" onClick={() => setOpen((o) => !o)}>
        {value ? (
          <>
            <span className="dropdown-label">{value}</span>
            <span className="dropdown-color-circle" style={{ backgroundColor: mealTypeColors[value] }}></span>
          </>
        ) : (
          <span className="dropdown-placeholder">Select meal type</span>
        )}
        <span className="dropdown-arrow">▼</span>
      </div>
      {open && (
        <div className="dropdown-list">
          {mealTypes.map(type => (
            <div key={type.id} className="dropdown-option" onClick={() => handleSelect(type.name)}>
              <span className="dropdown-label">{type.name}</span>
              <span className="dropdown-color-circle" style={{ backgroundColor: mealTypeColors[type.name] }}></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
// Custom multi-select dropdown for up to 2 meal types
function MultiSelectDropdown({ mealTypes, selected, onChange, mealTypeColors }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="custom-dropdown" tabIndex={0} onBlur={() => setOpen(false)} style={{ minWidth: 180 }}>
      <div className="dropdown-selected" onClick={() => setOpen((o) => !o)}>
        {selected.length > 0 ? (
          <>
            {selected.map(type => (
              <span key={type} className="meal-type-btn-circle" style={{ backgroundColor: mealTypeColors[type] }}></span>
            ))}
            <span className="dropdown-label">{selected.join(", ")}</span>
          </>
        ) : (
          <span className="dropdown-placeholder">Select up to 2 types</span>
        )}
        <span className="dropdown-arrow">▼</span>
      </div>
      {open && (
        <div className="dropdown-list">
          {mealTypes.map(type => {
            const checked = selected.includes(type.name);
            const disabled = !checked && selected.length >= 2;
            return (
              <div key={type.id} className={`dropdown-option${disabled ? ' disabled' : ''}`} onClick={() => !disabled && onChange(type.name)}>
                <span className="dropdown-label">{type.name}</span>
                <span className="meal-type-btn-circle" style={{ backgroundColor: mealTypeColors[type.name] }}></span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
import './addmealspage.css';

function AddMealsPage({ selectedMealTypes, onContinue }) {
  const [customMeals, setCustomMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState({
    name: '',
    mealTypes: []
  });

  // Generate random color for each meal
  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B195', '#C06C84'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Assign a random color to each meal type (memoized for consistency)
  const [mealTypeColors] = useState(() => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B195', '#C06C84'
    ];
    const map = {};
    (selectedMealTypes || []).forEach((type, idx) => {
      map[type.name] = colors[idx % colors.length];
    });
    return map;
  });

  // Toggle meal type selection (max 2)
  const handleMealTypeToggle = (type) => {
    setCurrentMeal(prev => {
      const exists = prev.mealTypes.includes(type);
      if (exists) {
        return { ...prev, mealTypes: prev.mealTypes.filter(t => t !== type) };
      } else if (prev.mealTypes.length < 2) {
        return { ...prev, mealTypes: [...prev.mealTypes, type] };
      }
      return prev;
    });
  };

  const handleAddMeal = () => {
    if (currentMeal.name.trim() && currentMeal.mealTypes.length > 0) {
      const newMeal = {
        id: Date.now(),
        name: currentMeal.name.trim(),
        mealTypes: [...currentMeal.mealTypes]
      };
      setCustomMeals([...customMeals, newMeal]);
      setCurrentMeal({ name: '', mealTypes: [] });
    }
  };

  const handleRemoveMeal = (id) => {
    setCustomMeals(customMeals.filter(meal => meal.id !== id));
  };

  const handleContinue = () => {
    console.log('Custom meals:', customMeals);
    if (onContinue) onContinue();
  };

  return (
    <div className="addmeals-container">
      {/* <img src="/images/Group%201.png" alt="WhatToEat Logo" className="logo-top-left" />

      <img src="/images/Plan%20Your%20Week%20with%20Avocados%201.png" alt="Plan Your Week with Avocados" className="hero-bread" /> */}

      <div className="addmeals-card">
        <h1>What meals do you usually eat?</h1>
        <p className="subtitle">Add the specific meals you typically enjoy during your selected meal times</p>
        
        <div className="meal-input-section">
          <form className="input-group input-row" onSubmit={e => { e.preventDefault(); handleAddMeal(); }}>
            <input
              type="text"
              placeholder="Enter meal name (e.g., Pancakes, Caesar Salad)"
              value={currentMeal.name}
              onChange={(e) => setCurrentMeal({ ...currentMeal, name: e.target.value })}
              className="meal-name-input"
            />
            <MultiSelectDropdown
              mealTypes={selectedMealTypes || []}
              selected={currentMeal.mealTypes}
              onChange={handleMealTypeToggle}
              mealTypeColors={mealTypeColors}
            />
            <button type="submit" className="add-btn" style={{ marginLeft: 8 }}>
              Add Meal
            </button>
          </form>
        </div>

        <div className="meals-display wide-display">
          {customMeals.length > 0 ? (
            customMeals.map(meal => (
              <div key={meal.id} className="custom-meal-item">
                <div className="meal-chip">
                  {meal.mealTypes.map(type => (
                    <span key={type} className="meal-color-circle" style={{ backgroundColor: mealTypeColors[type] }}></span>
                  ))}
                  <span className="meal-name-text">{meal.name}</span>
                  <span 
                    onClick={() => handleRemoveMeal(meal.id)}
                    style={{ cursor: 'pointer', color: '#999', fontSize: '1.5rem', padding: '0 6px', lineHeight: 1 }}
                    onMouseOver={e => e.currentTarget.style.color = '#ff4444'}
                    onMouseOut={e => e.currentTarget.style.color = '#999'}
                  >
                    ×
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-message">No meals added yet. Start by adding your favorite meals above.</p>
          )}
        </div>

        <div className="button-group">
          <button 
            onClick={() => console.log('Back')} 
            className="cancel-btn"
          >
            Back
          </button>
          <button 
            onClick={handleContinue} 
            className="continue-btn"
            disabled={customMeals.length === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMealsPage;
