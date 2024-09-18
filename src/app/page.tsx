"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Copy, Send } from "lucide-react"

export default function ApiUI() {
  const [tab1Data, setTab1Data] = useState("")
  const [tab2Data, setTab2Data] = useState("")
  const [tab3Data, setTab3Data] = useState("")
  const [tab1Input, setTab1Input] = useState("")
  const [tab2Input, setTab2Input] = useState("")
  const [tab3Input, setTab3Input] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setTab3Data(content)
      }
      reader.readAsText(file)
    }
  }

  const sendGetRequest = async (tabNumber: number, endpoint: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`https://api.example.com/${endpoint}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const jsonString = JSON.stringify(data, null, 2)
      
      switch (tabNumber) {
        case 1:
          setTab1Data(jsonString)
          break
        case 2:
          setTab2Data(jsonString)
          break
        case 3:
          setTab3Data(jsonString)
          break
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      alert("Error fetching data. Please check the console for details.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderTabContent = (tabNumber: number, data: string, input: string, setInput: (value: string) => void) => (
    <div className="space-y-4">
      <Textarea
        value={data}
        readOnly
        placeholder="JSON de la API aparecerá aquí"
        className="min-h-[200px]"
      />
      <div className="flex justify-between">
        <Button onClick={() => copyToClipboard(data)}>
          <Copy className="mr-2 h-4 w-4" /> Copiar JSON
        </Button>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nombre de jugador"
          />
          <Button onClick={() => sendGetRequest(tabNumber, input)} disabled={isLoading}>
            <Send className="mr-2 h-4 w-4" /> {isLoading ? "Enviando..." : "Nombre de Jugador"}
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <Tabs defaultValue="tab1" className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="tab1">Enviando Cookies </TabsTrigger>
        <TabsTrigger value="tab2">Abriendo Chrome DEBUG </TabsTrigger>
        <TabsTrigger value="tab3">Sin abrir Smart</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        {renderTabContent(1, tab1Data, tab1Input, setTab1Input)}
      </TabsContent>
      <TabsContent value="tab2">
        {renderTabContent(2, tab2Data, tab2Input, setTab2Input)}
      </TabsContent>
      <TabsContent value="tab3">
        <div className="space-y-4">
          {renderTabContent(3, tab3Data, tab3Input, setTab3Input)}
          <Input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
      </TabsContent>
    </Tabs>
  )
}