"use client";
let userType = "";
let isAdmin = false;

function CheckIfLoggedIn() {
    const token = localStorage.getItem("token");
    if (!token) {
        /* router.push("/login"); */
        console.log("no token");
    } else {
        isAdmin = (JSON.parse(atob(token.split(".")[1])).user.admin);
        userType = (JSON.parse(atob(token.split(".")[1])).role);
        console.log(`User is logged in as: ${userType}`);
    }
    return ({ isAdmin, userType });
}
CheckIfLoggedIn();

export { isAdmin, userType, CheckIfLoggedIn };