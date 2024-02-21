type userType = {
    user: {
        id: number;
        username: string;
        email: string;
        image: string;
        admin: boolean;
    };
    role: string;
    iat: number;
    exp: number;
};

let whatUserAreYou = "";
let areYouAdmin = false;
let user: userType = {
    user: {
        id: 0,
        username: "",
        email: "",
        image: "",
        admin: false,
    },
    role: "",
    iat: 0,
    exp: 0,
};

function CheckIfLoggedIn(token: string | null) {
    if (token) {
        areYouAdmin = (JSON.parse(atob(token.split(".")[1])).user.admin);
        whatUserAreYou = (JSON.parse(atob(token.split(".")[1])).role);
        user = JSON.parse(atob(token.split(".")[1]));
    } else {
        return ({ areYouAdmin: false, whatUserAreYou: "", user });
    }
    return ({ areYouAdmin, whatUserAreYou, user });
}

export { CheckIfLoggedIn }; 