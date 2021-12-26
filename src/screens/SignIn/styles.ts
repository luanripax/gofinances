import styled from "styled-components/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 70%;

    background-color: ${({theme}) => theme.colors.primary};

    justify-content: flex-end;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${hp(4.3)}px;

    text-align: center;

    margin-top: ${hp(9)}px;
`;

export const SignInTitle = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${hp(2.3)}px;

    text-align: center;

    margin-top: ${hp(8) + getBottomSpace()}px;
    margin-bottom: ${hp(7)}px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 30%;

    background-color: ${({theme}) => theme.colors.secondary};
`;
