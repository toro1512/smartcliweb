"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface ResponseData { valor: string; detalle: string; index: number; }

export default function WebApp() {
  const [usu, setUsu] = useState("");
  const [pas, setPas] = useState("");
  const [pla, setPla] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [showPosibleConec, setShowPosibleConec] = useState(true);
  const [responseData, setResponseData] = useState<ResponseData[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("opcion1")
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [formattedData, setFormattedData] = useState<string>('');

  useEffect(() => {
    if (formattedData) {
      copyToClipboard(formattedData);
    }
    
    
  }, [formattedData]);
 
  
  const ruuta="https://sersmartq-production.up.railway.app"
  
  //http://localhost:5000
  
  //https://sersmartq-production.up.railway.app

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado",
        description: "Los datos han sido copiados al portapapeles.",
      });
    } catch (error) {
      console.error('Error al copiar:', error);
      toast({
        title: "Error",
        description: "No se pudo copiar al portapapeles. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleClickRE = async () => {
    try{
    await fetch(ruuta+'/reiniciaa', { method: 'GET' });
    alert('reiniciaste las variable debes volver a la pantalla de inicio')
    setShowTextInput(false);
    setShowPosibleConec(true);
    setPla("")
    setSelectedOption('ocpion1')
    setFormattedData("")
  } catch (error) {
    console.error('Error:', error);
    setFileUploadStatus('error reiniciando');
  }
   };
   const handleClickLI = async () => { 
    try{
      await fetch(ruuta+'/cierranave', { method: 'GET' });
    alert('cerraste la sesion debes pantalla de inicio')
    setShowTextInput(false);
    setShowPosibleConec(true);
    setPla("")
    setSelectedOption('ocpion1')
    setFormattedData("")
  } catch (error) {
    console.error('Error:', error);
    setFileUploadStatus('error reiniciando');
  }
   };


  const getDisplayData = useCallback((): string => {
    
    if (!responseData) return ""
    let indicesToShow: number[] = [];
    switch (selectedOption) {
            case 'opcion1':
            indicesToShow = [15, 16, 17, 18,19,20,25,26,28,184,185,186,187,188,232,198,199,200,201,202,22,143,117,118,190,204,23,24];
            return indicesToShow.map((index, i) => {
              const item = responseData.find(item => item.index === index - 1);
              if (!item) return '';
             
              if (i === 0) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 1) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 2) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 3) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
              if (i === 4) {
                return ` ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 5) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i ==6) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 7) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 8) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 9) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 10) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 11) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 12) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 13) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 14) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 15) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 16) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 17) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 18) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 19) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 20) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 21) {
                return `XF ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 22) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 23) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 24) {
                return `SQ ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 25) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 26) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 27) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
                           
              
            }).join('');
          case 'opcion2':
            indicesToShow = [15, 16, 17, 18,25,26,28,45,59,52,66,62,76,69,83,44,58,193,47,61];
            return indicesToShow.map((index, i) => {
              const item = responseData.find(item => item.index === index - 1);
              if (!item) return '';
              if (i === 0) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 1) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 2) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 3) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
              if (i === 4) {
                return ` /${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 5) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i ==6) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 7) {
                return `FLO ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 8) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
              if (i === 9) {
                return ` ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 10) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 11) {
                return `PRO ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 12) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 13) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 14) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}\n`;
              }
              if (i === 15) {
                return `FCB ${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 16) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle}) `} `;
              }
              if (i === 17) {
                return `/${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}-`;
              }
              if (i === 18) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 19) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
                                 
              
            }).join('');
          case 'opcion3':
            indicesToShow = [15, 16, 17, 18, 25,26,28];
            return indicesToShow.map((index, i) => {
              const item = responseData.find(item => item.index === index - 1);
              if (!item) return '';
             
              if (i === 0) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 1) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 2) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 3) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i === 4) {
                return `/${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}/`;
              }
              if (i === 5) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`} `;
              }
              if (i ==6) {
                return `${item.valor}${item.detalle === '-' ? '' : `(${item.detalle})`}`;
              }
    
              
            }).join('');
          default:
            return 'Opción no válida'; // Manejo del caso por defecto
        }
      }, [responseData, selectedOption]);
      useEffect(() => { 
        if (responseData) { 
        setFormattedData(getDisplayData()); 
      } 
    }, [responseData, selectedOption, getDisplayData]);

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileUploadStatus('Por favor, seleccione un archivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      console.log(ruuta+'/concoo')
      const response = await fetch(ruuta+'/concoo', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const mensaje = await response.text();
        console.log('Respuesta del servidor:', mensaje);
        setFileUploadStatus('Archivo subido exitosamente: ' + mensaje);
        setShowPosibleConec(false);
        setShowTextInput(true);
        } else {
          const errorMessage = await response.text();
          console.error('Error del servidor:', errorMessage);
          setFileUploadStatus('Error al subir el archivo: ' + errorMessage);
        }
    } catch (error) {
      console.error('Error:', error);
      setFileUploadStatus('Servidor con cookies no conectó');
    }
  };

  const handlePasSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(ruuta+"/directa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usu, pas }),
      });
      if (response.ok) {
        setShowPosibleConec(false);
        setShowTextInput(true);
      } else {
        toast({
          title: "Error",
          description: "No pudo iniciar sesión",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error en enviar solicitud",
        variant: "destructive",
      });
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(ruuta+"/buspla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pla }),
      });
      if (response.ok) {
        const data: ResponseData[] =await response.json();
        setResponseData(data);
        setSelectedOption('opcion1')
        toast({
          title: "Éxito",
          description: "Datos del jugador obtenidos y copiados al portapapeles",
        });
      } else {
        toast({
          title: "Error",
          description: "Error en la respuesta del servicio player",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error en buscar Player",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      {showPosibleConec && (
      <>
       <Card>
        <CardHeader>
          <CardTitle>Entrar a la busquedad de player</CardTitle>
                  </CardHeader>
        <CardContent>
            <Button onClick={() => {
                     setShowTextInput(true);
                     setShowPosibleConec(false);
              }}  className="w-full">
              Ir a busquedad
            </Button>
        </CardContent>
      </Card>
        <Card className="border mt-6">
            <CardHeader>
              <CardTitle>Conexión Directa</CardTitle>
              <CardDescription>
                No puedes Abrir SmartHands fuera de esta página
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasSubmit} className="mb-4">
                <Input
                  onChange={(e) => setUsu(e.target.value)}
                  placeholder="Ingresa Usuario"
                  required
                  className="mb-2"
                />
                <Input
                  onChange={(e) => setPas(e.target.value)}
                  placeholder="Ingresa Contraseña"
                  required
                  className="mb-2"
                />
                <Button type="submit" className="w-full">
                  Ingresar
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="border mt-6" color="border">
            <CardHeader>
              <CardTitle>Conexión con Cookies</CardTitle>
              <CardDescription>Debes adjuntar el archivo cookies y podrás abrir SmartHands desde el navegador normal</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFileUpload} className="space-y-4">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full"
                />
                <Button type="submit" className="w-full">Enviar Cookies</Button>
              </form>
              {fileUploadStatus && (
                <p className="mt-2 text-sm text-gray-600">{fileUploadStatus}</p>
              )}
            </CardContent>
          </Card>
        </>
      )}
      
      {showTextInput && (
        <>
          <form onSubmit={handleTextSubmit} className="mb-4">
            <Input
              type="text"
              value={pla}
              onChange={(e) => setPla(e.target.value)}
              placeholder="Nombre de jugador"
              required
              className="mb-2"
            />
            <Button type="submit" className="w-full">
              Buscar Datos
            </Button>
          </form>
          <RadioGroup value={selectedOption} onValueChange={setSelectedOption}> <div className="flex space-x-4">
             <div className="flex items-center space-x-2"> 
            <RadioGroupItem value="opcion1" id="opcion1" /> <Label htmlFor="opcion1">Regular</Label> </div>
             <div className="flex items-center space-x-2"> 
            <RadioGroupItem value="opcion2" id="opcion2" /> <Label htmlFor="opcion2">Fish</Label>  </div>
              <div className="flex items-center space-x-2"> 
            <RadioGroupItem value="opcion3" id="opcion3" /> <Label htmlFor="opcion3">PocaInfo</Label> </div> 
           </div> 
          </RadioGroup>
          <Textarea 
            ref={textareaRef}
            value={formattedData}
            readOnly 
            className="w-full h-40 mb-2 mt-3" 
          />
          <div className="flex justify-between">
            <Button
              onClick={() => copyToClipboard(formattedData)}
              className="flex-1 mr-2"
            >
              Copiar
            </Button>
            <Button 
              onClick={() => {
                setShowTextInput(false);
                setShowPosibleConec(true);
              }} 
              className="flex-1 ml-2"
            >
              Volver
            </Button>
          </div>
          <div className="bg-background bg-grey-600 mt-5">
        
            <Button style={{ backgroundColor: 'red', color: '#fff', width: '100%'  }} onClick={handleClickRE}
             className="w-full">
              Reiniciar Variable
            </Button>
            <Button style={{ backgroundColor: 'red', color: '#fff', width: '100%', marginTop: '10px' }} onClick={handleClickLI}  className="w-full">
              Cerrar Servidor
            </Button>
       
      </div>
        </>
      )}
    </div>
  );
}
