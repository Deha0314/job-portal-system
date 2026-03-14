import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICANT_API_END_POINT } from '@/utils/constant';

const shortListingStatus = ["Accepted", "Rejected"];

const JobApplicantsTable = () => {

    const { allApplicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const response = await axios.post(
                `${APPLICANT_API_END_POINT}/status/${id}/update`,
                { status },
                { withCredentials: true }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                window.location.reload(); // refresh UI to update status
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        allApplicants && allApplicants?.applications?.map((item) => (
                            <TableRow key={item._id}>

                                <TableCell>{item?.applicant?.fullname}</TableCell>

                                <TableCell>{item?.applicant?.email}</TableCell>

                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>

                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume
                                            ? (
                                                <a
                                                    className="hover:text-blue-600 cursor-pointer"
                                                    href={item?.applicant?.profile?.resume}
                                                    target="_blank"
                                                >
                                                    {item?.applicant?.profile?.resumeOriginalName}
                                                </a>
                                            )
                                            : <span>NA</span>
                                    }
                                </TableCell>

                                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>

                                {/* STATUS COLUMN */}
                                <TableCell>
                                    {item?.status ? item.status : "Pending"}
                                </TableCell>

                                {/* ACTION COLUMN */}
                                <TableCell className="text-right">
                                    {
                                        !item?.status || item?.status === "pending" ? (
                                            <Popover>
                                                <PopoverTrigger>
                                                    <MoreHorizontal className='cursor-pointer' />
                                                </PopoverTrigger>

                                                <PopoverContent className="w-32">
                                                    {
                                                        shortListingStatus.map((status, index) => (
                                                            <div
                                                                key={index}
                                                                onClick={() => statusHandler(status, item._id)}
                                                                className='flex w-fit items-center my-2 cursor-pointer hover:text-blue-600'
                                                            >
                                                                {status}
                                                            </div>
                                                        ))
                                                    }
                                                </PopoverContent>
                                            </Popover>
                                        ) : (
                                            <span className="font-semibold">
                                                {item.status}
                                            </span>
                                        )
                                    }
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default JobApplicantsTable