const apiRequest = async(url='',optionObj=null,errMess=null)=>{
    try {
        const response = await fetch(url,optionObj)
        if(!response.ok) throw Error('please reload you application')
        
    } catch (error) {
        errMess = error.message
        
    }finally{
        return errMess

    }

}

export default apiRequest