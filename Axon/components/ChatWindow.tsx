import { View, Text, StyleSheet, Pressable } from "react-native";
import { ReactNode } from "react";

type ChatboxProps = {
    children?: ReactNode;
};

export default function ChatWindow({  children }: ChatboxProps) {

    return (
        <View  className="flex my-1 ">
            <Pressable onPress={()=>{console.log("Print");}} className=" px-5 py-2 my-1 bg-zinc-400 mx-4 rounded active:bg-[#9ca3af]" >
               <Text className="py-2 text-base">{children}</Text>                
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    bot: {
        alignItems: 'flex-start',
    },
    user: {
        alignItems: 'flex-end',
    }
});

