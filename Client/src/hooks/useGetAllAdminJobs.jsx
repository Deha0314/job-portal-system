import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get-recruiter-job`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setAllAdminJobs(response.data.jobs))
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllAdminJobs();
    }, [])



}

export default useGetAllAdminJobs
