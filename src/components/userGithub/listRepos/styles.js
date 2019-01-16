const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
    viewContainPagination: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8
    },
    textPag: {
      fontSize: 16,
      marginLeft: 10,
      marginRight: 10
    },
    btnPagination: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 30
    }
});
