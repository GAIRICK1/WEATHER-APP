import { useContext } from "react"
import WeatherContext from "../context/Weather.context"

function Place(){
   const {place} = useContext(WeatherContext)

    return(
        <div className="place">
            <i className="bi bi-geo-alt-fill"></i>
            <b>{place.name}</b> , {place.country}
        </div>
    )
}

export default Place