import { Text, View, TextInput,TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from './styles'
import {Participant} from '../../components/Participant'
import { useState } from "react";


export default function Home() {
  const [participants, setParticipants] = useState<string[]>(['John'])
  const [participantName, setParticipantName] = useState('')
  
  function handleParticipantAdd(){
    if (participants.includes(participantName)){
  
      return Alert.alert('Participante Existe.', 'Já existe um participante na lista')
    }


    setParticipants(prevState=>[...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name:string){
    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: ()=>setParticipants(prevState=> prevState.filter(participant=>participant!==name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}> Quinta, 5 de novembro de 2024</Text>
  
      <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="#6B6B6B"
        onChangeText={setParticipantName}
        value={participantName}
        />
       <TouchableOpacity  style={styles.button} onPress={handleParticipantAdd}>
        <Text style={styles.buttonText}>
          +
        </Text>
       </TouchableOpacity>
      </View>

      <FlatList
      data={participants}
      keyExtractor={item=>item}
      renderItem={({item})=>(
        <Participant
        key={item+Math.random()}
        name={item}
        onRemove={handleParticipantRemove}/>)}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={()=>(
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença
        </Text>
      )}
      />
    </View>
  );
}