import {
  StyleSheet, View, Text, TextInput
} from 'react-native';
import { useState } from 'react';

import { router } from 'expo-router';

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (

    <View className='bg-sky-300 w-full mx-5 rounded-lg p-3 flex items-center border-solid border-2'>
      <Text className='pt-1 pb-5 w-full text-center text-xl '>Login In</Text>
      <TextInput
        className='bg-sky-100 border-solid border-2 border-sky-800 rounded py-2 px-3 my-3 w-60 text-base'
        placeholder='Username'
        onChange={(event) => { setUsername(event.nativeEvent.text) }}
        keyboardType={'email-address'}
        value={username}
      />
      <TextInput
        className='bg-sky-100 border-solid border-2 border-sky-700 rounded py-2 px-3 my-3 w-60 text-base '
        placeholder='Password'
        onChange={(event) => { setPassword(event.nativeEvent.text) }}
        keyboardType={'email-address'}
        value={password}
      />
      <Text onPress={() => { router.push('/explore'); }} className='my-4 py-2 px-3 rounded w-40 text-center text-white text-base bg-sky-700 active:bg-sky-900'>Submit</Text>

    </View>

  );
}

