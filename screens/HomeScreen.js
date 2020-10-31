import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            allItemRequests: []
        }
        this.requestRef = null;
    }

    getRequestedItemList = () => {
        this.requestRef = db.collection("exchange-requests")
            .onSnapshot((snapshot) => {
                var requestedItemList = snapshot.docs.map(document => document.data());
                this.setState({ allItemRequests: requestedItemList })
            })
    }

    componentDidMount() {
        this.getRequestedItemList();
    }

    componentWillUnmount() {
        this.requestRef;
    }

    keyExtractor = (item, index) => index.toString();
    renderItem = ({ item, i }) => {
        console.log(item.item_name);
        return (
            <ListItem
                key={i}
                title={item.item_name}
                subtitle={item.item_description}
                titleStyle={{ color: 'black', fontWeight: "bold" }}
                rightElement={
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "#fff" }}>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    {
                        this.state.allItemRequests.length === 0
                            ? (
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>List of all Requested Items</Text>
                                </View>
                            )
                            : (
                                <FlatList
                                    keyExtractor={this.keyExtractor}
                                    data={this.state.allItemRequests}
                                    renderItem={this.renderItem}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#f7c5a8",
        width: 100,
        height: 25,
        borderRadius: 10,
    }
})