import React, { useState, useCallback, useContext } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { TranslationContext } from '@_context/TranslationContext';
import useClasslevelStore from '@_stores/classlevel';
import useCategoryStore from '@_stores/category';
import useMaterialStore from '@_stores/material';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DropDown } from '@_components/Forms/Select'
import LottieView from 'lottie-react-native'
import _ from 'lodash';

export const Material = ({ route, navigation }) => {
  const { translate } = useContext(TranslationContext)
  const { classlevel } = route.params
  const { classlevels } = useClasslevelStore((state) => ({ classlevels: state.classlevels }));
  const { categories } = useCategoryStore((state) => ({ categories: state.categories }));
  const { materials } = useMaterialStore((state) => ({ materials: state.materials }));
  const [ selectedClass, setSelectedClass ] = useState()
  

  const nameCallback = useCallback(() => {
    if(selectedClass) {
      const level = _.find(classlevels, { id: selectedClass })
      return level?.name

    } else {
      return classlevel?.name
    }
  }, [selectedClass])

  const categoryCallback = useCallback(() => {
    if(selectedClass) {
      const categoryList = _.filter(categories, { classlevel_id: selectedClass })
      return categoryList

    } else {
      const categoryList = _.filter(categories, { classlevel_id: classlevel?.id })
      return categoryList
    }
  }, [selectedClass])

  const materialCallback = useCallback((materials, category_id) => {
    const materialList = _.filter(materials, { category_id: category_id })
    return materialList
  }, [])

  return (
    <View className="material-main min-h-screen w-full">
      <View className="title w-full flex flex-row justify-between items-center py-4 px-4 border-y-4 border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" color="gray" size={28} /> 
        </TouchableOpacity>
        <Text className="font-bold text-xl capitalize">{translate(nameCallback())}</Text>
        <Text className="mr-6"></Text>
      </View>
      <DropDown 
        value={selectedClass}
        onChange={(newValue) => { setSelectedClass(newValue) }}
        ariaPlaceHolder={"change level ?"}
        is_language={false}
        data={classlevels}
      />

      <View className="category-list mt-8">
        {!categoryCallback()?.length && 
          <Text>no data found!</Text>
        }
        {categoryCallback()?.length > 0 && categoryCallback()?.map((category, index) => {
          return (
            <View key={index} className="w-full px-4">
              <Text className="font-bold text-md capitalize">{translate(category?.name)}</Text>
              <View className="flex w-full justify-center items-center">
                {!materialCallback(materials, category?.id)?.length &&
                  <Text>no material found!</Text>
                }
                {materialCallback(materials, category?.id)?.length > 0 &&
                  <FlatList
                    horizontal 
                    data={materialCallback(materials, category?.id)}
                    keyExtractor={item => item.id}
                    contentContainerStyle = {{
                      display: "flex",
                      gap: 30,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                      onPress={() => navigation.navigate("Materialdetail", { material: item })}
                      className="max-w-sm flex flex-col justify-center items-center py-8"
                      >
                        <View 
                          className={`w-[120] h-[120] rounded-lg overflow-hidden shadow-xl p-4 mb-1 bg-white`}
                        >
                        <LottieView
                          source={require('@_assets/material.json')}
                          style={{ width: "100%", height: "100%" }}
                          autoPlay
                          loop
                        />
                        </View>
                        <Text>{translate(item?.name)}</Text>
                      </TouchableOpacity>
                    )}
                  />
                }
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
