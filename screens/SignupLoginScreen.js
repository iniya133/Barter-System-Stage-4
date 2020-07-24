import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignupLoginScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            email: '',
            password: '',
            description: '',
            isModalVisible: false
        }
    }

    userSignUp = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            return(
                Alert.alert(
                    'Account created successfully',
                    '',
                    [
                      {text: 'OK', onPress: () => this.setState({ isModalVisible: false })}
                    ],
                    { cancelable: false }
                  )
            )
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return(
                Alert.alert(errorMessage)
            )
        })
        db.collection('users').add({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            contact: this.state.contact,
            email: this.state.email,
            description: this.state.description
        })
    }

    userLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            { this.props.navigation.navigate('Exchange') }
        }).catch(function(error){
            var error = error.code;
            var errorMessage = error.message;
            return(
                Alert.alert(errorMessage)
            )
        })
    }

    showModal = () => {
        return(
            <View>
                <Modal
                visible = {this.state.isModalVisible}
                animationType = "fade"
                transparent = {true}
                >
                    <View style = {styles.modalContainer}>
                        <ScrollView>
                            <KeyboardAvoidingView>

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    FIRST NAME
                                </Text>

                                <TextInput
                                style = {styles.signupInputs}
                                onChangeText = {(text) => {
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    LAST NAME
                                </Text>

                                <TextInput
                                style = {styles.signupInputs}
                                onChangeText = {(text) => {
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    ADDRESS
                                </Text>

                                <TextInput 
                                style = {styles.signupInputs}
                                multiline = {true}
                                onChangeText = {(text) => {
                                    this.setState({
                                        address: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    CONTACT
                                </Text>

                                <TextInput 
                                style = {styles.signupInputs}
                                keyboardType = 'numeric'
                                onChangeText = {(text) => {
                                    this.setState({
                                        contact: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    EMAIL
                                </Text>

                                <TextInput 
                                style = {styles.signupInputs}
                                keyboardType = 'email-address'
                                onChangeText = {(text) => {
                                    this.setState({
                                        email: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    PASSWORD
                                </Text>

                                <TextInput 
                                style = {styles.signupInputs}
                                secureTextEntry
                                onChangeText = {(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }}
                                />

                                <Text
                                style = {styles.signupInputsHeader}
                                >
                                    DESCRIPTION(OPTIONAL)
                                </Text>

                                <TextInput 
                                style = {styles.signupInputs}
                                multiline = {true}
                                onChangeText = {(text) => {
                                    this.setState({
                                        description: text
                                    })
                                }}
                                />

                                <TouchableOpacity
                                style = {styles.registerButton}
                                onPress = {() => {
                                    this.userSignUp(this.state.email, this.state.password)
                                }}
                                >
                                    <Text
                                    style = {styles.registerButtonText}
                                    >
                                        Register
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                style = {styles.registerButton}
                                onPress = {()=>{this.setState({
                                    isModalVisible: false
                                })}}
                                >
                                    <Text
                                    style = {styles.cancelButtonText}
                                    >
                                        Cancel
                                    </Text>
                                </TouchableOpacity>

                            </KeyboardAvoidingView>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        )
    }

    render(){
        return(
            <View>
                {this.showModal()}
                <Text
                style = {styles.text}
                >
                    EMAIL
                </Text>

                <TextInput
                style = {styles.emailInput}
                keyboardType = 'email-address'
                onChangeText = {(text)=>{
                    this.setState({
                        email: text
                    })
                }}
                />

                <Text
                style = {styles.text}
                >
                    PASSWORD
                </Text>

                <TextInput 
                style = {styles.passwordInput}
                secureTextEntry
                onChangeText = {(text)=>{
                    this.setState({
                        password: text
                    })
                }}
                />

                <TouchableOpacity
                style = {styles.loginButton}
                onPress = {()=>{this.userLogin(this.state.email, this.state.password)}}
                >
                    <Text
                    style = {styles.loginbuttonText}
                    >
                        LOGIN
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style = {styles.signupButton}
                onPress = {()=>{
                    this.setState({
                        isModalVisible: true
                    })
                }}
                >
                    <Text
                    style = {styles.signupbuttonText}
                    >
                        SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emailInput: {
        borderBottomWidth: 2,
        borderColor: '#FCB57F',
        width: 200,
        color: '#FE6666',
        marginBottom: 20
    },

    passwordInput: {
        borderBottomWidth: 2,
        borderColor: '#FCB57F',
        width: 200,
        color: '#FE6666',
        marginBottom: 20
    },
    text: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
    },

    loginButton: {
        backgroundColor: '#FBCEB1',
        borderRadius: 20,
        width: 200,
        height: 50,
        marginBottom: 20,
    },

    signupButton: {
        backgroundColor: '#FBCEB1',
        borderRadius: 20,
        width: 200,
        height: 50,
        marginBottom: 20
    },

    loginbuttonText: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 70,
        marginTop: 12
    },

    signupbuttonText: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 70,
        marginTop: 12
    },

    modalContainer:{
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE5B4',
        marginTop: 20
    },

    signupInputs: {
        borderBottomWidth: 2,
        borderColor: '#FCB57F',
        width: 200,
        color: '#FE6666',
        marginBottom: 20
    },

    signupInputsHeader: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 12
    },

    registerButton: {
        backgroundColor: '#FBCEB1',
        borderRadius: 20,
        width: 200,
        height: 50,
        marginBottom: 20,
    },

    cancelButton: {
        backgroundColor: '#FBCEB1',
        borderRadius: 20,
        width: 200,
        height: 50,
        marginBottom: 20,
    },

    registerButtonText: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 70,
        marginTop: 12
    },

    cancelButtonText: {
        color: 'rgb(240, 100, 0)',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: 70,
        marginTop: 12
    }
})