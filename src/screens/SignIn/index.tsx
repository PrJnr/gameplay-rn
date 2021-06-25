import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {styles} from './styles';

import {ButtonIcon} from '../../components/ButtonIcon';
import IllustrationImage from "../../assets/illustration.png";

export  function SignIn(){
  return(
    <View style={styles.container}>
      
      <Image 
      source={IllustrationImage} 
      style={styles.image}
      resizeMode='stretch'
      
      />   
      <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se  {`\n`}
            e organize suas {`\n`} 
            jogatinas {`\n`}
            
          </Text>
          <Text style={styles.subtitle}>
              Crie grupos para jogar seus games {`\n`}
              favoritos com seus amigos
          </Text>

          <ButtonIcon title={"Entrar com Discord"}/>
      </View>
    </View>
  )
}