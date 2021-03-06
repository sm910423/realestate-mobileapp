import firebase from './../config/firebase';
import Firebase from 'firebase';
import * as GoogleSignin from 'react-native-google-signin';
import * as FBSDK from 'react-native-fbsdk';

const usersRef = firebase.database().ref('users');

export const fbEmailSignup = (email, password, firstname, lastname, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(credential => {
        if (credential) {
            fbUserInfoSave({ firstname, lastname, email, uid: credential.user.uid });
            callback({ status: 'success', data: credential.user.uid });
        } else {
            callback({ status: 'error', message: "ERROR" });
        }
    }).catch(e => callback({status: 'error', message: e.toString()}));
}

export const fbEmailLogin = (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(credential => {
        if (credential) {
            // console.log("firebase login result", credential);
            callback({ status: 'success', data: credential.user.uid });
        } else {
            callback({ status: 'error', message: "ERROR" });
        }
    }).catch(e => callback({status: 'error', message: e.toString()}));
};

export const fbGoogleLogin = (callback) => {
    const loginWithUserCredential = (data) => {
        const credential = Firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(result => {
            fbUserInfoSave({ firstname: data.user.givenName, lastname: data.user.familyName, email: data.user.email, uid: result.user.uid, picture: data.user.photo })
            callback({ status: 'success', data: result.user.uid });
        }).catch((error) => { 
            callback({ status: 'error', message: error.toString() });
        });
    };
    
    const option = {
        iosClientId: '680540690558-af4l67hh95f8ejlpjres8d3n85d75qpp.apps.googleusercontent.com',
        webClientId: '680540690558-ar88boq0fqboei718b9ptm5nkaq9d6m2.apps.googleusercontent.com',
        offlineAccess: false,
    };
    
    GoogleSignin.GoogleSignin.hasPlayServices({autoResolve: true}).then(() => {
        GoogleSignin.GoogleSignin.configure(option);
        
        GoogleSignin.GoogleSignin.signIn().then((data) => {
            if (data) {
                console.log("user", data);
                loginWithUserCredential(data);
            } else {
                callback({status: 'error', message: 'Error'});
            }
        }).catch(error => {
            callback({status: 'error', message: error.toString()});
        });
    }).catch(err => {
        callback({status: 'error', message: err.toString()});
    });
}

export const fbFacebookLogin = (callback) => {
    FBSDK.LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {
        if (!result.isCancelled) {
            FBSDK.AccessToken.getCurrentAccessToken().then(data => data.accessToken.toString()).then((token) => {
                const credential = Firebase.auth.FacebookAuthProvider.credential(token);
                if (credential) {
                    firebase.auth().signInAndRetrieveDataWithCredential(credential).then(user => {
                        console.log("firebase login result", user);
                        const info = user.additionalUserInfo.profile;

                        let picture = null;
                        if (info.picture && info.picture.data && info.picture.data.url) {
                            picture = info.picture.data.url;
                        }
                        
                        fbUserInfoSave({ firstname: info.first_name, lastname: info.last_name, email: info.email, uid: user.user.uid, picture });
                        callback({ status: 'success', data: user.user.uid });
                    }).catch(error => {
                        callback({ status: 'error', message: error.toString() });
                    })
                } else {
                    callback({ status: 'error', message: "Credential was null" });
                }
            });
        } else {
            callback({ status: 'error', message: "Was canceled by you." });
        }
    }).catch(error => {
        callback({ status: 'error', message: error.toString() });
    });
}

export const fbResetEmailSend = (email, callback) => {
    firebase.auth().sendPasswordResetEmail(email).then(result => {
        console.log("send password reset email", result);
        callback({ status: 'success' });
    }).catch(error => {
        callback({ status: 'error', message: error.toString() });
    });
}

export const fbUserInfoSave = async (info) => {
    let result = await fbGetUserInfo(info.uid);

    if (result) {
    } else {
        let newUserRef = usersRef.push();
        newUserRef.set(info);
        // console.log(newUserRef.toString());
    }
}

export const fbGetUserInfo = (uid) => {
    return new Promise((resolve, reject) => {
        usersRef.orderByChild('uid').equalTo(uid).on('value', (result) => {
            resolve(result.val());
        }, (error) => {
            reject(error);
        });
    });
}