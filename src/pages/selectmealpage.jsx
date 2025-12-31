import { useState } from 'react';
import './selectmealpage.css';

function SelectMealPage({ onContinue }) {
  const [mealTimes, setMealTimes] = useState({
    1: { selected: false, startTime: '07:00', endTime: '09:00', period: 'AM' },
    2: { selected: false, startTime: '12:00', endTime: '14:00', period: 'PM' },
    3: { selected: false, startTime: '18:00', endTime: '20:00', period: 'PM' },
    4: { selected: false, startTime: '15:00', endTime: '17:00', period: 'PM' },
  });

  const meals = [
    { id: 1, name: 'Breakfast', image: '/images/tea.png' },
    { id: 2, name: 'Lunch', image: '/images/salad.png' },
    { id: 3, name: 'Dinner', image: '/images/spaghetti.png' },
    { id: 4, name: 'Snacks', image: '/images/cookie.png' },
  ];

  const toggleMeal = (mealId) => {
    setMealTimes(prev => ({
      ...prev,
      [mealId]: {
        ...prev[mealId],
        selected: !prev[mealId].selected
      }
    }));
  };

  const updateTime = (mealId, field, value) => {
    setMealTimes(prev => ({
      ...prev,
      [mealId]: {
        ...prev[mealId],
        [field]: value
      }
    }));
  };

  const handleContinue = () => {
    const selectedMealTypes = meals
      .filter(meal => mealTimes[meal.id]?.selected)
      .map(meal => ({
        id: meal.id,
        name: meal.name,
        ...mealTimes[meal.id]
      }));
    
    if (onContinue) {
      onContinue(selectedMealTypes);
    }
  };

  const selectedCount = Object.values(mealTimes).filter(m => m.selected).length;

  return (
    <div className="selectmeal-container">
      <img src="/images/Group%201.png" alt="WhatToEat Logo" className="logo-top-left" />

      <img src="/images/bread%20image.png" alt="Bread" className="hero-bread" />

      <div className="selectmeal-card">
        <h1>When do you usually eat during the day?</h1>
        <p className="subtitle">Everyone eats differently — some start late, some snack all night. Choose what fits your routine</p>
        
        <div className="meals-list">
          {meals.map(meal => {
            const mealData = mealTimes[meal.id];
            return (
              <div 
                key={meal.id}
                className={`meal-item ${mealData.selected ? 'selected' : ''}`}
              >
                <div className="meal-content">
                  <div className="meal-left">
                    <div className="meal-header">
                      <div className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          id={`meal-${meal.id}`}
                          checked={mealData.selected}
                          onChange={() => toggleMeal(meal.id)}
                          className="meal-checkbox"
                        />
                      </div>
                      <h3 className="meal-name">{meal.name}</h3>
                    </div>
                    
                    <div className="time-selector">
                      <input
                        type="time"
                        value={mealData.startTime}
                        onChange={(e) => updateTime(meal.id, 'startTime', e.target.value)}
                        disabled={!mealData.selected}
                        className="time-input"
                      />
                      <span className="time-separator">to</span>
                      <input
                        type="time"
                        value={mealData.endTime}
                        onChange={(e) => updateTime(meal.id, 'endTime', e.target.value)}
                        disabled={!mealData.selected}
                        className="time-input"
                      />
                      <span className="time-period">{mealData.period}</span>
                    </div>
                  </div>

                  <div className="meal-icon-wrapper">
                    <img src={meal.image} alt={meal.name} className="meal-icon-image" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="button-group">
          <button 
            onClick={() => console.log('Cancelled')} 
            className="cancel-btn"
          >
            Cancel
          </button>
          <button 
            onClick={handleContinue} 
            className="continue-btn"
            disabled={selectedCount === 0}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectMealPage;
