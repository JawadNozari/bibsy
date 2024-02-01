"use client"
import axios from "axios";
// import UserList from './userList/page';

export default function Home() {
  axios.get("/api/test").then((res) => {
    return (
      // <UserList/>
      <div>
       {res.data}
      </div>
    );
  }).catch((err) => {
    return (
      // <UserList/>
      <div>
        {err}
      </div>
    );
  }
  );
  
}
