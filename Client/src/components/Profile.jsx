import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Footer from './shared/Footer';
import { motion } from "framer-motion"
const skills = ["HTML", "CSS", "JAVASCRIPT", "REACTJS"];


function Profile() {

    useGetAppliedJobs();

    const [open, setOpen] = useState(false)
    const { user } = useSelector(store => store.auth);

    return (
        <>
            <Navbar />

            <motion.div
                initial={{ opacity: 0.2, y: 100 }}
                transition={{ duration: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{}}
                className='w-full px-[6%] max-sm:px-[2%]'>
                <div className=' bg-white border border-gray-200 rounded-2xl my-5 p-8 max-sm:p-4 '>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-4'>

                            <Avatar className="cursor-pointer w-24 h-24 max-sm:w-8 max-sm:h-8">
                                {
                                    user?.profile?.profilePhoto
                                        ?
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                        :
                                        <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                                }
                            </Avatar>


                            <div>
                                <h1 className='font-bold text-xl max-sm:text-lg'>{user?.fullname}</h1>
                                <p className='max-sm:text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                            </div>

                        </div>
                        <Button onClick={() => setOpen(true)} className="text-right max-sm:w-6 max-sm:h-6" variant="outline">
                            <Pen />
                        </Button>
                    </div>

                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>


                        <div className='my-5'>
                            <h1 className='text-md font-bold mb-1'>Skills</h1>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {
                                    user?.profile?.skills.length !== 0
                                        ?
                                        user?.profile?.skills.map((item, index) => (
                                            <Badge key={index} >{item}</Badge>
                                        ))
                                        :
                                        <span>NA</span>
                                }
                            </div>
                        </div>

                        <div className='grid w-full items-center gap-1.5'>
                            <Label className="text-md font-bold">Resume</Label>
                            {
                                user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>
                                    : <span>NA</span>
                            }
                        </div>

                    </div>

                </div>


            </motion.div>

            <div className='bg-white rounded-2xl mx-[10%] max-sm:mx-[6%] mt-7 mb-14'>
                <h1 className='font-bold text-lg my-5'>Applied Job</h1>
                {/* table */}
                <AppliedJobTable />
            </div>


            {/* update profile */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />

            <Footer />



        </>
    )
}

export default Profile;

