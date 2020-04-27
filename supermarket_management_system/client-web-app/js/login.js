let validateCredentials = () => {
    if (($('#email').val()).trim() === '') {
        return false;
    }
    else
        if (($('#password').val()).trim() === '') {
            return false;
        }
        else {
            login()
        }
}

let login = () => {
    let email = $('#email').val();
    let password = $('#password').val();
    return $.ajax({
        url: `http://localhost:8080/api/login?query=query{login(email:"${email}",password:"${password}")}`,
        type: 'POST',
        data: {},
        success: function (res) {
            storeToken(res.data.login)
        },
        error: function (err) { 
            console.error(err)
            Swal.fire(
                'Error',
                err.responseText,
                'error'
              )
        },
    });
}

let storeToken = (token) => {
    window.localStorage.setItem('token', token);
    window.location.href='main.html';
}