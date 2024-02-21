let whatUserAreYou = "";
let areYouAdmin = false;

function CheckIfLoggedIn(token: string | null) {
    if (token) {
        areYouAdmin = (JSON.parse(atob(token.split(".")[1])).user.admin);
        whatUserAreYou = (JSON.parse(atob(token.split(".")[1])).role);
    } else {
        return ({ areYouAdmin: false, whatUserAreYou: "" });
    }
    return ({ areYouAdmin, whatUserAreYou });
}

export { CheckIfLoggedIn }; 