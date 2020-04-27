let logout = () => {
    window.localStorage.clear();
    window.location.href = 'login.html'
}
var urlHost={
    ONLINEHOST:'https://us-central1-fir-function-proj.cloudfunctions.net/app',
    LOCALHOST:'http://localhost:5000/fir-function-proj/us-central1/app'
} 
var domain=urlHost.LOCALHOST;

var localStorageKey={
    USER:'user',
    TOKEN:'token'
}

var token = window.localStorage.getItem(localStorageKey.TOKEN);
let user = JSON.parse(window.localStorage.getItem(localStorageKey.USER))

let requestType={
    POST:'POST',
    GET:'GET',
    PUT:'PUT',
    DELETE:'DELETE'
}

let apis={
    LOGIN:`${domain}/api/login`,
    USERINFO:`${domain}/api/customer`,
    CATEGORY:`${domain}/api/category`,
    PRODUCT:`${domain}/api/product`
}