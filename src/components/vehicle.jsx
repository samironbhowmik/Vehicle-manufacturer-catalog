import React, { useEffect, useState } from 'react'
import "../components/vehicle.css"
import axios from 'axios'
import { Link } from 'react-router-dom'

function Vehicle() {

    const [search, setSearch] = useState("")
    const [list, setList] = useState([])
    const [filter, setFilter] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = async(e)=>{
        const res = await axios.get("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json&page=2")
        console.log(res.data.Results);
        setList(res.data.Results);
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
                            <option value="truck">Truck</option>
                            <option value="passenger car">Multipurpose Passenger Vehicle (MPV)</option>
                            <option value="motor cycle">Motor Cycle</option>
                            <option value="motor cycle">Trailor</option>
                            <option value="motor cycle">Low Speed Vehicle (LSV)</option>
                            <option value="motor cycle">Off Road Vehicle</option>
                            <option value="motor cycle">Bus</option>
                            <option value="motor cycle">Incomplete Vehicle</option>
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
                            return search.toLowerCase() === ""
                            ? item
                            : item.Mfr_Name.toLowerCase().includes(search)
                        }).map((item,id)=>{
                            return(
                                    <tr key={id}>
                                        <Link to="/details">
                                        <td>{item.Mfr_CommonName}</td>
                                        </Link>
                                        <td>{item.Country}</td>
                                        <td>{item.VehicleTypes.Name}</td>
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