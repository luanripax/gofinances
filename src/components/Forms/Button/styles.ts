import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";


export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    border-radius: 5px;
    padding: 18px;
    
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    font-size: ${Platform.OS === 'ios' ? RFValue(25) : RFValue(14)}px;

    color: ${({theme}) => theme.colors.shape};
`;