
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']                                         
  ],
};
import "react-quill/dist/quill.snow.css";

const socket = io("http://localhost:3002");

export default function TextEditor() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
   const [inputMessage, setInputMessage] = useState("");
   const [history, setHistory] = useState([]);
   const [showHistory, setShowHistory] = useState(false);

   const fetchHistory = () => {
     socket.emit("getHistory");
   };

   const revertToVersion = (version) => {
     const selectedVersion = history.find((v) => v.version === version);
     if (selectedVersion) {
       setContent(selectedVersion.content);
       socket.emit("document", { content: selectedVersion.content, version: selectedVersion.version });
     }
   };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("document", (data) => {
      setContent(data.content);
    });

    socket.on("conflict", (data) => {
      alert("Conflict detected! Please resolve the conflict.");
      setContent(data.content);
    });

     socket.on("message", (message) => {
       setMessages((prevMessages) => [...prevMessages, message]);
     });

     socket.on("message", (data) => {
       setMessages((prevMessages) => [...prevMessages, data]);
     });

    return () => {
      socket.off("connect");
      socket.off("document");
      socket.off("message");
    };
  }, []);

  const handleContentChange = (value) => {
    setContent(value);
    socket.emit("document", value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = { text: inputMessage, sender: "user" };
      socket.emit("message", newMessage);
      setInputMessage("");
    }
  };

  return (
    <div className="container mx-auto p-4">
     <Button onClick={fetchHistory}>Show Version History</Button>
     {showHistory && (
       <div className="version-history">
         <h3>Version History</h3>
         <ul>
           {history.map((version) => (
             <li key={version.version}>
               <span>Version {version.version} - {new Date(version.modifiedAt).toLocaleString()}</span>
               <Button onClick={() => revertToVersion(version.version)}>Revert</Button>
             </li>
           ))}
         </ul>
       </div>
     )}
     <Card className="mb-4">
        <CardHeader>
          <CardTitle>Text Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactQuill value={content} onChange={handleContentChange} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full pr-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
