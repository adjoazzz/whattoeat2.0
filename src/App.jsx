import { useState } from "react";
import SignUpPage from "./pages/signuppage";
import SelectMealPage from "./pages/selectmealpage";
import AddMealsPage from "./pages/addmealspage";
import CalendarPage from "./pages/calendarpage";

function App(){
  const [currentPage, setCurrentPage] = useState('signup');
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);

  const navigateToSelectMeal = () => {
    setCurrentPage('selectmeal');
  };

  const navigateToAddMeals = (mealTypes) => {
    setSelectedMealTypes(mealTypes);
    setCurrentPage('addmeals');
  };

  const navigateToCalendar = () => {
    setCurrentPage('calendar');
  };

  return (
    <>
      {currentPage === 'signup' && <SignUpPage onSignUpSuccess={navigateToSelectMeal} />}
      {currentPage === 'selectmeal' && <SelectMealPage onContinue={navigateToAddMeals} />}
      {currentPage === 'addmeals' && <AddMealsPage selectedMealTypes={selectedMealTypes} onContinue={navigateToCalendar} />}
      {currentPage === 'calendar' && <CalendarPage />}
    </>
  );
}

export default App;