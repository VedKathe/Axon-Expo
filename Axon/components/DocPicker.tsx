import { Pressable, Text } from "react-native"
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function DocPicker() {
    const uploadFileOnPressHandler = async () => {
        try {
            const formData = new FormData();
            const document = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            if (document.assets && document.assets.length > 0) {
                const { uri, name, mimeType } = document.assets[0];
                console.log(document.assets[0]);
                formData.append('file', {
                    uri,
                    name,
                    type: mimeType, // Use appropriate MIME type
                } as any);
                console.log(formData);
                const response = await axios.post('http://192.168.1.109:5000/uploadFile', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File uploaded successfully:', response);
            }
        } catch (e) {
            console.log(e);
        }

    };


    return (
        <Pressable className='bg-white rounded-full px-5 py-2 my-1 mx-0' onPress={uploadFileOnPressHandler}>
            <Text className='text-center text-lg'>{"+"}</Text>
        </Pressable>
    )
}