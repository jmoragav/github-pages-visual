import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import Divider from '@mui/material/Divider';

const drawerWidth = 288;

function SideBar({window}) {
  const drawer = (
    <div className='rounded-r-md'>
        <div className='min-h-[7em] flex flex-col m-auto text-center '>
            <p className='text-white text-4xl font-bold'>VIU</p>
            <p className='text-white text-4xl font-bold'>P210006</p>
        </div>
        <Divider className='bg-white h-5 '/>
        {/* <img src={Image} width={'200px'} className='m-auto'/> */}
      <List sx={{marginTop:3}}>
            <NavLink to="../dashboard/">
                {({ isActive }) => (
                    <div className={isActive?'mb-10 mx-1 px-3 py-2 bg-[#39a1e6] transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]' :'mb-10 mx-1 px-3 py-2 text-white transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]'}>
                        <Icon className ="inline" icon="bi:house" width="24" height="24"/>
                        <p className='ml-5 inline capitalize'>Resumen</p>
                    </div>
                )}
            </NavLink>
            <NavLink to="../dashboard/maquinas"  >
                {({ isActive }) => (
                    <div className={isActive?'mb-10 mx-1 px-3 py-2 bg-[#39a1e6] transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]' :'mb-10 mx-1 px-3 py-2 text-white transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]'}>
                        <Icon className ="inline" icon="bi:calendar-day" width="24" height="24" />
                        <p className='ml-5 inline capitalize'>Máquinas</p>
                    </div>
                )}
            </NavLink>
            <NavLink to="../dashboard/sensores" >
                {({ isActive }) => (
                    <div className={isActive?'mb-10 mx-1 px-3 py-2 bg-[#39a1e6] transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]' :'mb-10 mx-1 px-3 py-2 text-white transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]'}>
                        <Icon className ="inline" icon="ic:baseline-calendar-month" width="24" height="24" />
                        <p className='ml-5 inline capitalize'>Sensores</p>
                    </div>
                )}
            </NavLink>
            <NavLink to="../dashboard/visual-computing" >
                {({ isActive }) => (
                    <div className={isActive?'mb-10 mx-1 px-3 py-2 bg-[#39a1e6] transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]' :'mb-10 mx-1 px-3 py-2 text-white transition-colors font-semibold text-md rounded-xl hover:bg-[#0875be]'}>
                        <Icon className ="inline" icon="carbon:machine-learning" width="24" height="24"/>
                        <p className='ml-5 inline capitalize'>Visual Computing</p>
                    </div>
                )}
            </NavLink>
            
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' ,ml: {lg:'20px'}}}>
      <AppBar
        position="absolute"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
        
      >
      </AppBar>
      <Box
        component="nav"
        
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 }} }
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor:'#123042',borderTopRightRadius:8,borderBottomRightRadius:8,border:0},

          }}
          
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default SideBar;