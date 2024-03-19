import React, { useCallback, useContext } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { TranslationContext } from '@_context/TranslationContext'
import LottieView from 'lottie-react-native'
import _ from 'lodash'

export const Material = ({ data = [], selected = null, navigation }) => {
  const { translate } = useContext(TranslationContext)
  const materialCallback = useCallback((materials, classlevel_id) => {
    if(classlevel_id) {
      const newMaterials = _.filter(materials, (i) => { return i.classlevel_id === Number(classlevel_id) })
      return newMaterials
    } else {
      return materials
    }
  }, [])

  const handleMaterialNavigate = (material) => {
    navigation.navigate("Material", { material: material })
  }

  return (  
    <ScrollView className="material-main h-full w-full">
      <View className="container p-2 flex flex-row flex-wrap justify-around gap-2">
          {!materialCallback(data, selected)?.length && (
            <View><Text>no data found!</Text></View>
          )}
          {materialCallback(data, selected)?.length > 0 && materialCallback(data, selected).map((material, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleMaterialNavigate(material)}
                className="max-w-sm flex flex-col justify-center items-center"
                key={index} 
              >
                <View className="w-[120] h-[120] rounded-lg overflow-hidden shadow-xl bg-white p-4 mb-1">
                <LottieView
                  source={require('@_assets/material.json')}
                  style={{ width: "100%", height: "100%" }}
                  autoPlay
                  loop
                />
                </View>
                <Text>{translate(material?.name)}</Text>
              </TouchableOpacity>
            )
          })}      
      </View>
  </ScrollView>
  )
}
