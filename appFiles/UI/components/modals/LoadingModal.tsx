import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {loadingModalClose} from '../../../appStore/actions/modalActions';
import {screenHeight, screenWidth} from '../../utils';

const LoadingModal = () => {
  const {
    loadingModal: {isOpen},
  } = useSelector((state: any) => state.modalReducer);
  const dispatch = useDispatch();
  const {modalStyle, containerStyle} = styles;

  const modalClosing = () => {
    if (isOpen) {
      dispatch(loadingModalClose());
    }
  };

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      propagateSwipe={true}
      isVisible={isOpen}
      backdropColor={Colors.secondaryBackdropColor}
      onBackdropPress={() => modalClosing()}
      style={modalStyle}
      deviceWidth={screenWidth}
      deviceHeight={screenHeight}>
      <View style={containerStyle}>
        <Progress.Circle
          size={90}
          indeterminate={true}
          borderWidth={10}
          borderColor={'gray'}
          thickness={5}
          strokeCap={'round'}
          fill={'transparent'}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    marginBottom: 0,
  },
  containerStyle: {
    zIndex: 99999,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    opacity: 0.8,
  },
});
export default LoadingModal;
