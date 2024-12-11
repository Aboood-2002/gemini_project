import { createContext, useState, useEffect, } from "react";
import run from "../Config/Gemini";
import { server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
    const [Input, setInput] = useState("");
    const [RecentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");
    const [conversations, setConversations] = useState([]); // State for conversations


    const newChat = async () => {
      setLoading(true);
      setShowResult(true);
      try {
          const { data } = await axios.post(
            `${server}/api/chat/new`,
            {},
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
    
          fetchChats();
          setLoading(false);
          setShowResult(false);
        } catch (error) {
          toast.error("something went wrong");
        }
  };

  
    const onSent = async ({ text, image, imageDescription }) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        try {
            response = await run(text); // Your existing AI processing function
            setRecentPrompt(text);

            // Update the conversations state with the new message and its response
            setConversations((prev) => [
                ...prev,
                { prompt: text, response: imageDescription ? `${response} (Image: ${imageDescription})` : response, image } // Add image if available
            ]);

            const { data } = await axios.post(
              `${server}/api/chat/${selected}`,
              {
                question: text,
                answer: response,
              },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );
            await fetchMessages();
            setLoading(false);
            setInput("");
        } catch (error) {
            toast.error("Error sending message:", error);
            setLoading(false);
        }
    };

    const [chats, setChats] = useState([]);
    const [selected, setSelected] = useState(null);

    async function fetchChats() {
      try {
        const { data } = await axios.get(`${server}/api/chat/all`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
  
        setChats(data);
        setSelected(data[0]._id);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchMessages() {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/api/chat/${selected}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        setConversations(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    async function deleteChat(id) {
      try {
        const { data } = await axios.delete(`${server}/api/chat/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchChats();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert("something went wrong");
      }
    }
  
    useEffect(() => {
      fetchChats();
    }, []);
  
    useEffect(() => {
      fetchMessages();
    }, [selected]);


    const ChatContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        RecentPrompt,
        showResult,
        Loading,
        ResultData,
        Input,
        setInput,
        newChat,
        conversations, // Provide conversations state to the context
        fetchChats,
        chats,
        deleteChat,
        setSelected,
        selected,

    };

    return (
        <ChatContext.Provider value={ChatContextValue}>
            {props.children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
