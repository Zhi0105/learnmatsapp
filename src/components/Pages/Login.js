import React from 'react'
import { Text, View, TextInput } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Controller, useForm } from 'react-hook-form'

export const Login = () => {
  const [number, onChangeNumber] = React.useState('');
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <View className="login-main min-h-screen flex justify-center items-center">
      <View className="w-4/5 flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg shadow-lg bg-gray-50 lg:py-0">
          <FastImage 
            style={{ width: 200, height: 200 }}
            source={require('../../assets/logo.png')}
            alt={"Logo"}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>Login to your Account</Text>
          <View className="form-container w-full p-6 space-y-4 form_container md:space-y-6 sm:p-8">
            <View className="space-y-4 form md:space-y-6">
              <View className="email-textfield">
              </View>
            </View>
          </View>
      </View>
    </View>
  )
}
