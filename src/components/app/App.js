import Header from "../Header/Header";
import WeatherCard from "../WeatherCard/WeatherCard";

import "./App.css";

function App() {
  return (
    <div className="page">
      <section className="Header">
        <Header />
      </section>
      <section className="Main">
        <WeatherCard day={false} type="snowing" />
      </section>
    </div>
  );
}

export default App;
