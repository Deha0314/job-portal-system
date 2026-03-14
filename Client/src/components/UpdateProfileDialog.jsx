import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('fullname', input.fullname);
            formData.append('email', input.email);
            formData.append('phoneNumber', input.phoneNumber);
            formData.append('bio', input.bio);
            formData.append('skills', input.skills);
            if (input.file) {
                formData.append('file', input.file);
            }

            const response = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })

            if (response.data.success) {
                dispatch(setUser(response.data.user));
                toast.success("Profile updated successfully");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);

        }
        setOpen(false);

    }


    return (
        <>
            <Dialog open={open}>
                <DialogContent className="" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className="text-right" >Name</Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    name="fullname"
                                    type="text"
                                    placeholder="Write your full name"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right" >Email</Label>
                                <Input
                                    id="email"
                                    className="col-span-3"
                                    name="email"
                                    type="email"
                                    placeholder="Write your email address"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className="text-right" >Number</Label>
                                <Input
                                    id="number"
                                    className="col-span-3"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    placeholder="Write your phone number"
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right" >Bio</Label>
                                <Input
                                    id="bio"
                                    className="col-span-3"
                                    name="bio"
                                    value={input.bio}
                                    placeholder="Write about yourself"
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right" >Skills</Label>
                                <Input
                                    id="skills"
                                    className="col-span-3"
                                    name="skills"
                                    value={input.skills}
                                    placeholder="Seprated with comma"
                                    onChange={changeEventHandler}
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right" >Resume</Label>
                                <Input
                                    id="file"
                                    className="col-span-3"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    // value={input.file}
                                    onChange={fileChangeHandler}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="my-4 w-full"><Loader2 className='mr-2 h-4 w-4 animate-spin ' /> Please wait</Button>
                                    :
                                    <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default UpdateProfileDialog
