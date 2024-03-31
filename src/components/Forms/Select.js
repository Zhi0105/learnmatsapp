import React, { useContext } from 'react'
import { TranslationContext } from '@_context/TranslationContext';
import { View } from 'react-native'
import { Select } from 'native-base'
import { Dimensions } from 'react-native';
import { toCapitalize } from '@_utils/helpers';

export const DropDown = ({
  ariaPlaceHolder,
  value,
  onChange,
  is_language,
  data = [],
}) => {

  const windowWidth = Dimensions.get('window').width;
  const { translate } = useContext(TranslationContext)
  return (
    <View className="select-container relative w-full flex justify-center items-center">
        <Select
          fontSize={20}
          minW={windowWidth}
          selectedValue={value}
          accessibilityLabel={ariaPlaceHolder}
          placeholder={ariaPlaceHolder}
          onValueChange={onChange}
        >
        {is_language && <Select.Item label='English' value={"0"} />}      
        {data.length ? (
          data.map(
            (item, index) => {
              return (
                <Select.Item key={index} label={`${translate(toCapitalize(item?.name))}`} value={item?.id} />      
              );
            }
          )
        ) : (
          <Select.Item value="" label='The List is empty' disabled={true} />
        )}
        </Select>
    </View>
  );
};