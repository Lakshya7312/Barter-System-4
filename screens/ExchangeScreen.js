import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import fireabse, { auth } from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            itemName: "",
            itemDescription: "",
            username: firebase.auth().currentUser.email
        }
    }

    addItem = (itemName, itemDescription) => {
        var username = this.state.username;
        db.collection("exchange-requests").add({
            "username": username,
            "item_name": itemName,
            "item_description": itemDescription
        })
        this.setState({
            itemName: "",
            itemDescription: ""
        })

        return Alert.alert(
            "Item ready to exchange",
            '',
            [
                {
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate("HomeScreen")
                    }
                }
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder="Item Name" onChangeText={(text) => { this.setState({ itemName: text }) }} />
                <TextInput style={[styles.input, { height: 250 }]} placeholder="Item Description" multiline={true} onChangeText={(text) => { this.setState({ itemDescription: text }) }} />
                <TouchableOpacity style={styles.button} onPress={() => { this.addItem(this.state.itemName, this.state.itemDescription) }}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%"
    },

    input: {
        borderWidth: 1.3,
        borderColor: "#ffeadb",
        marginTop: 30,
        paddingLeft: 9,
        alignSelf: "center",
        width: 180,
        height: 27,
        color: "#fff"
    },

    button: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#f7c5a8",
        width: 100,
        height: 25,
        borderRadius: 10
    },

    buttonText: {
        color: "#1c2b2d",
        alignSelf: "center",
        textAlign: "center",
        marginTop: 1.5,
        fontWeight: "400",
        textAlignVertical: "center"
    }
})