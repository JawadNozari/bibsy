import './styles/globals.css';

export default function Home() {
    const student = {
        name: "Bob Bergman",
        email: "User@ntig.ga.se",
        class: "T04",
        phone: "07693434256",
      };

    return (  
    <main className="mainbox justify-between p-4">      
        <div>
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">Student detail</h2>
            <p className="text-sm">Updated: 27 Jan 2024, 12:21</p>
          </div>
          <div className="form-group">
            <label>Name: {student.name}</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Email: {student.email}</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Phone: {student.phone}</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Class: {student.class}</label>
            <input
              type="text"
              name="class"
              id="class"
              className="form-control"
            />
          </div>
          
        </div>

<div className="flex flex-col table-auto">
  <h2 className="text-xl font-bold">User list</h2>
  <table className="table-auto">
  <thead>
    <tr>
      <th className="border px-4 py-2">Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Phone</th>
      <th className="border px-4 py-2">Class</th>

    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border w-1/4 px-4 py-2">{student.name}</td>
      <td className="border w-1/4 px-4 py-2">{student.email}</td>
      <td className="border w-1/4 px-4 py-2">{student.class}</td>
      <td className="border w-1/4 px-4 py-2">{student.phone}</td>

    </tr>
    <tr className="bg-gray-100">
      <td className="border px-4 py-2">A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
      <td className="border px-4 py-2">Adam</td>
      <td className="border px-4 py-2">112</td>
      <td className="border px-4 py-2">112</td>

    </tr>
    <tr>
      <td className="border px-4 py-2">Intro to JavaScript</td>
      <td className="border px-4 py-2">Chris</td>
      <td className="border px-4 py-2">1,280</td>
      <td className="border px-4 py-2">1,280</td>

    </tr>
  </tbody>
</table>
</div>


  </main>
    );
  }

//   npm install react-jsx-runtime om koden säger "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.ts(7026)"
