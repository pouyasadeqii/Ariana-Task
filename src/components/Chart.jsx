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
  // const [userNames, setUserNames] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [skillCount, setSkillCount] = useState([]);

  const labels = ["HTML", "JAVASCRIPT", "REACT", "NEXT"];

  const data = {
    labels,
    datasets: [
      {
        label: "User",
        data: [2, 3, 1, 4, 5, 6, 7],
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
    const getData = async () => {
      const skillsName = {
        html: 0,
        javascript: 0,
        next: 0,
        react: 0,
      };
      if (localStorage.getItem("data")) {
        const data = JSON.parse(localStorage.getItem("data"));
        dispatch({ type: "firstTime", payload: data });
        // const names = data.users.map((user) => `${user.name} ${user.lastName}`);
        // setUserNames([...names]);
        const total = await data.users.map((user) => {
          if (user.skills.includes("html")) {
            skillsName.html += 1;
          } else if (user.skills.includes("javascript")) {
            skillsName.javascript += 1;
          } else if (user.skills.includes("react")) {
            skillsName.react += 1;
          } else if (user.skills.includes("next")) {
            skillsName.next += 1;
          }
        });
      }
      console.log(skillsName);
      setSkillCount([
        skillsName.html,
        skillsName.javascript,
        skillsName.react,
        skillsName.next,
      ]);
    };

    getData();
  }, [state.users.length]);

  return (
    <div style={styles}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
