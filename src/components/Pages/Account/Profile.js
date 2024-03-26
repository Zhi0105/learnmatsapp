import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import useUserStore from '@_stores/auth';
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateUser } from '@_services/authentications';
import { showMessage } from "react-native-flash-message";

export const Profile = ({ navigation }) => {
  const { user, setUser, token } = useUserStore((state) => ({ user: state.user, setUser: state.setUser, token: state.token }));
  const queryClient = useQueryClient();
  const [ isUpdate, setIsUpdate ] = useState(false)
  const {
    handleSubmit,
    control,
    setValue,
    formState : { errors }
  } = useForm({  
    defaultValues: {
      name: '',
    },
  });

  const { mutate: handleUpdateUser, isLoading: updateLoading} = useMutation({
    mutationFn: UpdateUser,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['update-user'] });
        setUser(data)
        setIsUpdate(false)
        showMessage({
          message: "update success",
          type: 'success',
          duration: 1000,
          floating: true,
          position: 'top',
        })
        navigation.navigate("HomeStack")
      }, 
    onError: (err) => {  
      showMessage({
        message: err.response.data.message,
        type: 'warning',
        duration: 1000,
        floating: true,
        position: 'top',
      })
    },
});

  const onSubmit = (data) => {
    if(token) { 
      let payload = {
        ...data,
        user: token
      }
      handleUpdateUser(payload)
    }
  }

  const userDetail = useCallback(() => {
    !isUpdate ? setValue("name", user.name) : setValue("name", "") 
  }, [isUpdate, setValue])


  useEffect(() => {
    userDetail()
  }, [userDetail])

  return (
    <View className="profile-main min-h-screen w-full p-6 space-y-4">
      <View className="space-y-4 form md:space-y-6">
        <View className="name-textfield">
          <Controller 
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={isUpdate}
              />
            )}
            name="name"
          />
        { errors.name && isUpdate && <Text className="text-red-400 indent-2 text-sm">name is not invalid*</Text> }

        </View>
        
        {isUpdate &&
          <View className="flex gap-2">
            <TouchableOpacity
              disabled={updateLoading}
              onPress={handleSubmit((data) => onSubmit(data))} 
              className="flex justify-center items-center rounded pb-2 pt-2.5 bg-green-400"
            >
              <Text
                className="text-xs font-medium capitalize leading-normal text-center text-white"
              >
              {updateLoading ? "Please wait..." : "Confirm"}  
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsUpdate(false)} 
              className="flex justify-center items-center rounded pb-2 pt-2.5 bg-red-400"
            >
              <Text
                className="text-xs font-medium capitalize leading-normal text-center text-white"
              >
                cancel
              </Text>
            </TouchableOpacity>
          </View>
        }
        {!isUpdate &&
          <TouchableOpacity
            onPress={() => setIsUpdate(true)} 
            className="flex justify-center items-center rounded pb-2 pt-2.5 bg-blue-400"
          >
            <Text
              className="text-xs font-medium capitalize leading-normal text-center text-white"
            >
              Update
            </Text>
          </TouchableOpacity>
        }

      </View>
    </View>
  )
}
