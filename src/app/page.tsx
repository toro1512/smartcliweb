"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  const [jsonResponse, setJsonResponse] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [showPosibleConec, setShowPosibleConec]= useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadStatus, setFileUploadStatus] = useState('');

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
      const response = await fetch('http://localhost:5000/concoo', {
        method: 'POST',
        body: formData
      });
      console.log(formData)
      if (response.ok) {
        setFileUploadStatus('Archivo subido exitosamente');
      } else {
        setFileUploadStatus('Error al subir el archivo');
      }
    } catch (error) {
      console.error('Error:', error);
      setFileUploadStatus('Error al enviar la solicitud');
    }
  };

  const handleChrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setShowPosibleConec(false);
      setShowTextInput(true);
      const response = await fetch("http://localhost:5000/conchr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tex }),
      });
    if (response.ok) {
        setShowTextInput(true);
      } else {
        alert("Error en la respuesta del servicio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud");
    }
  };
  const handlePasSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setShowPosibleConec(false);
      setShowTextInput(true);
      const response = await fetch("http://localhost:5000/directa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usu, pas}),
      });
    if (response.ok) {
        setShowTextInput(true);
      } else {
        alert("Error en la respuesta del servicio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud");
    }
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/buspla", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({pla}),
      });
      if (response.ok) {
        const data = await response.json();
        setJsonResponse(JSON.stringify(data, null, 2));
      } else {
        alert("Error en la respuesta del servicio");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar la solicitud");
    }
  };

  useEffect(() => {
    if (jsonResponse) {
      navigator.clipboard
        .writeText(jsonResponse)
        .then(() => {
          console.log("Texto copiado al portapapeles");
        })
        .catch((err) => {
          console.error("Error al copiar al portapapeles:", err);
        });
    }
  }, [jsonResponse]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
     {showPosibleConec && (
        <>
        <Card>
        <CardHeader>
          <CardTitle>Conexion Directa</CardTitle>
          <CardDescription>
            No puedes Abrir SmartHands fuera de esta pagina
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
          <CardTitle>Conexion ChromeDeveloper</CardTitle>
          <CardDescription>
            Debes Iniciar Chrome Developer y enviar IP 
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChrSubmit} className="mb-4">
            <Input
              onChange={(e) => setTex(e.target.value)}
              placeholder="envia direccion IP"
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
          <CardTitle>Conexion con Cookies</CardTitle>
          <CardDescription>Debes adjuntar el archivo cookies y podras abrir smarthands desde el navegador normal</CardDescription>
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

        
        </>)}
      
      {showTextInput && (
      <>
        <form onSubmit={handleTextSubmit} className="mb-4">
          <Input
            type="text"
            onChange={(e) => setPla(e.target.value)}
            placeholder="Nombre de jugador"
            required
            className="mb-2"
          />
          <Button type="submit" className="w-full">
           Buscar Datos
          </Button>
        </form>
        <Textarea>
          {"jsonResponse"}
          
        </Textarea>
        <Button
            onClick={() => navigator.clipboard.writeText("jsonResponsejhjkweh")}
            className="ml-2"
          >
            Copiar
          </Button>
          <Button onClick={() => {
            setShowTextInput(false)
            setShowPosibleConec(true)}} className="ml-2">
            Volver
          </Button> 
      </>
             
      )}

      {jsonResponse && (
        <Textarea value={jsonResponse} readOnly className="w-full h-40" />
      )}
    </div>
  );
}
