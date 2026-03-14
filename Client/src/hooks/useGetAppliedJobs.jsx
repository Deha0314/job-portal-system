import { setAllAppliedJobs } from '@/redux/jobSlice';
import { APPLICANT_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAppliedJobs = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAppliedJobs = async () => {
            try {
                const response = await axios.get(`${APPLICANT_API_END_POINT}/get`, {
                    withCredentials: true,
                })
                // console.log(response.data);
                if (response.data.success) {
                    dispatch(setAllAppliedJobs(response.data.application))
                    console.log(response.data.application);

                }

            } catch (error) {
                console.error(error);
            }
        }
        fetchAllAppliedJobs();

    }, [])
}

export default useGetAppliedJobs;
