import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown({labelId,id,label,title,rows}) {
    return (
      <Box sx={{ minWidth: 120 ,marginBottom:2,color:'#fff' , backgroundColor:'cccccc'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" sx={{color:'white'}}>{title}</InputLabel>
          <Select
            labelId={labelId}
            id={id}
            label={label}
            sx={{color:'white'}}
          >
            {rows.map((row) => <MenuItem value={row.identificador}>{row.nombre_maquina}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    );
  }

