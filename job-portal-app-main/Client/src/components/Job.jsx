import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {

    const navigate = useNavigate();
    // const jobId = "e8ut7yt845y95y56";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - createdAt.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return Math.floor(differenceInDays);
    }


    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:scale-105 transition-all duration-500 h-full flex flex-col'>
            <div className='flex justify-between items-center'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>

            <div className='flex gap-2 items-center my-2'>
                <Button variant="outline" size="icon" className="p-6" >
                    <Avatar>
                        <AvatarImage
                            src={job?.company?.logo || "https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?rs=1&pid=ImgDetMain"}
                        />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg md:text-xl'>{job?.company?.companyName}</h1>
                    <p className='text-sm text-gray-600'>India</p>
                </div>
            </div>

            <div className=''>
                <h1 className='font-bold text-lg my-2 '>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>

            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>

            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button className="cursor-pointer" onClick={() => navigate(`/description/${job._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#7209b7] cursor-pointer">Save For Later</Button>
            </div>

        </div>
    )
}

export default Job
