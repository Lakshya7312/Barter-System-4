import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Modal, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import * as firebase from "firebase";
import { auth } from "../config";
import db from "../config";

export default class SignupLoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            isModalVisible: "false",
            first_name: "",
            last_name: "",
            phone_number: "",
            address: "",
        }
    }

    login = async (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("TabNavigator");
            })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
    }

    signUp = async (email, password, confirmPassword) => {
        if (passowrd !== confirmPassword) {
            Alert.alert("Psswords do not match\nPlease try again after check your password!");
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    db.collection('users').add({
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        email: this.state.email,
                        mobile_number: this.state.mobile_number,
                        username: this.state.username,
                        address: this.state.address,
                    })
                    this.props.navigation.navigate("TabNavigator");
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return Alert.alert(errorMessage);
                })
        }
    }

    showModal = () => {
        return (
            <Modal animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: "700", fontSize: 30, alignSelf: "center", color: "#fff" }}>REGISTRATION</Text>
                            <TextInput style={styles.regForm} placeholder="First Name" placeholderTextColor="#fff" maxLength={8} onChangeText={(text) => { this.setState({ firstName: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Last Name" placeholderTextColor="#fff" maxLength={8} onChangeText={(text) => { this.setState({ lastName: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Username" placeholderTextColor="#fff" maxLength={12} onChangeText={(text) => { this.setState({ username: text }) }} />
                            <TextInput style={styles.address} placeholder="Address" placeholderTextColor="#fff" multiline={true} onChangeText={(text) => { this.setState({ address: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Email" placeholderTextColor="#fff" keyboardType="email-address" onChangeText={(text) => { this.setState({ email: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Mobile Number" placeholderTextColor="#fff" keyboardType="numeric" maxLength={10} onChangeText={(text) => { this.setState({ contact: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} />
                            <TextInput style={styles.regForm} placeholder="Confirm Password" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={(text) => { this.setState({ confirmPassword: text }) }} />
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={[styles.button, { borderRadius: 5, marginTop: 25, width: 120, height: 35 }]} onPress={() => { this.signUp(this.state.email, this.state.password, this.state.confirmPassword) }}>
                                    <Text style={{ color: "#000", alignSelf: "center", marginTop: 6 }}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={[styles.button, { borderRadius: 5, marginTop: 30 }]} onPress={() => { this.setState({ isModalVisible: false }) }}>
                                    <Text style={{ color: "#000", alignSelf: "center", marginTop: 1 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    {this.showModal()}
                </View>
                <Text style={{ fontWeight: "700", fontSize: 25, alignSelf: "center", marginTop: 30 }}>BARTER SYSTEM</Text>
                <Image source={require("../assets/Welcome.png")} style={{ marginTop: 10, height: 250, width: 300, alignSelf: "center" }} />
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#fff" keyboardType="email-address" onChangeText={(text) => { this.setState({ email: text }) }} />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" secureTextEntry={true} onChangeText={(text) => { this.setState({ password: text }) }} />
                <TouchableOpacity style={styles.button} onPress={() => { this.login(this.state.email, this.state.password) }}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { this.setState({ isModalVisible: true }) }}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Image source={require("../assets/Sign-up.png")} style={{ height: 270, width: 350, alignSelf: "center" }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff9a76",
        width: '100%',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)"
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

    address: {
        borderWidth: 1.3,
        borderColor: "#ffeadb",
        marginTop: 30,
        paddingLeft: 9,
        alignSelf: "center",
        width: 160,
        height: 80,
        color: "#fff"
    },

    regForm: {
        borderWidth: 1.3,
        borderColor: "#ffeadb",
        marginTop: 30,
        paddingLeft: 9,
        alignSelf: "center",
        width: 160,
        height: 30,
        color: "#fff"
    },

    button: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#f7c5a8",
        width: 100,
        height: 25,
        borderRadius: 10,
    },

    buttonText: {
        color: "#1c2b2d",
        alignSelf: "center",
        textAlign: "center",
        marginTop: 1.5,
        fontWeight: "400",
        textAlignVertical: "center"
    },

    modalButton: {
        backgroundColor: "#f7c5a8",
        alignSelf: "center",
        marginTop: 15,
    }
})