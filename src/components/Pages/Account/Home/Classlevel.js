import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, FlatList} from 'react-native'
import LottieView from 'lottie-react-native'
import { TranslationContext } from '@_context/TranslationContext'


export const Classlevel = ({ data = [], navigation }) => {
  const { translate } = useContext(TranslationContext)

  return (
      <View className="classlevel-main h-full w-full p-2 flex flex-row flex-wrap justify-around gap-2">
          {!data?.length && 
            <View><Text>no data found!</Text></View>
          }
          {data?.length > 0 && 
            <View className="flex w-full justify-center items-center">
              <FlatList
                horizontal 
                data={data}
                keyExtractor={item => item.id}
                contentContainerStyle = {{
                  display: "flex",
                  gap: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                  onPress={() => navigation.navigate("Material", { classlevel: item })}
                  className="max-w-sm flex flex-col justify-center items-center py-8"
                >
                    <View 
                      className={`w-[120] h-[120] rounded-lg overflow-hidden shadow-xl p-4 mb-1 bg-white`}
                    >
                    <LottieView
                      source={require('@_assets/star.json')}
                      style={{ width: "100%", height: "100%" }}
                      autoPlay
                      loop
                    />
                    </View>
                    <Text>{translate(item?.name)}</Text>
                  </TouchableOpacity>
              )}
            />
            </View>
          }
      </View>
  )
}
