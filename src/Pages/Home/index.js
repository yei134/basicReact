import { useState, useEffect, useRef } from "react";
import { API_GET_DATA } from "../../global/constants";
import Edit from "./Components/edit";
import List from "./Components/list";
import "./index.css";

//去json資料庫拿東西出來
async function fetchMatter(setMatter) {
  const res = await fetch(API_GET_DATA);
  const { matter } = await res.json();
  setMatter(matter);
}

async function putMatter(matter) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ matter }),
  });
}

const Home = () => {
  //定義一個react偵測到有變動時要渲染的東西
  const [matter, setMatter] = useState([]);
  const submittingState = useRef(false);

  //定義有變動時要做的動作
  useEffect(() => {
    //matter有變動時，存資料到json
    if (!submittingState.current) {
      //但是當畫面初始化的時候不要把空資料夾更新到json
      return;
    }
    putMatter(matter).then((matter) => (submittingState.current = false)); //要更新json的時候，更改狀態，更新好後再把狀態改回來
  }, [matter]);

  useEffect(() => {
    //網頁開啟時，從json取資料
    fetchMatter(setMatter);
  }, []);

  // const [a ,setA] = useState(100)
  // function plus(){
  //   setA(
  //     function(prev) { //prev取得上一個值
  //       return prev + 20
  //     }
  //   );
  // }
  return (
    <div className="app">
      {/* {a}
      <button onClick={plus}>plus</button> */}
      <Edit add={setMatter} submittingState={submittingState}/>
      <List listMatter={matter} listDelete={setMatter} submittingState={submittingState} />
    </div>
  );
};

export default Home;
