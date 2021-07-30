import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import BannerImg from '../../assets/banner.png';

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Member, MemberProps } from '../../components/Member';
import { Load} from '../../components/Load';
import { Header } from '../../components/Header';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';

type Params = {
  guildSelected: AppointmentProps;
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;


 };

export function AppointmentDetails(){
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const {guildSelected} = route.params as Params

  async function fetchGuildWidget() {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
      
    } catch  {
      Alert.alert('Verifique as configuraçoes do servidor. Habilite o Widget');
    }finally{
      setLoading(false);
    }
  }

  function handleShareInvite() {
    try {
      const message = Platform.OS === 'ios' 
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite
  
      Share.share({
        message,
        url: widget.instant_invite,
      });
      
    } catch (error) {
      Alert.alert('Compartilhamento desabilitado para este servidor.')
    }
  }

  function handleLinking() {
    
    widget.instant_invite 
      ? Linking.openURL(widget.instant_invite)
      : Alert.alert('Servidor com acesso restrito.')
    
  };

 useEffect(()=>{
   fetchGuildWidget();
 }, [])
  
  return (
    <Background>
      <Header 
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto 
              name="share"
              size={24}
              color={theme.colors.primary}
              onPress={handleShareInvite}
            />
          </BorderlessButton>
        }
      />

      <ImageBackground 
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}> 
            {guildSelected.guild.name} 
          </Text>

          <Text style={styles.subtitle}>   
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>


      {
        loading ? <Load/> :
        <>
          <ListHeader 
            title="Jogadores"
            subtitle={`Total: ${widget.presence_count}`}
          />
          <FlatList 
          data={widget.members}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Member data={item} />
          )}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          style={styles.members}
        />
       </>
      }
     

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" onPress={handleLinking} />
      </View>
    </Background>
  );
}