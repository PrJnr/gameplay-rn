import {StyleSheet} from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      

    },
    image: {
       width:  '100%',
       height: 315,
    },
    content: {
        marginTop: -40,
        paddingHorizontal: 40,
        
    },
    title: {
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 37,
        marginBottom: 3,
        fontFamily: theme.fonts.title700,
        lineHeight: 40,

    },
    subtitle: {
        color: theme.colors.heading,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 27,
        fontFamily: theme.fonts.title500,
        lineHeight: 25,
    }
    
})