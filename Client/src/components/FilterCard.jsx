import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

// location
// salary
// job types

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bengluru", "Mumbai", "Hyderabad", "Ranchi", "Patna"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Scientist", "Machine Learning"]
    },
    {
        filterType: "Salary",
        array: ["6-10 LPA", "10-40 LPA", "40-100 LPA" ,"100+"]
    }
]


const FilterCard = () => {
    useGetAllJobs()

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }


    useEffect(() => {
        // console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='w-full bg-white py-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index - idx}`
                                    return (
                                        <div className='flex items-center spac-x-2 gap-1 my-2' key={idx}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className="text-base/5" htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>



        </div>
    )
}

export default FilterCard
