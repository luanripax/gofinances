import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import { 
    Container,
    Header, 
    UserWrapper,
    UserInfo, 
    Photo, 
    User, 
    UserGreeting,
    UserName,
    Icon,
    HighlightCards, 
    Transactions, 
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from './styles';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {

    const dataKey = '@gofinances:transactions';
    const [isLoading, setIsLoading] = useState(true);
    const [transaction, setTransaction] = useState<DataListProps[]>([]);
    const [highlightData, sethighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {

        const lastTransaction = 
            Math.max.apply(Math, collection
            .filter(item => item.type === type)
            .map(item => new Date(item.date)));
        
        console.log(lastTransaction);
        return Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        }).format(new Date(lastTransaction));
    }

    async function getTransactions() {
        const userTransactions = await AsyncStorage.getItem(dataKey);
        const currentData = userTransactions ? JSON.parse(userTransactions): [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = currentData.map((item: DataListProps) => {

            if (item.type === 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));


            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
        });

        setTransaction(transactionsFormatted);

        //const lastTransactionEntries = getLastTransactionDate(transaction, 'positive');
        //const lastTransactionExpensives = getLastTransactionDate(transaction, 'negative');

        sethighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
            },
            total: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        })

        setIsLoading(false);

    }

    useEffect(() => {
        getTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        getTransactions();
    }, []));

    return (
        <Container>
            {
                isLoading ? <LoadContainer>
                                <ActivityIndicator 
                                    color={theme.colors.secondary}
                                    size={'large'}    
                                />
                            </LoadContainer> :
            <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={ {uri: 'https://avatars.githubusercontent.com/u/38923629?v=4'} }/>
                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>Luan</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={() => {}}>
                            <Icon name="power"/>
                        </LogoutButton>
                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard 
                        type="up"
                        title="Entradas" 
                        amount={highlightData.entries.amount} 
                        lastTransaction="Última entrada dia 13 de abril"
                    />
                    <HighlightCard 
                        type="down"
                        title="Saídas" 
                        amount={highlightData.expensives.amount} 
                        lastTransaction="Última saída dia 13 de abril"
                    />
                    <HighlightCard 
                        type="total"
                        title="Total" 
                        amount={highlightData.total}
                        lastTransaction="01 à 06 de abril"
                    />
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList 
                        data={transaction}
                        keyExtractor={item => item.id}
                        renderItem={ ({item}) => <TransactionCard data={item}/>}
                    />

                </Transactions>
                </>
            }
        </Container>
    )
}





