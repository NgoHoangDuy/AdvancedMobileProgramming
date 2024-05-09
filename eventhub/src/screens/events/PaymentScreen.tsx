import {View, Text} from 'react-native';
import React, { useState } from 'react';
import {
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TagComponent,
  TextComponent,
} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {DateTime} from '../../utils/DateTime';
import {appColors} from '../../constants/appColors';
import eventAPI from '../../apis/eventApi';
import { LoadingModal } from '../../modals';

const PaymentScreen = ({navigation, route}: any) => {
  const {billDetail} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const handlePaySuccessfully = async () => {
    const api = `/update-payment-success?billId=${billDetail._id}`;

    try {
      setIsLoading(true);
      setIsDisable(true)
      const res = await eventAPI.HandleEvent(api);
      setIsLoading(false);
      navigation.navigate('EventDetail', {id: billDetail.eventId});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerComponent>
      <SectionComponent>
        <RowComponent justify="flex-end">
          <TagComponent
            label={billDetail.status === 'success' ? 'Success' : 'Unpaid'}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{alignItems: 'center'}}>
        <TextComponent
          text={`ID: ${billDetail._id}`}
          font={fontFamilies.bold}
          size={20}
        />
        <TextComponent
          text={`Date: ${DateTime.GetDayString(billDetail.createdAt)}`}
        />
        <SpaceComponent height={16} />
        <TextComponent
          text={`$${parseFloat(billDetail.price).toLocaleString()}`}
          font={fontFamilies.bold}
          size={24}
          color={appColors.primary}
        />
      </SectionComponent>
      <SectionComponent
        styles={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
        }}>
        <RowComponent justify="space-between">
          <TextComponent text="Total change" />
          <TextComponent
            font={fontFamilies.medium}
            color={appColors.primary}
            text={`$${billDetail.price}`}
          />
        </RowComponent>
        <ButtonComponent
          onPress={handlePaySuccessfully}
          text="Pay now"
          type="primary"
          styles={{marginBottom: 12, marginVertical: 12}}
          disable={isDisable}
        />
        <TextComponent
          text="Payment securely progressed by Paypal"
          styles={{textAlign: 'center'}}
          size={12}
        />
      </SectionComponent>
      <LoadingModal visible={isLoading} />
    </ContainerComponent>
  );
};

export default PaymentScreen;