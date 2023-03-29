import {StyleSheet, Text} from "react-native";

export function TitleText({children}) {
    return <Text style={styles.title}>{children}</Text>;
}

export function NoteText({children}) {
    return <Text style={styles.note}>{children}</Text>;
}
export function HeaderText({children}) {
    return <Text style={styles.header}>{children}</Text>;
}

export function SubHeaderText({children}) {
    return <Text style={styles.subheader}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    header: {
        fontSize: 20,
    },
    subheader: {
        fontSize: 14,
    },
    note: {
        fontSize: 12,
        fontStyle: "italic",
    }
})