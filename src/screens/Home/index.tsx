import React, { useState, useCallback } from 'react';
import {View, Text} from  'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategoryList } from '../../components/CategoryList';
import { Profile } from '../../components/Profile';
import {ListHeader} from '../../components/ListHeader'
import {ListDivider} from '../../components/ListDivider'
import {Load} from '../../components/Load'
import { styles } from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { AppointmentDetails } from '../AppointmentDetails';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENT } from '../../configs/database';
import { useEffect } from 'react';

export function Home(){
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]) ;

    const navigation = useNavigation();

    
    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
      } 

    function handleAppointmentDetails(guildSelected: AppointmentProps){
      navigation.navigate('AppointmentDetails', {guildSelected})
    }  

    function handleAppointmentCreate(){
      navigation.navigate('AppointmentCreate')
    }  

    async function loadAppointments() {
      const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);

      const dataAppointment: AppointmentProps[] = storage ? JSON.parse(storage) : [];



      if(category){
        setAppointments(dataAppointment.filter(item => item.category === category ))
      }else{
        setAppointments(dataAppointment)
      }

      setLoading(false);
    }

    useFocusEffect(useCallback(() => {
      loadAppointments();
    }, [category]))



   

    return (
        <Background>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd 
                  onPress={handleAppointmentCreate}
                />
           

            </View>
            <CategoryList 
                hasCheckBox={false}
                CategorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
              loading ? <Load/> :
              <>
              <View style={styles.content}>
               <ListHeader title="Partidas agendadas:" subtitle={`Total ${appointments.length}`}/>
              
              </View>
              <FlatList
                      showsVerticalScrollIndicator={false}
                      style={styles.matches}
                      ItemSeparatorComponent={()=> <ListDivider/>}
                      contentContainerStyle={{paddingBottom: 69}}
                      data={appointments}
                      keyExtractor={item => item.id}
                      renderItem={({item}) => (
                          <Appointment 
                            data={item}
                            onPress={() => handleAppointmentDetails(item)}  
                          />
                      )}
                      
              />
              </>

            }
            

            
            
        </Background>

    )
};