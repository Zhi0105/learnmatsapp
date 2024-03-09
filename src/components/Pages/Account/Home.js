import React, { useContext, useState } from 'react'
import { Text, View } from 'react-native'
import useUserStore from '@_stores/auth'
import { TranslationContext } from '@_context/TranslationContext'
import LottieView from 'lottie-react-native'
import { Classlevel } from './Home/Classlevel'
import { Material } from './Home/Material'
import useClasslevelStore from '@_stores/classlevel'
import useMaterialStore from '@_stores/material'

export const Home = ({ navigation }) => {
  const { translate } = useContext(TranslationContext)
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { classlevels } = useClasslevelStore((state) => ({ classlevels: state.classlevels }));
  const { materials } = useMaterialStore((state) => ({ materials: state.materials }));
  const [ selected, setSelected ] = useState()

  return (
    <View className="login-main min-h-screen bg-gray-100">
      <View className="min-h-[15%] flex flex-row items-center justify-between px-4 mt-2">
        <View className="max-w-[70%]">
          <Text className="text-[#0e7490] text-3xl font-bold capitalize">Hello!</Text>
          <Text className="text-[#0e7490] text-2xl font-bold capitalize pl-2">{ translate(user?.name) }</Text>
        </View>
        <LottieView
          source={require('@_assets/learn.json')}
          style={{ width: "30%", height: "100%" }}
          autoPlay
          loop
        />
      </View>
        <View className="min-h-[20%] z-10 flex flex-row justify-between items-center">
          <View className="w-2/12"></View>
          <LottieView 
            source={require('@_assets/books.json')}
            style={{width: "100%", height: "100%",}}
            autoPlay
            loop
            />
        </View>
        <View className="bg-[#3b82f6] mt-[-110px] mx-4 py-10 pl-4 rounded-lg">
          <Text className="text-lg font-bold text-white">Never stop learning</Text>
          <Text className="text-lg font-bold text-white">for brighter</Text>
          <Text className="text-lg font-bold text-white">future!</Text>
        </View>
        <View className="classlevel-section max-h-[20%] px-4 mt-2">
          <Text className="text-xl font-bold">Class levels:</Text>
          <Classlevel 
            data={classlevels}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
        <View className="materials-section h-[30%] px-4 mt-2">
          <Text className="text-xl font-bold">List of Materials:</Text>
          <Material 
            data={materials}
            selected={selected}
            navigation={navigation}
          />
        </View>
    </View>
  )
}
