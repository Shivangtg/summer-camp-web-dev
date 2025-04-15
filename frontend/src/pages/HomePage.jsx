import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MapView from '../components/MapView'
import { Backdrop, Button, Icon, Popper, SpeedDial, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


const HomePage = () => {
    const [center, setCenter] = useState([20, 0])
    const [changeMarker,setChangeMarker]=useState(false)
    const [markingWindow,setMarkingWindow]=useState(false)
    const [newFolderWindow,setNewFolderWindow]=useState(false)
    const [logoutWindow,setLogoutWindow]=useState(false)
    const [tripName,setTripName]=useState("")
    const [tripList,setTripList]=useState([])
    const smallIcon=useRef(null)
    const fileInputRef = useRef(null);
    const [imgSrc,setImgSrc]=useState(null)
    const userImgRef=useRef(null)

    const handleImageClick = (event) => {
        fileInputRef.current.click();
    };
    const handleImageSourceChange=(event)=>{
        event.target.style.height=event.target.style.width
    }

    const handleFileChange = (event) => {
        console.log(event)
        const file = event.target.files[0];
        if (!file) return;
        console.log("Selected file:", file);
        // Do something with the file (like uploading or reading)

        const reader = new FileReader()
        reader.onload=()=>{
            setImgSrc(reader.result); // base64 string
        }
        reader.readAsDataURL(file); // Read image as base64 URL
        
    };

    
    const handleBackdrop=()=>{
        setMarkingWindow(!markingWindow)
    }

    const addTripToDatabase=()=>{

    }
    

    return (
        <>
            <div style={{display:"flex",flexDirection:"column",position:"absolute",right:"1%",bottom:"5%",outline:"2px solid gray",zIndex:2000,borderRadius:"2px"}}>
                <button style={{ zIndex:2000, backgroundColor:(changeMarker==true) ? "limegreen":" #f5604d",border:"none",borderBottom:"1px solid gray",padding:"0.3px"}} onClick={()=>{setChangeMarker(!changeMarker)}}>
                    <img src="location-pin.svg" width="30px" height="30px" />
                </button>
                
                <button style={{ zIndex:2000 , border:"none",borderBottom:"1px solid gray" , padding:"0.3px"}} onClick={handleBackdrop}>
                    <img src="trips.svg" width="30px" height="30px" />
                </button>
            </div>
            




            {/* handels adding trip UI  */}
            <Backdrop
                open={markingWindow}
                sx={{zIndex:2000}}
                
            >
                <div style={{display:"flex",padding:"2rem",justifyContent:"center",flexDirection:"column",border:"2px solid red",width:"80%",height:"80%"}}>
                    <div style={{flexGrow:1}} ></div>
                    <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",columnGap:"5px"}}>
                        <Button variant='contained' onClick={()=>{setNewFolderWindow(true)}} startIcon={<AddIcon/>}>
                            Add Trip
                        </Button>
                        <Button variant='contained' onClick={handleBackdrop}>
                            close
                        </Button>
                    </div>
                </div>

                <Backdrop
                    open={newFolderWindow}
                    sx={{zIndex:2001}}
                >
                    <div style={{display:"flex",padding:"2rem",justifyContent:"center",flexDirection:"column",border:"2px solid green",width:"60%",height:"60%"}}>
                        
                        <div style={{flexGrow:1,display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}} >
                            <TextField id="outlined-basic" label="Trip name" variant="outlined" value={tripName} onChange={(e)=>{setTripName(e.currentTarget.value)}} autoComplete="off" />
                        </div>

                        <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",columnGap:"5px"}}>
                            <Button variant='contained' onClick={addTripToDatabase} >
                                Confirm
                            </Button>
                            <Button variant='contained' onClick={()=>{setNewFolderWindow(false)}}>
                                close
                            </Button>
                        </div>
                    </div>
                </Backdrop>

            </Backdrop>


            {/* user image and logout logic*/}
            <div style={{position:"absolute",zIndex:1000 ,top:"3%",right:"3%",padding:"0.4rem", border:"2px solid grey",borderRadius:"50%",backgroundColor:'white'}} onClick={()=>{setLogoutWindow(true)}} ref={smallIcon}>
                <img src={imgSrc || "user.svg"} alt="user" width="30px" height="30px" />
            </div>
            <Popper
                open={logoutWindow}
                anchorEl={smallIcon.current}
                placement="bottom"
                disablePortal={true}
                style={{ zIndex: 2000,translate:"-5% 1%" ,display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",width:"25%",backgroundColor:"white",border:"2px solid red",borderRadius:"5%"}}
            >
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",padding:"1rem",borderRadius:"50%",outline:"2px solid red",aspectRatio:"1/1",margin:"0.5rem"}}>
                    <img ref={userImgRef} src={imgSrc || "user.svg"} alt="user" width="100%" height="100%" style={{height:"100%",width:"100%",objectFit:"cover"}} onClick={handleImageClick} onChange={handleImageSourceChange}/>
                    <input type="file" style={{ display: "none" }} ref={fileInputRef} onChange={handleFileChange}/>
                </div>
                <Button sx={{color:"black"}}>
                    logout
                </Button>
            </Popper>



            
            <SearchBar setCenter={setCenter} style={{top:"10px"}} />
            
            {/* <button style={{}} onClick={()=>{setChangeMarker(!changeMarker)}}>changeMarker:{changeMarker}</button> */}
            <MapView center={center} setCenter={setCenter} changeMarker={changeMarker}>
            
            </MapView>
            {/* <Authentication/> */}
        </>
    )
}

export default HomePage