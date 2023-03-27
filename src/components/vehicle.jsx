import React, { useEffect, useState } from 'react'
import "../components/vehicle.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Vehicle() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [filter, setFilter] = useState("")
    useEffect(()=>{
        getData()
        // handleClick()
    },[])
    const getData = async(e)=>{
        const res = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2")
        console.log(res.data.Results);
        setList(res.data.Results);
    }

    const handleClick = ()=>{
        navigate("/details")
    }
  return (
    <div>
        <div className="container">
            <h1>Vehicle Manufacturers</h1>

            <div className="header">
                <div className="left">
                    <form className='search-header'>
                        <label htmlFor="search">Search: </label>
                        <input type="text" placeholder='Search' className='search' onChange={(e)=>{setSearch(e.target.value)}}/>
                    </form>
                </div>

                <div className="right">
                <form className='filter-header'>
                        <label htmlFor="search">Filter by vehicle type: </label>
                        <select name="" id="filter" onChange={(e)=>{setFilter(e.target.value)}} value={filter}>
                            
                            <option value="all">All</option>
                            <option value="passenger car">Passenger Car</option>
                            <option value="Truck">Truck</option>
                            <option value="Multipurpose Passenger Vehicle (MPV)">Multipurpose Passenger Vehicle (MPV)</option>
                            <option value="motor cycle">Motor Cycle</option>
                            <option value="trailer">Trailer</option>
                            <option value="lsv">Low Speed Vehicle (LSV)</option>
                            <option value="off road">Off Road Vehicle</option>
                            <option value="bus">Bus</option>
                            <option value="incomplete vehicle">Incomplete Vehicle</option>
                        </select>
                    </form>
                </div>
            </div>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Country</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>Car</td>
                            <td>USA</td>
                            <td>Truck</td>
                        </tr> */}
                        {list.filter((item)=>{
                            if (filter === "") {
                                return true;
                            } else {
                                return item.VehicleTypes.some((type)=> {
                                    return type.Name.toLowerCase() === filter.toLowerCase();
                                })
                            }
                        }).filter((item)=>{
                            return search.toLowerCase() === ""
                            ? item
                            : item.Mfr_Name.toLowerCase().includes(search)
                        }).map((item,id)=>{
                            return(
                                    <tr onClick={handleClick} key={id}>
                                        <td>{item.Mfr_CommonName}</td>
                                        <td>{item.Country}</td>
                                        <td>{item.VehicleTypes.length > 0 ? item.VehicleTypes[0].Name : ""}</td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    </div>
  )
}

export default Vehicle