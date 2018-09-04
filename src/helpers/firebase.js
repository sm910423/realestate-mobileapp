import firebase from './../config/firebase';
import Firebase from 'firebase';
import * as GoogleSignin from 'react-native-google-signin';
import * as FBSDK from 'react-native-fbsdk';

export const fbEmailSignup = (email, password, firstname, lastname, callback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(credential => {
        if (credential) {
            callback({status: 'success', data: credential});
        } else {
            callback({status: 'error', message: "ERROR"});
        }
    }).catch(e => callback({status: 'error', message: e.toString()}));
}

export const fbEmailLogin = (email, password, callback) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(credential => {
        if (credential) {
            console.log("firebase login result", credential);
            callback({status: 'success', data: credential});
        } else {
            callback({status: 'error', message: "ERROR"});
        }
    }).catch(e => callback({status: 'error', message: e.toString()}));
};

export const fbGoogleLogin = (callback) => {
    // const provider = Firebase.auth.GoogleAuthProvider;
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // provider.addScope('https://www.googleapis.com/auth/plus.login');
    // console.log(provider);
    
    const loginWithUserCredential = (data) => {
        const credential = Firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    
        firebase.auth().signInAndRetrieveDataWithCredential(credential).then(result => {
            console.log("firebase login result", result);
            callback({ status: 'success', data: result });
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
                        const email = user.additionalUserInfo.profile.email;
                        //profile.first_name, last_name
                        user.user.email = email;
                        callback({ status: 'success', data: user });
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