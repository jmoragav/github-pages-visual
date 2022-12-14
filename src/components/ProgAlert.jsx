import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ProgAlert({prog, vidred, IOT}) {



    return (
        <>{IOT === true ? (<>
        
        <Box sx={{ display: 'flex', my:3  }}>
        <Stack direction="row" spacing={10}>
            <CircularProgress size={70} />

            <Typography variant="h6" gutterBottom sx={{color:'white'}}>
                    Procesando Archivo en el Servidor
                    <p></p>
                    Esto proceso puede tomar unos minutos.
            </Typography>
                    
         </Stack>
        </Box>
        
        
        
        
        
        
        </>):(
        <>{
            
            vidred === true ? (<> </>):(
                <>
                {prog !== 100 ? (

                    <Box sx={{ display: 'flex', my:3  }}>
                    <Stack direction="row" spacing={20}>
                    <CircularProgress variant="determinate" value={prog}  size={70} />
                    <Typography variant="h6" gutterBottom sx={{color:'white'}}>
                    Subiendo Archivo
                    </Typography>
                    
                    </Stack>
                    </Box>):(<>
                        
            
                        <Box sx={{ display: 'flex', my:3  }}>
                        <Stack direction="row" spacing={10}>
                    <CircularProgress size={70} />

                    <Typography variant="h6" gutterBottom sx={{color:'white'}}>
                    Procesando Archivo en el Servidor
                    <p></p>
                    Esto proceso puede tomar unos minutos.
                    </Typography>
                    
                    </Stack>
                    </Box>
                        </>
            
                    )
            
                    }</>
            )
        }
       
        </>)
        
    }
        </>
    );
  }