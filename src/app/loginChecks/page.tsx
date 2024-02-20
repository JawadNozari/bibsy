"use client";
let userType = "";
let isAdmin = false;

function CheckIfLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
        isAdmin = (JSON.parse(atob(token.split(".")[1])).user.admin);
        userType = (JSON.parse(atob(token.split(".")[1])).role);
    } else {
        return ({ isAdmin: false, userType: "" });
    }
    return ({ isAdmin, userType });
}
CheckIfLoggedIn();

export { isAdmin, userType };