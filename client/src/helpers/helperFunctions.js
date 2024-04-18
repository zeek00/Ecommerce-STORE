const getToken = () =>{
    return localStorage.getItem('token');
};

const getProfile = () =>{
    return localStorage.getItem('profile');
};

const removeToken = () =>{
    localStorage.removeItem('token');
};

const removeProfile = () =>{
    return localStorage.removeItem('profile');
};

const setToken = (val)=>{
    localStorage.setItem('token', val);
};

const setProfile = (val)=>{
    const serializedVal = JSON.stringify(val)
    localStorage.setItem('profile', serializedVal);
};

export {
    getToken, 
    getProfile, 
    removeToken, 
    removeProfile,
    setToken,
    setProfile
};