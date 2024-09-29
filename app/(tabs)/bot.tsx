import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_KEY = "X1uS7qeQijgOP83bgeEEi6jGAjy3o7gR";
const MODEL = "mistral-small-latest";

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
    setMessages((prev) => [...prev, userMessage]);

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
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              style={styles.icon}
              source={require("../../assets/images/icon.png")}
            />
            <Text style={styles.welcomeText}>Hi! I am Shishu Bot.</Text>
            <Text style={styles.instructionText}>
              Feel free to ask me anything related to health.
            </Text>
          </View>
        ) : (
          messages.map((message, index) => (
            <View key={index} style={styles.messageContainer}>
              <Text
                style={[
                  styles.messageRole,
                  {
                    color: message.role === "user" ? "#0492b2" : "#055fa4",
                    alignSelf:
                      message.role === "user" ? "flex-end" : "flex-start",
                  },
                ]}
              >
                {message.role === "user" ? "You: " : "Bot: "}
              </Text>
              <Text
                style={[
                  styles.messageContent,
                  {
                    alignSelf:
                      message.role === "user" ? "flex-end" : "flex-start",
                  },
                ]}
              >
                {message.content}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a question here to start a conversation..."
          placeholderTextColor="#aaa"
          style={styles.textInput}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e1e", // Dark background for a modern look
  },
  scrollView: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderColor: "#444",
    borderWidth: 1,
    padding: 7,
    backgroundColor: "#2c2c2c", // Light dark for message area
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 120,
  },
  icon: {
    height: 140,
    width: 140,
    marginBottom: 10,
  },
  welcomeText: {
    color: "#0492b2",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: "80%",
  },
  messageRole: {
    fontWeight: "bold",
  },
  messageContent: {
    fontWeight: "bold",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 2,
    backgroundColor: "#0492b2", // Message bubble color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
    borderRadius: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#333",
    color: "#fff",
    flex: 1,
    marginRight: 10,
  },
});

export default ChatBot;
