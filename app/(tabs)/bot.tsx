import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Image } from "react-native";
import axios from "axios";
import { MISTRAL_API_KEY } from "@env";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_KEY = MISTRAL_API_KEY;
const MODEL = "mistral-large-latest";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: MODEL,
          messages: [...messages, userMessage],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const assistantMessage = {
        role: "assistant" as "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "black" }}>
      <ScrollView
        style={{
          flex: 1,
          margin: 8,
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 1,
          padding: 7,
        }}
      >
        {messages.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 120,
            }}
          >
            <Image
              style={{ height: 140, width: 140, flex: 1 }}
              source={require("../../assets/images/icon.png")}
            />
            <Text
              style={{
                color: "#0492b2",
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Hi! I am Shishu Bot.
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              Feel free to ask me anything related to health.
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <View
              key={index}
              style={{ marginVertical: 5, marginHorizontal: 10 }}
            >
              <Text
                style={{
                  color: message.role === "user" ? "#0492b2" : "#055fa4",
                  fontWeight: "bold",
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.role === "user" ? "You: " : "Bot: "}
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  alignSelf:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {message.content}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignContent: "center",
          justifyContent: "space-between",
          margin: 8,
          borderRadius: 8,
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a question here to start a conversation..."
          placeholderTextColor="#fff"
          style={{
            borderWidth: 1,
            maxWidth: 315,
            borderColor: "#fff",
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            backgroundColor: "black",
            color: "#fff",
          }}
          multiline={true}
        />
        <Ionicons
          onPress={handleSend}
          name="send-sharp"
          size={42}
          color="#0492b2"
        />
      </View>
    </View>
  );
};

export default ChatBot;
