import React, { useEffect, useState } from 'react';

const useNav = () => {
    const [navbar, setNavbar] = useState(false);

    
    const changeBackground = () => {
        if(window.scrollY >= 300){
            setNavbar(true);
        }
        else{
            setNavbar(false);
        }
    }

    useEffect(()=>{
        changeBackground();
        window.addEventListener("scroll", changeBackground);
    }, []);
    

    return {navbar}
};

export default useNav;