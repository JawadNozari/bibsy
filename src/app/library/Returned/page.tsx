
export default function ReturnedPage() {
  return (
        <div className="flex min-h-screen flex-col items-center justify-between  p-24 bg-neutral-50">
            <div className="border-2  rounded-t-lg border-slate-950 w-50">
                <table className="table-fixed text-black rounded-lg">
                    <thead className="border-b border-slate-950"> 
                        <tr>
                           <th className="p-3">Name</th>
                           <th className="p-3">Author</th>
                           <th className="p-3">ISBN</th>
                           <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-950 ">
                            <td className="p-8">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td className="p-8">Malcolm Lockyer</td>
                            <td className="p-8">1961</td>
                            <td className="p-8">1961</td>
                        </tr>
                        <tr className="border-b border-slate-950">
                            <td className="p-8">Witchy Woman</td>
                            <td className="p-8">The Eagles</td>
                            <td className="p-8">1972</td>
                            <td className="p-8">1961</td>
                        </tr>
                        <tr>
                            <td className="p-8">Shining Star</td>
                            <td className="p-8">Earth, Wind, and Fire</td>
                            <td className="p-8">1975</td>
                            <td className="p-8">1961</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
