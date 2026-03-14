import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table } from '../ui/table'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {

    useGetAllAdminJobs();

    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const [input, setInput] = useState("")

    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])

    return (
        <div>
            <Navbar />
            <div className=' px-[5%] my-10 '>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name, role"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className="cursor-pointer " onClick={() => naviagte("/admin/jobs/create")}>Post New Jobs</Button>
                </div>
                <AdminJobsTable />


            </div>

        </div>
    )
}

export default AdminJobs
