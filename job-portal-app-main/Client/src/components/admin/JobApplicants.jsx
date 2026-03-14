import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import JobApplicantsTable from './JobApplicantsTable'
import axios from 'axios'
import { APPLICANT_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const JobApplicants = () => {

    const dispatch = useDispatch();

    const params = useParams();
    const jobId = params.id;

    const { allApplicants } = useSelector(store => store.application)

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const response = await axios.get(`${APPLICANT_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });

                if (response.data.success) {
                    dispatch(setAllApplicants(response.data.job));
                }
                // console.log(response.data);


            } catch (error) {
                console.error(error);
            }
        }
        fetchAllApplicants();
    }, [])



    return (
        <div>
            <Navbar />

            <div className='px-[5%]'>
                <h1 className='font-bold text-xl my-5'>Applicants {allApplicants?.applications?.length || 0}</h1>
                <JobApplicantsTable />
            </div>
        </div>
    )
}

export default JobApplicants
