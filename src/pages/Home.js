import { useEffect } from "react";
import axios from "axios";
import WorkoutForm from "../components/Workouts_Form";
import { useWorkoutContext } from "../hooks/useWorkout";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get("http://localhost:4000/api/workouts");
      dispatch({ type: "SET_WORKOUTS", payload: response.data });
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <Toaster />
      <WorkoutForm />
    </div>
  );
};

export default Home;
