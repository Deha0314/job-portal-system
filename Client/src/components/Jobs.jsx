import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarImage } from './ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'


// const jobs = [
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// ]


function Jobs() {

    const dispatch = useDispatch();

    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(state => state.job);

    const { user } = useSelector(store => store.auth);

    const [filterJobs, setFilterJobs] = useState([]);

    const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);




    useEffect(() => {

        if (searchedQuery) {
            const filteredJob = allJobs.filter((job) => {
                return job?.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job?.location.toLowerCase().includes(searchedQuery.toLowerCase())
                // job?.company.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJob)
            // dispatch(setSearchedQuery(""));


        }
        else {
            setFilterJobs(allJobs)
        }

    }, [allJobs, searchedQuery])


    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
            console.log("trr");

        }
    }, [dispatch])

    return (
        <>
            <Navbar />
            <div className='sm:px-[5%] max-sm:px-5 lg:px-[8%] mt-5'>
                <div className=' sm:flex gap-5 mx-0 px-0 '>
                    <div className='sm:min-w-[169px] max-sm:hidden'>
                        <FilterCard />

                    </div>


                    <div className='sm:hidden'>
                        <div className='text-right my-4' onClick={() => setIsFilterBoxOpen(!isFilterBoxOpen)}>
                            <Button className=''>Filter</Button>
                        </div>
                        <motion.div
                            initial={{ opacity: 0.2, y: 100 }}
                            transition={{ duration: 1 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{}}
                            className='mb-5'>
                            {
                                isFilterBoxOpen &&
                                <>
                                    <FilterCard />
                                    <hr />
                                </>

                            }
                        </motion.div>
                    </div>




                    <div className="w-full">
                        {
                            filterJobs.length <= 0 ? <span>No Jobs Found</span> :
                                <div className=' h-[95vh] overflow-y-auto pb-5'>
                                    <div className='max-sm: grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:m-4'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>

                        }
                    </div>

                </div>



            </div>



            <Footer />
        </>
    )
}

export default Jobs