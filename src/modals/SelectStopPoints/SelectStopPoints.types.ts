import { Ref } from 'react';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { IStopPointsData } from '../../screens/Home/Home.types';

export type TSelectStopPointsProps = {
  title: string;
  modalRef: Ref<BottomSheetModalMethods>;
  stopPointsData: IStopPointsData | undefined;
};
