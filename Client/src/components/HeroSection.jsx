import React, { useState } from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

function HeroSection() {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}
            className='text-center'
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                {/* <p>/ your dream job today!</p> */}

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 2 }}
                    className='sm:text-4xl lg:text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2] hover:text-[#6c38c0eb] cursor-pointer' onClick={() => navigate("/browse")} >Dream Jobs</span></motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className='px-3 text-gray-700'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium harum officiis id at impedit.</motion.p>
                <div className='flex sm:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input type="text"
                        placeholder='Find your dream jobs'
                        className='outline-none border-none w-full'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2] cursor-pointer'>
                        <Search
                            className='h-5 w-5'
                        />
                    </Button>
                </div>
            </motion.div>


        </motion.div>
    )
}

export default HeroSection