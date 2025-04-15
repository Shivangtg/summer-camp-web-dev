import { Button, ClickAwayListener, IconButton, InputBase, Menu, MenuItem, Paper, Popper } from "@mui/material"
import { useRef, useState } from "react"
import SearchIcon from '@mui/icons-material/Search';


function SearchBar({ setCenter,style }) {
  const inputRef=useRef(null)
  const [query, setQuery] = useState("")
  const [pop,setPop]=useState(false)
  const [popups,setPopups] = useState([])

  const handleSearch = async () => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json`)
    const data = await res.json()
    if (data[0]) {
      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)
      setCenter([lat, lon])
    }
    console.log(data)
    console.log(inputRef.current)
  }

  const handleChangingString=async (e) => {
    setQuery(e.target.value)
    if(e.target.value.length>0){
      setPop(true)
    }
    if(e.target.value.length==0){
      setPop(false)
      return
    }
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${e.target.value}&format=json`)
    const data = await res.json()
    setPopups(data)
    console.log(data)
    console.log(inputRef.current)
  }

  const handleSelect=(item)=>{
    setCenter([item.lat,item.lon])
  }

  return (
    <div style={{position:"absolute",zIndex:1000,...style}} >
      <Popper

        open={pop}
        anchorEl={inputRef.current}
        placement="bottom"
        disablePortal={true}
        style={{ zIndex: 2000 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 4], // vertical spacing below input
            },
          },
        ]}
        >
        <ClickAwayListener onClickAway={() => setPop(false)}>
          <Paper style={{ width: inputRef.current?.offsetWidth}} sx={{overflow:"scroll",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
            {popups.map((item, idx) => (
              <Button sx={{textWrap:"nowrap"}} key={idx} onClick={() => handleSelect(item)}>
                {item.display_name}
              </Button>
            ))}
          </Paper>
        </ClickAwayListener>

      </Popper>

      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',position:"relative",overflow:"hidden", width: 400 }}
        ref={inputRef}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Google Maps"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={query}
          onChange={handleChangingString}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={handleSearch} />
        </IconButton>
        
        
      </Paper>
    </div>
    
  )
}

export default SearchBar