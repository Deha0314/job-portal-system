import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {


    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const navigate = useNavigate();

    const [filterJobs, setFilterJobs] = useState(allAdminJobs);

    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.company?.companyName?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        })

        setFilterJobs(filteredJobs);

    }, [allAdminJobs, searchJobByText])

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs && filterJobs?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job?.company?.companyName}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className=" cursor-pointer">
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 flex flex-col gap-1.5 ">
{/*                                             <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className='flex items-center w-fit cursor-pointer gap-2'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div> */}
                                            <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit cursor-pointer gap-2'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>


                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;
