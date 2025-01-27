import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const baseForm = {
  country: "",
  gold: 0,
  silver: 0,
  bronze: 0,
};

function App() {
  const [medalLists, setMedalLists] = useState(
    JSON.parse(localStorage.getItem("medalList")) || []
  );
  const [newMedalList, setNewMedalLists] = useState(baseForm);
  const resetForm = () => {
    setNewMedalLists(baseForm);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewMedalLists({ ...newMedalList, [name]: value });
  };

  const handleAddBtn = (e) => {
    e.preventDefault();

    setMedalLists([...medalLists, newMedalList]);
    localStorage.setItem(
      "medalList",
      JSON.stringify([...medalLists, newMedalList])
    );

    resetForm();
  };

  const handleUpdateBtn = (e) => {
    e.preventDefault();
    const valueIndex = medalLists.findIndex(
      (medalList) => medalList.country === newMedalList.country
    );
    //조건 만약 valueIndex 가 -1이면, 존재하지 않는 국가, 인덱스값이 있으면 해당 인덱스를 new메달리스트로 변경
    if (valueIndex === -1) {
      alert("존재하지 않는 국가입니다");
      return;
    }
    const updateMedalList = [...medalLists];
    updateMedalList[valueIndex] = newMedalList;
    setMedalLists(updateMedalList);
    localStorage.setItem("medalList", JSON.stringify(updateMedalList));
    resetForm();
  };

  const handleDeleteBtn = (country) => {
    const updatedMedalList = medalLists.filter(
      (medalList) => medalList.country !== country
    );
    setMedalLists(updatedMedalList);
    localStorage.setItem("medalList", JSON.stringify(updatedMedalList));
  };

  //정렬하기, 기본값 금메달순
  const [mode, setMode] = useState("sortByGold");

  const handleMode = (e) => {
    setMode(e.target.name);
  };

  const sortMedalLists = () => {
    if (mode === "sortByGold") {
      return [...medalLists].sort((a, b) => b.gold - a.gold);
    }
    if (mode === "sortByTotal") {
      return [...medalLists].sort(
        (a, b) => b.gold + b.silver + b.bronze - (a.gold + a.silver + a.bronze)
      );
    }
  };
  return (
    <>
      <h2>2024 파리 올림픽</h2>
      <form onSubmit={handleAddBtn}>
        <label>
          국가명
          <input
            type="text"
            value={newMedalList.country}
            onChange={handleOnChange}
            name="country"
            required
          />
        </label>
        <label>
          금메달
          <input
            type="number"
            value={newMedalList.gold}
            onChange={handleOnChange}
            name="gold"
            required
            min="0"
          />
        </label>
        <label>
          은메달
          <input
            type="number"
            value={newMedalList.silver}
            onChange={handleOnChange}
            name="silver"
            required
            min="0"
          />
        </label>
        <label>
          동메달
          <input
            type="number"
            value={newMedalList.bronze}
            onChange={handleOnChange}
            name="bronze"
            required
            min="0"
          />
        </label>
        <button type="submit">국가추가</button>
        <button onClick={handleUpdateBtn}>업데이트</button>
      </form>
      <div>
        <label>
          <input
            type="radio"
            checked={mode === "sortByGold"}
            name="sortByGold"
            onChange={handleMode}
          />
          금메달순
        </label>
        <label>
          <input
            type="radio"
            checked={mode === "sortByTotal"}
            name="sortByTotal"
            onChange={handleMode}
          />
          총메달순
        </label>
        <table>
          <thead>
            <tr>
              <th>국가명</th>
              <th>금메달</th>
              <th>은메달</th>
              <th>동메달</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {sortMedalLists().map((medalList) => (
              <tr key={medalList.country}>
                <td>{medalList.country}</td>
                <td>{medalList.gold}</td>
                <td>{medalList.silver}</td>
                <td>{medalList.bronze}</td>
                <td>
                  <button onClick={() => handleDeleteBtn(medalList.country)}>
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
