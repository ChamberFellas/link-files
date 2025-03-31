const axios = require('axios');
const crypto = require('crypto');

async function registerUser(email, password, username) {
    const hashedPassword = crypto.createHash('sha256').update(password + email).digest('hex');
    const userData = {
        username: username,
        email: email,
        password: hashedPassword
    };

    try {
        const response = await axios.post('http://172.26.107.70:8000/users/register', userData);
        console.log(response.data);
        return true;
    } catch (error) {
        console.error('Error registering user:', error.response ? error.response.data : error.message);
        return false;
    }
}

async function loginUser(email, password) {
    const hashedPassword = crypto.createHash('sha256').update(password + email).digest('hex');
    const userData = {
        email: email,
        password: hashedPassword
    };

    try {
        const response = await axios.post('http://172.26.107.70:8000/users/login', userData);
        console.log(response.data);
        return [true, response.data];
    } catch (error) {
        console.error('Error logging in:', error.response ? error.response.data : error.message);
        return [false, 0];
    }
}

// Export functions for TypeScript usage
module.exports = { registerUser, loginUser };


//registerUser("testA","testB","testC")
//loginUser("testA","testB","testC")