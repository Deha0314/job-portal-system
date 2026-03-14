import { setSingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setSingleCompany(response.data.company))
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchSingleCompany();
    }, [companyId, dispatch])



}

export default useGetCompanyById
