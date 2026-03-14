import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Table } from '../ui/table'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies()

  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("")

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  return (
    <div>
      <Navbar />
      <div className=' px-[5%] my-10 '>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="cursor-pointer " onClick={() => naviagte("/admin/companies/create")}>New Company</Button>
        </div>
        <CompaniesTable />


      </div>

    </div>
  )
}

export default Companies
