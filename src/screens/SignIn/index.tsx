import React from 'react';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer
 } from './styles';

export function SignIn() {
    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={wp(30)}
                        height={hp(9)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>

            </Footer>
        </Container>
    )
}