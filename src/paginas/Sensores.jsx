import React,{useState} from 'react'
import DropDown from '../components/DropDown'
import Caja from '../components/Caja'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Logo from '../assets/SVG/Recurso2.svg'
import useMaquinas from '../hooks/useMaquinas';
const Sensores = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  const [value, setValue] = useState(0);
  const {maquinas} = useMaquinas();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
    <div  className='bg-[#123042] mr-4 rounded-md'>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Máquinas Estacionarias" sx={{color:'white'}}/>
            <Tab label="Máquinas no Estacionarias" sx={{color:'white'}} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div>
            <div className='ml-12 flex mr-12 items-center justify-evenly'>
              <div className='flex flex-col basis-[40%]'>
                <DropDown title={'Seleccionar Máquina'} rows={maquinas}/>
              </div>
              <div>
                <img src={Logo} alt='Imagen' className='h-full w-full'/>
              </div>
            </div>
            <div className='ml-12 flex justify-between mt-[2%] mr-12'>
              <Caja titulo={'Device IDD'} valor={'BT-A3'}/>
              <Caja titulo={'MAC'} valor={'AC:24:E2:B6:72:30'}/>
              <Caja titulo={'Temperatura'} valor={'18°C'}/>
              <Caja titulo={'Horas desde última inspección'} valor={36}/>
            </div>
            <div className='ml-12 flex justify-between mt-[2%] mr-12 mb-4'>
              <Caja titulo={'Status'} valor={'Connected'}/>
              <Caja titulo={'Nivel de batería'} valor={'85%'}/>
              <Caja titulo={'Humedad'} valor={'40%'}/>
              <Caja titulo={'RMS Acc'} valor={'E040'}/>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className='bg-[#123042] rounded-md'>
            <div className='ml-12 flex  mr-12 items-center justify-evenly'>
              <div className='flex flex-col basis-[40%]'>
                <DropDown title={'Seleccionar máquina no estacionaria'}  rows={maquinas}/>
              </div>
              <div>
                Imagen
              </div>
            </div>
            <div className='ml-12 flex justify-between mt-[2%] mr-12'>
              <Caja titulo={'Device IDD'} valor={'BT-A3'}/>
              <Caja titulo={'MAC'} valor={'AC:24:E2:B6:72:30'}/>
              <Caja titulo={'Temperatura'} valor={'18°C'}/>
              <Caja titulo={'Horas desde última inspección'} valor={36}/>
            </div>
            <div className='ml-12 flex justify-between mt-[2%] mr-12 mb-4'>
              <Caja titulo={'Status'} valor={'Connected'}/>
              <Caja titulo={'Nivel de batería'} valor={'85%'}/>
              <Caja titulo={'Humedad'} valor={'40%'}/>
              <Caja titulo={'RMS Acc'} valor={'E040'}/>
            </div>
          </div>
        </TabPanel>
      </div>
    </>
  )
}

export default Sensores