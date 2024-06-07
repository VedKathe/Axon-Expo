import { View, Text, StyleSheet } from "react-native";
import { ReactNode } from "react";
import Markdown from 'react-native-markdown-display';
type ChatboxProps = {
    name: string;
    user: boolean;
    children?: ReactNode;
};

export default function Chatbox({ name, user, children }: ChatboxProps) {

    return (
        <View style={[user ? styles.user : styles.bot]} className="flex my-2 ">
            <View className=" px-5 my-1 bg-white w-10/12 mx-4 rounded " >

                <Text className="py-2 ">{name}</Text>

                {user ? <Text className="py-2 text-base">{children}</Text> :
                 <Markdown style={markdownStyles}>{children}</Markdown>}
                

            </View>
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

const markdownStyles = StyleSheet.create({
    heading1: {
        fontFamily: 'InterBlack',
        color: '#212020',
        marginTop: 15,
        marginBottom: 10,

        lineHeight: 40,
    },
    heading2: {
        fontFamily: 'InterBold',
        color: '#404040',

        marginTop: 10,
        marginBottom: 5,
        lineHeight: 30,
    },
    body: {
        fontSize: 16,
        // fontFamily: 'Inter',
        lineHeight: 24,
    },
});