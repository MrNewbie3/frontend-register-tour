import WorkoutForm from "../components/Workouts_Form";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <div className="home">
      <Toaster />
      <WorkoutForm />
    </div>
  );
};

export default Home;
