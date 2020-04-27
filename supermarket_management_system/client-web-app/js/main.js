$(() => {
    gotoDashboard()
    userCache();
        
})

let userCache = () => {
    if (user == null) {
        let param = `query{customer{id,firstName,lastName,contactNo,email,password,isAdmin,image,isActive,clientId,createdDate,lastupdatedDate}}`
        let url = `${apis.USERINFO}?query=${param}`
        getAPIdata(url, requestType.POST, {}).then((res)=>{
            user=res.data.customer;
            window.localStorage.setItem(localStorageKey.USER, JSON.stringify(res.data.customer))
            populateUserInfo()
        })
    }
    else{
        populateUserInfo()
    }
}

let populateUserInfo=()=>{
    $('#username').text(`${user.firstName} ${user.lastName}`)
    $('#userimage').attr('src',user.image)
}

let gotoDashboard = () => {
    $('main').html('<sm-dashboard></sm-dashboard>')
}

let gotoProductSection = () => {
    $('main').html('<sm-product></sm-product>')
}
