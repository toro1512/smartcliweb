"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WebApp() {
  const [usu, setUsu] = useState("");
  const [pas, setPas] = useState("");
  const [tex, setTex] = useState("");
  const [pla, setPla] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [showPosibleConec, setShowPosibleConec] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaContent) {
      copyToClipboard(textareaContent);
    }
  }, [textareaContent]);

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

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileUploadStatus('Por favor, seleccione un archivo');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('https://sersmartq-production.up.railway.app/concoo', {
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

  const handleChrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sersmartq-production.up.railway.app/conchr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tex }),
      });
      if (response.ok) {
        setShowPosibleConec(false);
        setShowTextInput(true);
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        toast({
          title: "Error",
          description: "Error en la respuesta del servicio",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error al abrir Chrome",
        variant: "destructive",
      });
    }
  };

  const handlePasSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://sersmartq-production.up.railway.app/directa", {
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
      const response = await fetch("https://sersmartq-production.up.railway.app/buspla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pla }),
      });
      if (response.ok) {
        const data = await response.json();
        const formattedResponse = JSON.stringify(data)
          .replace(/"/g, '')
          .replace(/\\/g, '')
          .replace(/\[/g, '')
          .replace(/\]/g, '')
          .replace(/,/g, ' ')
          .replace(/\s+/g, ' ')
          .replace(/zz/g, '\n');
        setTextareaContent(formattedResponse);
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
          <Card className="border mt-6">
            <CardHeader>
              <CardTitle>Conexión ChromeDeveloper</CardTitle>
              <CardDescription>
                Debes Iniciar Chrome Developer y enviar IP 
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChrSubmit} className="mb-4">
                <Input
                  onChange={(e) => setTex(e.target.value)}
                  placeholder="Envía dirección IP"
                  required
                  className="mb-2"
                />
                <Button type="submit" className="w-full">
                  Enviar
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
          <Textarea 
            ref={textareaRef}
            value={textareaContent}
            readOnly 
            className="w-full h-40 mb-2" 
          />
          <div className="flex justify-between">
            <Button
              onClick={() => copyToClipboard(textareaContent)}
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
        </>
      )}
    </div>
  );
}
