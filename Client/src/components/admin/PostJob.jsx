import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'




const PostJob = () => {

    const { companies } = useSelector(store => store.company)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experience: "",
        jobType: "",
        position: 0,
        companyId: "",
    });

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.companyName.toLowerCase() === value.toLowerCase());
        setInput({ ...input, companyId: selectedCompany._id })
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const postNewJob = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            })

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }




    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={postNewJob} className='p-8 border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2 '>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                placeholder="Write job title"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                placeholder="Write job Description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                placeholder="Seprated with Comma"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                placeholder="Write in LPA"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                placeholder="Job Loaction"
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                placeholder="Full Time or Part Time"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="number"
                                name="experience"
                                placeholder="Experience required"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Position</Label>
                            <Input
                                type="number"
                                name="position"
                                placeholder="Write no. of opening"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>


                        {
                            companies.length > 0
                            &&

                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger>
                                    <SelectValue placeholder={"Select a Company"} />
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem
                                                            key={company._id}
                                                            value={company.companyName}
                                                        >
                                                            {company.companyName}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </SelectTrigger>
                            </Select>
                        }



                    </div>

                    {
                        loading ? <Button className="mt-4 w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin ' /> Please wait</Button>
                            :
                            <Button type="submit" className="w-full mt-4">Post New Job</Button>
                    }


                    {
                        companies.length === 0 &&
                        <p className='text-sm text-red-600 font-bold text-center my-3 hover:text-fuchsia-600 hover:cursor-pointer hover:scale-105 transition-all ' onClick={() => navigate("/admin/companies/create")}>
                            *Please a register a company first
                        </p>
                    }

                </form>

            </div>
        </div>
    )
}

export default PostJob

