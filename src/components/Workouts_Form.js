import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkout";

import axios from "axios";
import { toast } from "react-hot-toast";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, settitle] = useState("");
  const [location, setlocation] = useState("");
  const [price, setprice] = useState("");
  const [error, seterror] = useState(null);
  const [emptyFields, setEmptyFields] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, location, price };
    await axios
      .post("https://register-tour-api.vercel.app/api/workouts", workout, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        dispatch({ type: "CREATE_WORKOUT", payload: result.data });
        setEmptyFields("");
        toast.success("Success Register");
        seterror();
      })
      .catch((err) => {
        seterror(err.response.data.error);
        setEmptyFields(err.response.data.emptyFields);
        toast.error("Failed to register, try again");
      })
      .finally(() => {
        setlocation("");
        setprice("");
        settitle("");
      });
  };
  return (
    <form class="create w-full " onSubmit={handleSubmit}>
      <h3>Register a tour</h3>
      <label for="">Tour Name</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          settitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label for="">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => {
          setlocation(e.target.value);
        }}
        className={emptyFields.includes("location") ? "error" : ""}
      />
      <label for="">Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => {
          setprice(e.target.value);
        }}
        className={emptyFields.includes("price") ? "error" : ""}
      />
      <button className="">Register Tour</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
