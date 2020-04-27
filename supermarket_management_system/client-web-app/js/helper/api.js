let getAPIdata = (url,requestType,input) => {

    return $.ajax({
        url: url,
        type: requestType,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        },
        data: input,
        success: function (res) { 
            Promise.resolve(res) 
        },
        error: function (err) {
            console.error(err)
            if (err.status === 401) {
                logout();
            }
            else {
                Swal.fire(
                    'Error',
                    err.responseText,
                    'error'
                )
                Promise.reject(err)
            }
        },
    });
}