"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WebApp() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [jsonResponse, setJsonResponse] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
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
      const response = await fetch("https://api.example.com/process-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
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
      <Card>
        <CardHeader>
          <CardTitle>Conexion Directa</CardTitle>
          <CardDescription>
            No puedes Abrir SmartHnads fuera de esta pagina
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUrlSubmit} className="mb-4">
            <Input
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ingresa Usuario"
              required
              className="mb-2"
            />
            <Input
              onChange={(e) => setUrl(e.target.value)}
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
          <form onSubmit={handleUrlSubmit} className="mb-4">
            <Input
              onChange={(e) => setUrl(e.target.value)}
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
          <CardDescription>Debes adjuntar el archivo cookies</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUrlSubmit} className="mb-4">
            <Input
              onChange={(e) => setUrl(e.target.value)}
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

      {showTextInput && (
        <form onSubmit={handleTextSubmit} className="mb-4">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ingrese texto"
            required
            className="mb-2"
          />
          <Button type="submit" className="w-full">
            Enviar Texto
          </Button>
        </form>
      )}

      {jsonResponse && (
        <Textarea value={jsonResponse} readOnly className="w-full h-40" />
      )}
    </div>
  );
}
