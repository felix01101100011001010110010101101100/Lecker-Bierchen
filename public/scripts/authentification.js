//setzen des authentification headers
function setAuthentification(xhr) {
    const token = sessionStorage.getItem('token')
        if (!token) {
            showError('Not authenticated. Please log in.');
            throw new Error('Not authenticated. Please log in.');//
        }
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

