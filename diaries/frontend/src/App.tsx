import React, { useEffect, useState } from "react";
import axios from "axios";

interface Diary {
  id: string;
  date: string;
  weather: "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
  visibility: "great" | "good" | "ok" | "poor";
  comment: string;
}

const App = () =>  {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [commentInput, setCommentInput] = useState<string>("");

  useEffect(() => {
    axios.get<Diary[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaries(response.data);
      })
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let diary!: Diary;
    try {
      const response = await axios.post<Diary>("http://localhost:3000/api/diaries", {
        date, visibility, weather, comment: commentInput
      });
      diary = response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data);
        return;
      }
      console.error(err);
    }
    setDiaries(diaries.concat(diary));
    setError("");
    setDate("");
    setVisibility("");
    setWeather("");
    setCommentInput("");
  };

  return (
    <div>
      {error ? <span style={{ color: "red" }}>{error}</span> : null}
      <form onSubmit={handleSubmit}>
        <label>date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <br/>
        <fieldset>
          <legend>Select visibility:</legend>
          <input type="radio" name="visibility" value="great" onChange={e => setVisibility(e.target.value)}/>
          <label>great</label><br/>
          <input type="radio" name="visibility" value="good" onChange={e => setVisibility(e.target.value)}/>
          <label>good</label><br/>
          <input type="radio" name="visibility" value="ok" onChange={e => setVisibility(e.target.value)}/>
          <label>ok</label><br/>
          <input type="radio" name="visibility" value="poor" onChange={e => setVisibility(e.target.value)}/>
          <label>poor</label><br/>
        </fieldset>
        <fieldset>
          <legend>Select weather:</legend>
          <input type="radio" name="weather" value="sunny" onChange={e => setWeather(e.target.value)}/>
          <label>sunny</label><br/>
          <input type="radio" name="weather" value="rainy" onChange={e => setWeather(e.target.value)}/>
          <label>rainy</label><br/>
          <input type="radio" name="weather" value="cloudy" onChange={e => setWeather(e.target.value)}/>
          <label>cloudy</label><br/>
          <input type="radio" name="weather" value="stormy" onChange={e => setWeather(e.target.value)}/>
          <label>stormy</label><br/>
          <input type="radio" name="weather" value="windy" onChange={e => setWeather(e.target.value)}/>
          <label>windy</label><br/>
        </fieldset>
        <label>comment</label>
        <input type="text" value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
        <br/>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map(({ date, visibility, weather, id }) => (
        <div key={id} >
          <span><strong>{date}</strong></span><br/>
          <span>visibility: {visibility}</span><br/>
          <span>weather: {weather}</span><br/><br/>
        </div>
      ))}
    </div>
  );
};

export default App;
