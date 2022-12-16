import React,{useState} from 'react'
import DropDown from '../components/DropDown'
import Caja from '../components/Caja'
import useMaquinas from '../hooks/useMaquinas'
import Button  from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ProgAlert from '../components/ProgAlert';
import ReactPlayer from 'react-player'
import RadialGraph from '../components/RadialGraph'
import ScatterChart from '../components/ScatterChart'
  

import "video-react/dist/video-react.css"; // import css
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import HookMqttPub from '../components/MqttHooks/HookPub';
import HookMqttSub from '../components/MqttHooks/HookSub';
import HookMqttPubIOT from '../components/MqttHooks/HookPubIOT';
import AWS from 'aws-sdk'
 
import { Player , BigPlayButton } from 'video-react';
import "video-react/dist/video-react.css";



const VisualComputing = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [UserUploadFileisSelected, setUserUploadFileisSelected] = useState(false);
  const [RaspVideoDone, setRaspVideoDone] = useState(false);
  const [InputType, setInputType] = useState(0);
  const [detType,setDetTyp] =useState("")
  const [progress , setProgress] = useState(0);
  const [payload, setPayload] = useState({});
  const [videoUplAWS, setVideoUplAWS] = useState(false)
  const [videoAWSURLname, setvideoAWSURLname]= useState("")
  const [jsonData,setJsonData]=useState("")
  


  
  const resetStates = () => {
    setSelectedFile(null)
    setUserUploadFileisSelected(false)
    setRaspVideoDone(false)
    setProgress(0)
     
    setPayload({})
    setVideoUplAWS(false)
    setvideoAWSURLname("")
    setJsonData("")

  }

  const resetForUpload= () =>{

    setProgress(0)
     
    setPayload({})
    setVideoUplAWS(false)
    setvideoAWSURLname("")
    setJsonData("")
  }


  const UserInputVideoHandler = (event) => {
    if(!UserUploadFileisSelected){ 
      setSelectedFile(event.target.files[0]);
      setUserUploadFileisSelected(true);
  }

    else{
          if(event.target.files[0] === undefined){
            alert("Seleccione un archvio")
            setUserUploadFileisSelected(false);
          }
          else{
            setSelectedFile(event.target.files[0]); 
            setUserUploadFileisSelected(true);      
          }
    }
    
  };

 const RaspVideoHandler = (event) => {
  setRaspVideoDone(true)
  };

  const handleInputChange = (event) => {
    setUserUploadFileisSelected(false)
    setRaspVideoDone(false)
    resetStates()

    setInputType(event.target.value)
  };

  const handleDetChange = (event) => {
     
    setDetTyp(event.target.value)
  };


  return (
    <>
    <div  className='bg-[#123042] mr-4 rounded-md'>
          <div>
          <div className="grid grid-cols-1  px-4 content-center">
              <div className="py-8">
              {/* Seccion de Seleccion de Metodo de subida */}
              <Box sx={{ minWidth: 120 ,marginBottom:2,color:'#fff' , backgroundColor:'cccccc'}}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" sx={{color:'white'}}>{"Seleccione el tipo de Subida de video"}</InputLabel>
                <Select
                  labelId={"select-input-label-id"}
                  id={"select-input"}
                  label={"select-input-label"}
                  onChange={handleInputChange}
                  sx={{color:'white'}}
                >
                  <MenuItem value={1}>{"Subir Archivo Video"}</MenuItem>
                  <MenuItem value={2}>{"Capturar Video con Raspberry"}</MenuItem>
                </Select>
              </FormControl>
              </Box>
                
              </div>




              
          </div>

            {/* Subida por archivo de usuario */}
          {InputType == 1? (
              <> 
              <div className="grid grid-cols-2 gap-4 content-center">
              <div className="py-8">
                <Stack sx={{my:2 ,px:19}}>
                  {/* <DropDown title={'Seleccionar IA'} rows={maquinas}/> */}
                <FormControl fullWidth sx={{my:2}}>
                <InputLabel id="demo-simple-select-label" sx={{color:'white'}}>{"Seleccione el sistema a usar"}</InputLabel>
                <Select
                  labelId={"select-ia-label-id"}
                  id={"select-ia"}
                  label={"select-ia-label"}
                  onChange={handleDetChange}
                  sx={{color:'white'}}
                >
                  <MenuItem value={"Det-Grua"}>{"Detección de riesgos Grua Horquilla"}</MenuItem>
                  <MenuItem value={"Det-EPP"}>{"Detección de uso de EPP"}</MenuItem>
                </Select>
                </FormControl>
                  <Button variant="outlined" component="label" endIcon={<PhotoCamera />} sx={{py: 2.0625, mb:1.875}} >
                    Seleccionar Archivo
                    <input hidden accept="video/mp4,video/x-m4v,video/*" multiple type="file"  onChange={UserInputVideoHandler}  />
                  </Button>
                  {/* Archivo ya seleccionado */}
                  {UserUploadFileisSelected && detType !== "" ? (<>

                    <HookMqttPub set_prog={setProgress} prog={progress} rest={resetForUpload} file={selectedFile} vidup={videoUplAWS} detec={detType}/>
                    <HookMqttSub set_payload={setPayload} realpayload={payload} set_video_aws={setVideoUplAWS} set_video_name_aws={setvideoAWSURLname}/>
                  
                  </>):(<></>)}

                </Stack>
              </div>
              {/* Archivo subido al bucket */}
           
              {videoUplAWS === true ? (
                       <div className="h-64 w-80 flex justify-center mt-2 ml-40"  >
                       {/* <ReactPlayer url={dominio_cloud+'/'+videoAWSURLname} /> */}
                       <Player
                        videoId="video-1"
                        >
                           <BigPlayButton position="center" />
                        <source src={videoAWSURLname} />
                      </Player>
                      </div>    
                    ) :
                    ( 
                       <></>
			              )}
            </div>
            {/* Zona de graficos */}
            <div className="flex justify-center">

              {videoUplAWS === false  && progress> 0 ? 
             
              (
                
              <>
               <ProgAlert prog={progress} vidred={videoUplAWS} IOT={false}/>
              </>
              ):
              
              
              (<>
              <div className="flex flex-col md:flex-row md:max-w md:w-auto  rounded-lg bg-white shadow-lg gap-2 mb-2" > 
                <RadialGraph value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]} ></RadialGraph>                   
                <ScatterChart value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]}   ></ScatterChart>
                <RadialGraph   value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]} ></RadialGraph>
              </div>
              
              
              </>)
              }
            </div>
            </>
            ) 
            // Seleccion de subida de archivo via raspberry
            :InputType == 2 ? (
              <>
              <div className="grid grid-cols-2 gap-4 content-center">
              <div className="py-8">
                <Stack sx={{my:2 ,px:19}}>
                  {/* <DropDown title={'Seleccionar IA'} rows={maquinas}/> */}
                  <FormControl fullWidth  sx={{my:2}}>
                <InputLabel id="demo-simple-select-label" sx={{color:'white'}}>{"Seleccione el sistema a usar"}</InputLabel>
                <Select
                  labelId={"select-ia-label-id"}
                  id={"select-ia"}
                  label={"select-ia-label"}
                  onChange={handleDetChange}
                  sx={{color:'white'}}
                >
                  <MenuItem value={1}>{"Detección de riesgos Grua Horquilla"}</MenuItem>
                  <MenuItem value={2}>{"Detección de uso de EPP"}</MenuItem>
                </Select>
                </FormControl>
                {detType !== "" ? (
                  <>
                  <HookMqttPubIOT raspFlag={setRaspVideoDone} detec={detType}/>
                  <HookMqttSub set_payload={setPayload} realpayload={payload} set_video_aws={setVideoUplAWS} set_video_name_aws={setvideoAWSURLname}/>
                </>):(<></>)
                }
                </Stack>
              </div>
              {videoUplAWS === true ? (
                       <div className="h-64 w-80 flex justify-center mt-2 ml-40"  >
                       {/* <ReactPlayer url={dominio_cloud+'/'+videoAWSURLname} /> */}
                       <Player
                        videoId="video-1"
                        >
                          <BigPlayButton position="center" />
                        <source src={videoAWSURLname} />
                      </Player>
                      </div>    
                    ) :
                    ( 
                       <></>
			              )}
              </div>
              {/* Zona de graficos */}
            <div className="flex justify-center">

              {videoUplAWS === false  && RaspVideoDone=== true ? 

              (
              <>
              <ProgAlert prog={progress} vidred={videoUplAWS} IOT={true}/>
              </>
              ):


              (<>
              <div className="flex flex-col md:flex-row md:max-w md:w-auto  rounded-lg bg-white shadow-lg gap-2 mb-2" > 
                <RadialGraph value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]} ></RadialGraph>                   
                <ScatterChart value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]}   ></ScatterChart>
                <RadialGraph   value={videoUplAWS === true}  graph_data={[65,30,45,90,75,10,86]} ></RadialGraph>
              </div>


              </>)
              }
              </div>
              </>
            )
            :(  
              //  Zona para agregar nuevas formas de subida de video
               <></>
            )}
          </div>
    </div>
     </>
  )
}

export default VisualComputing