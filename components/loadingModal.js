import {ActivityIndicator, Modal, Portal} from "react-native-paper";
import React from "react";
import {useSelector} from "react-redux";

export default function LoadingModal() {
    const visible = useSelector(state => state.app.loading);
    return <Portal>
        <Modal visible={visible}>
            <ActivityIndicator size="large"/>
        </Modal>
    </Portal>
}