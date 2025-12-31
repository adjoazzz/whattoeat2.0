import React from "react";

// Mock data structure - replace with props from AddMealsPage
const mockMeals = [
  { id: 1, name: "Kenkey", mealTypes: ["Breakfast"] },
  { id: 2, name: "Jollof and Chicken", mealTypes: ["Lunch", "Dinner"] },
  { id: 3, name: "Banku and fante fante", mealTypes: ["Dinner"] },
  { id: 4, name: "Rice Porridge", mealTypes: ["Breakfast"] },
  { id: 5, name: "Fried Yam and chilli sauce", mealTypes: ["Lunch"] },
  { id: 6, name: "Rice and egg stew", mealTypes: ["Dinner"] },
  { id: 7, name: "Bread and Egg", mealTypes: ["Breakfast"] },
  { id: 8, name: "Rice and chicken stew", mealTypes: ["Lunch"] },
  { id: 9, name: "Yam and egg stew", mealTypes: ["Dinner"] },
  { id: 10, name: "Banku and tilapia", mealTypes: ["Lunch"] },
  { id: 11, name: "Koko", mealTypes: ["Breakfast"] },
  { id: 12, name: "Rice and cabbage stew", mealTypes: ["Dinner"] },
  { id: 13, name: "Eto", mealTypes: ["Breakfast"] },
  { id: 14, name: "Beans and Plantain", mealTypes: ["Lunch"] },
  { id: 15, name: "Yam and garden egg stew", mealTypes: ["Dinner"] },
  { id: 16, name: "Fufu and Palmnut soup", mealTypes: ["Dinner"] }
];

export default function CalendarPage({ customMeals = mockMeals, selectedMealTypes = [] }) {
  // Generate calendar data from custom meals
  const generateCalendarData = () => {
    const days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];
    const mealTypeNames = selectedMealTypes.length > 0 
      ? selectedMealTypes.map(mt => mt.name) 
      : ["Breakfast", "Lunch", "Dinner"];
    
    const calendar = {};
    const mealFrequency = {};
    
    // Initialize frequency counter
    customMeals.forEach(meal => {
      mealFrequency[meal.name] = 0;
    });
    
    // Distribute meals across the week
    days.forEach((day, dayIndex) => {
      calendar[day] = [];
      
      mealTypeNames.forEach(mealType => {
        // Filter meals that match this meal type
        const matchingMeals = customMeals.filter(meal => 
          meal.mealTypes.includes(mealType)
        );
        
        if (matchingMeals.length > 0) {
          // Pick a semi-random meal (deterministic based on day and meal type)
          const index = (dayIndex + mealTypeNames.indexOf(mealType)) % matchingMeals.length;
          const selectedMeal = matchingMeals[index];
          calendar[day].push(selectedMeal.name);
          mealFrequency[selectedMeal.name]++;
        } else {
          calendar[day].push("");
        }
      });
    });
    
    return { calendar, mealFrequency };
  };

  const { calendar, mealFrequency } = generateCalendarData();
  
  const mealTypeNames = selectedMealTypes.length > 0 
    ? selectedMealTypes.map(mt => mt.name) 
    : ["Breakfast", "Lunch", "Dinner"];

  const mealTimes = selectedMealTypes.length > 0
    ? selectedMealTypes.reduce((acc, mt) => {
        acc[mt.name] = `${mt.startTime} - ${mt.endTime}`;
        return acc;
      }, {})
    : {
        "Breakfast": "7AM - 10AM",
        "Lunch": "12PM - 3PM",
        "Dinner": "6PM - 7PM"
      };

  const handleShuffle = () => {
    console.log("Shuffle meals");
    // Add shuffle logic here
  };

  const handleAddMeal = () => {
    console.log("Add meal");
    // Navigate back to add meals page
  };

  const handleGenerateMarketList = () => {
    console.log("Generate market list");
    // Generate shopping list from meals
  };

  // Get current day for highlighting
  const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  const currentDate = new Date().getDate();

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: "'InterDisplay', sans-serif",
      background: '#fafafa',
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: 'white',
        borderBottom: '1px solid #eee',
        flexShrink: 0
      }}>
        <img 
          src="/images/Group%201.png" 
          alt="WhatToEat Logo" 
          style={{
            width: '180px',
            height: 'auto',
            imageRendering: '-webkit-optimize-contrast'
          }}
        />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <button 
            onClick={handleGenerateMarketList}
            style={{
              background: '#F1AB1A',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'white',
              fontFamily: "'InterDisplay', sans-serif"
            }}
          >
            Generate Market List
          </button>
          <button 
            onClick={handleAddMeal}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'InterDisplay', sans-serif"
            }}
          >
            Add Meal
          </button>
          <button 
            onClick={handleShuffle}
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '10px 18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: "'InterDisplay', sans-serif"
            }}
          >
            Shuffle
          </button>

          <div style={{
            width: '32px',
            height: '32px',
            background: '#0d6efd',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700
          }}>M</div>
          <span style={{
            fontSize: '14px',
            fontWeight: 500
          }}>Mabel Austin</span>
        </div>
      </header>

      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '24px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          background: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `200px repeat(${mealTypeNames.length}, 1fr)`,
            marginBottom: '10px',
            gap: '8px'
          }}>
            <div></div>
            {mealTypeNames.map((meal, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px' }}>
                <div style={{
                  fontWeight: 700,
                  marginBottom: '4px',
                  fontFamily: "'Recoletta', serif",
                  fontSize: '1.1rem'
                }}>{meal}</div>
                <div style={{
                  fontSize: '12px',
                  color: '#777'
                }}>{mealTimes[meal]}</div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {Object.entries(calendar).map(([day, mealsArr], rowIndex) => (
              <div
                key={day}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${mealTypeNames.length}, 1fr)`,
                  padding: '16px 0',
                  borderBottom: '1px solid #eee',
                  background: day === today ? '#fff3d9' : 'transparent',
                  borderRadius: day === today ? '8px' : '0',
                  gap: '8px'
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  paddingLeft: '10px'
                }}>
                  <div style={{ fontWeight: 600 }}>{day}</div>
                  <div style={{
                    fontSize: '14px',
                    color: '#b6a67a'
                  }}>{rowIndex + currentDate - new Date().getDay() + 1}</div>
                </div>

                {mealsArr.map((item, i) => (
                  <div key={i} style={{ padding: '6px 10px' }}>
                    {item && (
                      <>
                        <div style={{
                          fontWeight: 500,
                          marginBottom: '4px'
                        }}>{item}</div>
                        <div style={{
                          fontSize: '12px',
                          color: '#777',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <span style={{ fontSize: '14px' }}>🔥</span> {mealFrequency[item]}x this week
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}