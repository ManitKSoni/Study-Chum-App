import React,{ Fragment, Component }  from 'react';
import {Button, Keyboard, StyleSheet, Text, Image, TouchableWithoutFeedback, View,SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity} from 'react-native';
//import ImagePicker from 'react-native-image-picker';
//import { withStyles, Avatar, Icon} from 'react-native-ui-kitten';
import Firebase from '../../config/Firebase';
import * as ImagePicker from "expo-image-picker";


class Settings extends React.Component{

    db = Firebase.firestore();
    userID = Firebase.auth().currentUser.uid;
    unsubscribe;

    state = {
        bio: '',
        userDetails: '',
        image: null
    }


    constructor(props) {
        super(props);
        this.onPressLogOut = this.onPressLogOut.bind(this);
        this.onPressEditProfile = this.onPressEditProfile.bind(this);
    }

    /** Handle logging out and reset stack */
    onPressLogOut() {
        try {
            Firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }

    /** Navigates to EditProfile form */
    onPressEditProfile() {
        this.props.navigation.navigate("EditProfile");
    }

    /** Gets the initial user details */
    getUserDetails() {
        return this.db.collection("users")
            .doc(this.userID)
            .get()
            .then(function(doc) {
                return doc.data()
        })
            .catch(function(error) {
                console.log('Error getting user details: ', error)
            })
    }

    /** Initializes state variables based on the firestore data */
    fetchUserDetails = async () => {
        try {
            const userDetails = await this.getUserDetails()
            this.setState({ userDetails })
        } catch (error) {
            console.log(error)
        }
    }

    /** Called on Settings screen being rendered */
    componentDidMount() {
        this.fetchUserDetails();
        this.renderFileData();
    }

    /** launches user's photo library to pick profile picture */
    /* selectImage = () => {
        const options= {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            } else {
                const source = { uri: response.uri }
                console.log(source)
                this.setState({
                    image: source
                })
            }
        })
    } */

    /*
    * Opens the image picker on user's phone
    */
    chooseImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if(!result.cancelled) {
        console.log("In library")
        this.setState({image: result.uri});
        console.log(this.state.image);
        this.uploadImage(result.uri, this.userID)
          .then(() => {
            console.log("Success")
          })
          .catch((error) => {
            console.log(error)
          });
      }
    }

    /*
    * Uploads image to firebase using UID
    * @param uri - image uri that saves to firebase
    * @param userID - UID for unique key
    */
    uploadImage = async (uri, userID) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = Firebase.storage().ref().child("images/" + userID)
      return ref.put(blob);
    }

   /* chooseImage = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };

            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            // alert(JSON.stringify(response));s
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
      }*/
    /* launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });

      }*/

    /*renderFileData() {
        if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images}
          />
        } else {
          return <Image source={require('../../assets/dummy.png')}
            style={styles.images}
          />
        }
      }*/

      /*
      * Retrieves image from firebase. If it does not exist,
      * the state will stay null
      */
      async renderFileData() {

        var storage = Firebase.storage();
        var imagePath = storage.ref('images/' + this.userID);
        try{
        var image = await imagePath.getDownloadURL();

          this.setState({image:image})
        } catch(err) {
          console.log("No image on database")
        }

      }

      /*
      * If the image state is null, show default image.
      * Otherwise show image from firebase
      */
      showImage = () => {
        if(!this.state.image) {
          return (<Image source={require('../../assets/dummy.png')} style={styles.images}/>)
        } else {
          return (<Image source = {{uri:this.state.image}} style={styles.images}/>)
        }
      }

  /*  renderFileUri() {
        if (this.state.fileUri) {
          return <Image
            source={{ uri: this.state.fileUri }}
            style={styles.images}
          />
        } else {
          return <Image
            source={require('../../assets/gallery.png')}
            style={styles.images}
          />
        }
      }*/

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>

                    {/* <Image
                        style={styles.image}
                        source={require('./tumblr_inline_pazyiucOAC1v37n4k_1280.jpg')}
                    /> */}
                    <Fragment>
                        <StatusBar barStyle="dark-content" />
                        <SafeAreaView>
                            <View style={styles.body}>
                              <View style={styles.ImageSections}>
                                <View>
                                    {this.showImage()}
                                    <Text style={{textAlign:'center',fontSize:22,paddingBottom:25}} >{this.state.userDetails.firstName + " " + this.state.userDetails.lastName}</Text>
                                 </View>

                            </View>
                            <View style={styles.textAlign}>
                                   <Text style={{textAlign:'center', fontSize:20, paddingBottom:10}} >{this.state.userDetails.major + " " + this.state.userDetails.year}</Text>
                                   <Text style={{textAlign:'center', fontSize:20, paddingBottom:10}} >{this.state.userDetails.bio}</Text>
                            </View>
                             <View style={styles.btnParentSection}>
                                <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                                  <Text style={styles.btnText}>Change Profile Picture</Text>
                                </TouchableOpacity>
                            {/* <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                                <Text style={styles.btnText}>Directly Launch Image Library</Text>
                            </TouchableOpacity> */}
                            <Button style={styles.button}title="Edit Profile"onPress={this.onPressEditProfile}/>
                            <Button style={styles.button} title="Log out" onPress={this.onPressLogOut}/>
                            </View>
                        </View>
                      </SafeAreaView>
                    </Fragment>

                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },

    text: {
        width: '100%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'left'
    },

    button: {
        marginTop: 5,
        marginBottom: 5,
        paddingVertical: 15,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200,
        textAlign: 'center',
        fontSize: 15
    },

    image: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    scrollView: {
        backgroundColor: '#F6820D',
      },

      body: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
      },
      ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
      },
      images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
      },
      btnParentSection: {
        alignItems: 'center',
        marginTop:10
      },
      btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom:10
      },
      btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight:'bold'
      }
})

export default Settings;
