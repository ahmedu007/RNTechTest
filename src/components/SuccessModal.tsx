import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export const SuccessModal = ({ modalVisible }: { modalVisible: boolean }) => {
  const [isModalVisible, setIsModalVisible] = useState(modalVisible);

  useEffect(() => {
    setIsModalVisible(modalVisible);

    if (modalVisible) {
      const timer = setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Your account has been successfully created 🎉🎉
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <Text style={styles.textStyle}>Awesome!</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
