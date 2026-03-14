import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { motion } from "framer-motion"

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cyber Security",
]

function CategoryCarousel() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
        >

            <Carousel className="w-full max-w-4xl mx-auto my-10">
                <CarouselContent className="flex items-center">

                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="flex justify-center basis-1/2 sm:basis-1/3 md:basis-1/4"
                        >

                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full w-full text-center whitespace-nowrap hover:scale-105 transition-all duration-300"
                            >
                                {cat}
                            </Button>

                        </CarouselItem>
                    ))}

                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />

            </Carousel>

        </motion.div>
    )
}

export default CategoryCarousel