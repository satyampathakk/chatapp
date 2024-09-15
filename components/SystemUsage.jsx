import { View, Text } from 'react-native'
const SystemUsage = ({cpu ,tm ,fm ,um , mp}) => {
  return (
    <View className="border-4 border-slate-300 h-auto rounded-xl " >
      <Text className="text-center text-white h-8">CPU Usage Percentage :- {cpu} %</Text>
      <Text className="text-center text-white h-8">Total Memory :- {tm/(1024 *1024)}  MB</Text>
      <Text className="text-center text-white h-8">Free Memory :- {fm/(1024 *1024)}  MB </Text>
      <Text className="text-center text-white h-8">Used Memory :- {um/(1024 *1024)}  MB</Text>
      <Text className="text-center text-white h-8">Memory Usage Percentage :- {mp} %</Text>
    </View>
  )
}

export default SystemUsage