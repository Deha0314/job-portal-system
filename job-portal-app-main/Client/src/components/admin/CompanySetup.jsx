import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const companyId = params.id;


    useGetCompanyById(companyId);

    const { singleCompany } = useSelector(store => store.company);


    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }


    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append('companyName', input.companyName);
            formData.append('description', input.description);
            formData.append('website', input.website);
            formData.append('location', input.location);
            if (input.file) {
                formData.append('file', input.file);
            }

            const response = await axios.post(`${COMPANY_API_END_POINT}/update/${companyId}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })

            if (response.data.success) {
                navigate("/admin/companies");




                toast.success(response.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        setInput({
            companyName: singleCompany?.companyName || "",
            description: singleCompany?.description || "",
            website: singleCompany?.website || "",
            location: singleCompany?.location || "",
            file: singleCompany?.file || null,
        })
    }, [singleCompany, companyId])


    return (
        <div>
            <Navbar />

            <div className='px-[5%] my-10  '>
                <form onSubmit={submitHandler} className='flex flex-col items-center gap-4'>
                    <div className='flex gap-5 items-center'>
                        <Button onClick={() => navigate("/admin/companies")} type="button" variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold cursor-pointer">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid max-sm:grid-cols-1 grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="companyName"
                                value={input.companyName}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Loaction</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Company Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>



                    {
                        loading ? <Button className="my-4 w-[40%]"><Loader2 className='mr-2 h-4 w-4 animate-spin ' /> Please wait</Button>
                            :
                            <Button type="submit" className="w-[40%] my-4">Update</Button>
                    }

                </form>

            </div>


        </div>
    )
}

export default CompanySetup;
