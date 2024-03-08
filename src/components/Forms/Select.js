import { View } from 'react-native'
import { Select } from 'native-base'
import {Dimensions} from 'react-native';

export const DropDown = ({
  ariaPlaceHolder,
  value,
  onChange,
  data = [],
}) => {

  const windowWidth = Dimensions.get('window').width;
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
          <Select.Item label='english' value={"0"} />      
        {data.length ? (
          data.map(
            (item, index) => {
              return (
                <Select.Item key={index} label={item?.name} value={item?.id} />      
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