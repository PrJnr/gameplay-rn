import React from 'react';
import { styles } from './styles';
import {theme} from '../../global/styles/theme';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type Props = RectButtonProps;

export function ButtonAdd({...rest}: Props){
    
    return (
      <RectButton style={styles.container} {...rest}>
          <MaterialCommunityIcons 
            name="plus"
            color= {theme.colors.heading}
            size={24}

          />
      </RectButton>
    )
}
