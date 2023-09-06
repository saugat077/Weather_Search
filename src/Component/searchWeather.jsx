import React, { useEffect, useState } from "react";

const SearchWeather = () => {
    const [state, setSearch] = useState("Kathmandu");
    const [data , setData] = useState([]);
    const [input , setInput]=useState("");
    let componentMounted = true;


    useEffect(() => {
        const fetchWeather = async () =>{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=0818fdc78f4d8657ee70fe337c86142f`);
            if(componentMounted){
                setData(await response.json());
                // console.log(data)
            }
            return () => {
                componentMounted = false;
            }
        }
        fetchWeather();
    }, [state]);

    let emoji = null;
    if(typeof data.main != "undefined"){
        if(data.weather[0].main == "Clouds"){
            emoji = "fa-cloud"
        }else if(data.weather[0].main == "Thunderstorm"){
            emoji = "fa-bolt"
        }else if(data.weather[0].main == "Sunny"){
            emoji = "fa-solid fa-sun fa-spin"
        }else if(data.weather[0].main == "Rain"){
            emoji = "fa-solid fa-cloud-rain"
        }else if(data.weather[0].main == "Snow"){
            emoji = "fa-snow-flake"
        }else {
            emoji = "fa-smog"
        }
    }else{
        return (
            <div>.........Loading</div>
        )
    }

    let temp = (data.main?.temp - 273.15).toFixed(2);
    let temp_min = (data.main?.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main?.temp_max - 273.15).toFixed(2);
    let windspeed = data.wind?.speed;
    let visible = data.sys.country;
    
    // Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear();
    let month = d.toLocaleString("default" , {month:`long`});
    let day = d.toLocaleString("default" , {weekday:`long`});

    //Time
    let time = d.toLocaleString([],{
        hour : '2-digit',
        minute : '2-digit',
        second: '2-digit'
    });

    const handleSubmit = (event)=> {
        event.preventDefault();
        setSearch(input);
    }

    return (
        <div>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card text-white text-center border-0">
                            <img src={`https://source.unsplash.com/random/600x800/?${data.weather[0].main}`} className="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div className="input-group mb-4 w-75 mx-auto">
                                        <input type="search" 
                                        class="form-control" 
                                        placeholder="Search City" 
                                        aria-label="Search City" 
                                        aria-describedby="basic-addon2" name="search"
                                        value={input} onChange={(e)=>setInput(e.target.value)} required/>
                                        <button type="submit" className="input-group-text" id="basic-addon2">
                                        <i className="fas fa-search"></i>
                                        </button>
                                    </div> 
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                <h2 className="card-title">{data.name}</h2>
                                <p className="card-text lead">
                                    {day},{month} {date} , {year} <br />
                                    {time}
                                    </p>
                                <hr />
                                <i className={`fas ${emoji} fa-4x`}></i>
                                <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                                <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                                <p className="lead">{temp_min}&deg;C  |  {temp_max}&deg;C</p>
                                <p>Country-Code {visible} | WindSpeed {windspeed}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchWeather;