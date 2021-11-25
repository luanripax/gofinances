import React from "react";

import { 
    Container,
    Title,
    Icon
 } from "./styles";

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

interface Props  {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
    onPress: () => void;
}

export function TransactionTypeButton({
    title, 
    type,
    isActive,
    onPress,
    ...rest
}: Props) {
    return(
        <Container {...rest} isActive={isActive} type={type} onPress={onPress}>
            <Icon 
                name={icons[type]}
                type={type}
            />
            <Title>
                {title}
            </Title>
        </Container>
    );
}