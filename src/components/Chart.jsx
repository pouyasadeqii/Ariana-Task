import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/UsersDataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [userNames, setUserNames] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const skills = state.users.map((user) => user.skills.length);

  const labels = userNames;

  const data = {
    labels,
    datasets: [
      {
        label: "Skills",
        data: [...skills, 5, 6],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Users Skills Chart",
      },
    },
  };

  const styles = {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    padding: "2rem 10rem",
  };

  useEffect(() => {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      const names = data.users.map((user) => `${user.name} ${user.lastName}`);
      setUserNames([...names]);
    }
  }, [state.users.length]);

  return (
    <div style={styles}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
