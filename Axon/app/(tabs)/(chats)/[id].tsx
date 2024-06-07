import {
    Image, StyleSheet, Platform, View, Text, TextInput,
    TouchableOpacity, Button, KeyboardAvoidingView, ScrollView, Pressable ,Keyboard ,ActivityIndicator
  } from 'react-native';
  import { useState, useEffect, useRef, } from 'react';
  import LogIn from '@/components/LogIn'
  import ParallaxScrollView from '@/components/ParallaxScrollView';
  import { ThemedText } from '@/components/ThemedText';
  import { ThemedView } from '@/components/ThemedView';
  import { router } from 'expo-router';
  import { SafeAreaView } from 'react-native-safe-area-context';
  import Chatbox from '@/components/Chatbox';
  import DocPicker from '@/components/DocPicker';
  import { useLocalSearchParams } from 'expo-router';

  export default function HomeScreen( ) {
    const { id } = useLocalSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [stack, setStack] = useState<{ response: any; user: boolean; }[]>([]);
    const [value, onChangeText] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
  
    const scrollToBottom = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    };
  
    useEffect(() => {
      scrollToBottom()
    }, [stack]);
  
    async function onSendHandler(event: any) {
      console.log(value)
      const temp = value + "/"
      onChangeText(value)
      const newPrompt = {
        response: value,
        user: true,
      };
      setStack((prevStack) => [...prevStack, newPrompt]);
  
      setIsLoading(true);
      onChangeText('');
      Keyboard.dismiss();
      try {
        const response = await fetch('http://192.168.1.109:5000/ai', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: value,
          }),
        });
        const json = await response.json();
  
        const newResponse = {
          response: json.answer,
          user: false,
        };
        setIsLoading(false);
        setStack((prevStack) => [...prevStack, newResponse]);
  
  
        event.preventDefault();
      } catch (error) {
        console.error(error);
      }
    }
  
    const createNewChat = () => {
      setStack([]);
    }
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View className='flex justify-between flex-row align-items-center  p-2'>
            
            <Text className='text-white text-center text-3xl font-bold'>Axon{id}</Text>
            <Pressable className='bg-white rounded-full px-4 py-1 my-0 mr-3' onPress={createNewChat}>
              <Text className='text-center text-lg'>{"+"}</Text>
            </Pressable>
          </View>
  
          <ScrollView ref={scrollViewRef} onContentSizeChange={() => { scrollToBottom() }} contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollViewContent}>
  
            {stack.map((entry, index) => (
              <Chatbox key={index} user={entry.user} name={entry.user ? "User" : "Axon"}>{entry.response}</Chatbox>
            ))}
            {
              isLoading && <ActivityIndicator size="large" color="#FFFFFF" />
             
            }
  
          </ScrollView>
          <View className='flex flex-row justify-around '>
            <DocPicker />
            <TextInput
              className='border-solid border-2 rounded-full py-1 my-1 mx-0 pl-5 text-base w-4/6  '
              style={styles.input}
              onChangeText={newText => onChangeText(newText)}
              value={value}
              placeholder="Message"
              keyboardType="default"
              onPressIn={() => scrollToBottom()}
            />
            <Pressable className='bg-white rounded-full px-5 py-2 my-1 mx-0' onPress={onSendHandler}>
              <Text className='text-center text-lg'>{">"}</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
  
    },
    keyboardAvoidingView: {
      flex: 1,
  
    },
    scrollViewContent: {
  
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    input: {
      backgroundColor: 'white',
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 12,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
  