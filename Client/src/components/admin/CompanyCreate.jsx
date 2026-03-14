import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setSingleCompany } from '@/redux/companySlice'
import axios from 'axios'

const CompanyCreate = () => {
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("")

    const registerNewCompany = async () => {
        try {

            const response = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            if (response.data.success) {
                dispatch(setSingleCompany(response.data.company))
                const companyId = response?.data?.company?._id;
                toast.success(response.data.message);
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Navbar />

            <div className='px-[5%]'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Comapny Name</h1>
                    <p className='text-gray-500'>Lorem ipsum dolor sit. What would you like to give a Comapny name . change later</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2 "
                    placeholder="Jobhunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")} >Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate


