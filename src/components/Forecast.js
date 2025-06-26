import '../styles/components/Forecast.scss'
import HourlyForecastWidget from "./HourlyForecastWidget"
import DailyForecastWidget from "./DailyForecastWidget"
import HorizontallyScrollable from './HorizontallyScrollable';

function Forecast({ title, type, data }) {
  return (
    <div className="Forecast">
      <div className="forecast-container">
        <h3>{title}</h3>
        <HorizontallyScrollable className="widget-container">
          {data.map((singleData, index) => (
            <div key={index}>
              {type === "hourly" ? (
                <HourlyForecastWidget data={singleData} />
              ) : (
                <DailyForecastWidget data={singleData} />
              )}
            </div>
          ))}
        </HorizontallyScrollable>
      </div>
    </div>
  );
}

export default Forecast;
