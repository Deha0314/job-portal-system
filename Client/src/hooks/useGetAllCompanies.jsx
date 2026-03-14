import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const useGetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllCompany = async () => {
            try {
                const response = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                });
                if (response.data.success) {
                    dispatch(setCompanies(response.data.companies))
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllCompany();
    }, [])



}

export default useGetAllCompanies

