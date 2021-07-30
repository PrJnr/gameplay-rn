import React from 'react';
import { View, ScrollView} from 'react-native';
import { styles } from './styles';

import {categories} from '../../utils/categories'
import { Category } from '../Category';

type Props ={
    CategorySelected: string;  
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean; //propriedade opcional
}

export function CategoryList({CategorySelected, setCategory, hasCheckBox=false}: Props){
    return(
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
               categories.map(category => (
                <Category 
                hasCheckBox={hasCheckBox}
                key={category.id} 
                title={category.title} 
                icon={category.icon} 
                checked={category.id === CategorySelected}
                onPress={() => setCategory(category.id)}
                />
               ))
            }
        </ScrollView>
     
    )
}