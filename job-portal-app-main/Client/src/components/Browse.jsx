import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from "framer-motion"

// const jobs = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ]

const Browse = () => {

    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job)

    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            dispatch(setSearchedQuery(""));
            console.log("jiooo");

        }
    }, [dispatch])

    return (
        <>

            <Navbar />

            <div className='px-[5%] lg:px-[10%] w-full my-10'>
                <motion.h1
                    initial={{ opacity: 0.2, y: 100 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{}}
                    className='font-bold text-xl my-10'>Search Results ({allJobs.length})</motion.h1>

                {
                    allJobs.length <= 0 &&
                    <div className='text-gray-500 hover:text-gray-400 text-xl flex justify-center'>
                        <p className='text-center'>No Jobs Found!</p>
                    </div>
                }

                <motion.div
                    initial={{ opacity: 0.2, y: 100 }}
                    transition={{ duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{}}
                    className=' overflow-y-auto pb-5'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 '>
                        {
                            allJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job} />
                                )
                            })
                        }
                    </div>
                </motion.div>


            </div>

            <Footer />

        </>
    )
}

export default Browse
