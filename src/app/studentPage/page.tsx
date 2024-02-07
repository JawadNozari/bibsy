'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'


 

const Table = ({ data }: { data: Array<object> }) => {
  const [filteredData, setFilteredData] = useState(data)
  console.log(filteredData)

  const handleSearch = (event: { target: { value: string } }) => {
    const value = event.target.value.toLowerCase()
    const filtered = data.filter(
      (item) =>
        (item as { bookId: string, note: string }).bookId.toString().includes(value) || (item as { bookId: string, note: string }).note.toLowerCase().includes(value)
    )
    setFilteredData(filtered)
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 className="text-2xl font-semibold leading-tight">Lånade böcker</h2>
          <div className="text-end">
            <form className="flex w-full max-w-sm space-x-3">
              <div className=" relative ">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"
                  placeholder="Sök efter bokId eller notering"
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Registreringsdatum
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Notering
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    BokId
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    PersonalId
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    ElevId
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={(item as { id: string }).id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{(item as { id: string }).id}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {new Date((item as { regDate: string }).regDate).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{(item as { note: string }).note}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{(item as { bookId: string }).bookId}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{(item as { staffId: string }).staffId}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{(item as { studentId: string }).studentId}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


const Page = () => {
    const [data, setData] = useState([])

  useEffect(() => {

     const fetchData = async () => {
        try {
          const response = await axios.get('/api/getUsers')
          setData(response.data.staffUsers)
    
        } catch (error) {
          console.error('Error fetching data:', error)
          return []
        }
      }
      fetchData()
  }, [])

  console.log(data)
  return (
    <div>
      <Table data={data} />
    </div>
  )
}

export default Page
