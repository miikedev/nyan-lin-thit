import { useEffect, useState } from 'react';

const useFetchNewsAndDetails = (isSuccess, data, resultedParamNames) => {  
    const [news, setNews] = useState([]);   
    const [details, setDetails] = useState({  
        total: 0,  
        caseday: 0,  
        death: 0,  
        monthlypercent: 0,  
        daily: 0,  
        arrestingrate: 0,  
        airstrike: 0,  
        armed_clashes: 0,  
        massacre: 0,  
        casualties: 0,  
        arrests: 0,  
    });  

    useEffect(() => {  
        if (isSuccess && data) {  
            setNews(data.news || []);  
            setDetails({  
                total: data.total || 0,  
                caseday: data.caseday || 0,  
                death: data.death || 0,  
                monthlypercent: data.monthlypercent || 0,  
                daily: data.daily || 0,  
                arrestingrate: data.arrestingrate || 0,  
                airstrike: data.airstrike || 0,  
                armed_clashes: data.armed_clashes || 0,  
                massacre: data.massacre || 0,  
                casualties: data.casualties || 0,  
                arrests: data.arrests || 0  
            });  
        }  
    }, [isSuccess, data, resultedParamNames]);  

    return { news, details };  
};  

export default useFetchNewsAndDetails;