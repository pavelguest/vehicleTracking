import { Ref } from 'react';

import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { IStopPointsData } from '../../screens/Map/Map.types';

export type TSelectStopPointsProps = {
  title: string;
  modalRef: Ref<BottomSheetModalMethods>;
  stopPointsData: IStopPointsData | undefined;
};
