import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from "framer-motion"


function LatestJobs() {

    const { allJobs } = useSelector(state => state.job);


    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}
            className='px-[5%] w-full my-20'>
            <h1 className='text-xl sm:text-3xl lg:text-4xl font-bold'><span className='text-[#6A38C2]'>Latest & Top</span> Job Openings</h1>
            {/* cards for job openings */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
                {
                    allJobs?.slice(0, 7).map((job, index) => (
                        <LatestJobCards key={job._id} job={job} />
                    ))
                }
            </div>



        </motion.div>
    )
}

export default LatestJobs