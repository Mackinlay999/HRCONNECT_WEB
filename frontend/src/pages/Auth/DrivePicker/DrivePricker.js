import { Button } from 'bootstrap'
import React,{useEffect} from 'react'
import useDrivePicker from 'react-google-drive-picker' 


const DrivePricker = () => {

    const [openPicker, data] =  useDrivePicker()

    const handleOpenPicker = ()=>{
        openPicker({
            clientId:"",
            developerKey:"",
            viewId:"DOCS",
            showUploadView:true,
            showUploadFolders:true,
            supportDrives:"true",
            multiselect:"true",

        })
    }


    useEffect(()=>{
        if(data){
            data.docs.map((i) => console.log(i))
        }
    },[data])

  return (
   <>

    <Button onClick={() => handleOpenPicker()} > Open Picker</Button>
    
   </>
  )
}

export default DrivePricker