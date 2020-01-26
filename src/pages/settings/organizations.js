import React from 'react';
// import { auth, firestore } from 'services/firebase';


import Layout from 'layouts/settings-layout';
import { Seo } from 'components';
// import { Button, Icon, Menu } from 'antd';

const SettingsOrganizations = () => {


  // be able to see their signin method

  // update email
  // user.email(email).then(function() {

  // }, function(error) {
  //   // An error happened.
  // });

  // update password

  // have them re authenticate first

  // user.updatePassword(password).then(function() {

  // }, function(error) {
  //   // An error happened.
  // });


  // update display name
  // update photoUrl
  // user.updateProfile({
  //   displayName: 'Jane Q. User',
  //   photoURL: 'https://example.com/jane-q-user/profile.jpg'
  // }).then(function() {
  //   // Profile updated successfully!
  //   // "Jane Q. User"
  //   var displayName = user.displayName;
  //   // "https://example.com/jane-q-user/profile.jpg"
  //   var photoURL = user.photoURL;
  // }, function(error) {
  //   // An error happened.
  // });


  // billing settings

  // what orgs am i in

  // usage statistics

  // member since

  // delete
  // user.delete()
  // function to delete all their data?

  // view personal information
  // user.toJSON()

  // extendable


  return (
    <Layout>
      <Seo title={'Organizations'}/>

      <p>organizations</p>
    </Layout>
  );
};

export default SettingsOrganizations;
