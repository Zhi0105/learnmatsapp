import React, { useState, useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity, TouchableHighlight  } from 'react-native'
import FastImage from 'react-native-fast-image'
import { AuthContext } from '@_context/AuthContext';
import { Controller, useForm } from 'react-hook-form'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Register = ({ navigation }) => {

  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const { register, registerLoading } = useContext(AuthContext)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    register(data)
  };

  const handlePasswordVisibility = (isVisible) => {
    setisPasswordVisible(!isVisible);
  };

  return (
    <View className="register-main min-h-screen flex justify-center items-center">
      <View className="w-4/5 flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg shadow-lg bg-gray-50 lg:py-0">
          <FastImage 
            style={{ width: 200, height: 200 }}
            source={require('../../assets/logo.png')}
            alt={"Logo"}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>Register to your Account</Text>
          <View className="form-container w-full p-6 space-y-4 form_container md:space-y-6 sm:p-8">
            <View className="space-y-4 form md:space-y-6">

              <View className="name-field">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /[\S\s]+[\S]+/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                  )}
                  name="name"
                />
                {errors.name && (
                    <Text className="text-sm text-red-400 indent-2">name is required*</Text>
                )}
              </View>

              <View className="email-textfield">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                    <Text className="text-sm text-red-400 indent-2">email is required*</Text>
                )}
              </View>
              
              <View className="password-field">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern: /[\S\s]+[\S]+/,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View>
                      <TextInput
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="password"
                        secureTextEntry={!isPasswordVisible}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <TouchableHighlight 
                          className="absolute -inset-y-0 right-0 pointer-events-none px-4 mt-3" 
                          onPress={() => handlePasswordVisibility(isPasswordVisible)}
                      >
                          <MaterialCommunityIcons name={isPasswordVisible ? 'eye-off' : 'eye' } color="gray" size={28} /> 
                      </TouchableHighlight>
                    </View>
                  )}
                  name="password"
                />
                {errors.password && (
                    <Text className="text-sm text-red-400 indent-2">password is required*</Text>
                )}
              </View>

              <TouchableOpacity 
                className="w-full text-gray-900 bg-white flex justify-center items-center cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onPress={handleSubmit(onSubmit)}
                disabled={registerLoading}              
              >
                <Text>{registerLoading ? "Please wait..." : "Submit"}</Text>
              </TouchableOpacity> 

              
              <TouchableOpacity 
                className="w-full text-gray-900 bg-white flex justify-center items-center cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onPress={() => navigation.navigate('Login')}              
              >
                <Text>Already have an account ?</Text>
              </TouchableOpacity> 
            </View>
          </View>
      </View>
    </View>
  )
}
