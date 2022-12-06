/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from 'react';

import { useAtomValue } from 'jotai/utils';

import {
  IScrollablePaneStyles,
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react';

import { globalState } from '../../jotai/atoms';

const DEFAULT_PAGE_SIZE = 15;
/* eslint-disable @typescript-eslint/no-empty-function */
export const useDocumentListStyles = () => {
   const appGlobalState =  useAtomValue(globalState);
   const {themeVariant , containerWidth, pageSize, files} = appGlobalState;

   const scollableContainerStyles: Partial<IScrollablePaneStyles> = React.useMemo(() => {
    return {
     /*  root: { position: "relative", height: '100%', minHeight: 500, overflowY: 'auto', overflowX: 'hidden' */
      root: { position: "relative", height: containerWidth && files.length ? ((Math.ceil(pageSize ?? DEFAULT_PAGE_SIZE )/Math.ceil(containerWidth/180))) * 180 : 0 , minHeight: 500, overflowY: 'auto', overflowX: 'hidden'
    },
    contentContainer: {  "::-webkit-scrollbar-thumb": {

      backgroundColor: themeVariant?.palette.themeLight},
    "::-webkit-scrollbar": {
      height: 10,
      width: 7,

    },
    "scrollbar-color": themeVariant?.semanticColors.bodyFrameBackground,
    "scrollbar-width": "thin", },
    };
  }, [themeVariant ,containerWidth, pageSize, files]);

  const documentListStyles = React.useMemo(  () => { return  mergeStyleSets({
    fileIconHeaderIcon: ({
      padding: 0,
      fontSize: "16px",
    }),
    fileIconCell:  mergeStyles({
      textAlign: "center",
      selectors: {
        "&:before": {
          content: ".",
          display: "inline-block",
          verticalAlign: "middle",
          height: "100%",
          width: "0px",
          visibility: "hidden",
        },
      },
    }),
    fileIconImg:  mergeStyles({
      verticalAlign: "middle",
      maxHeight: "16px",
      maxWidth: "16px",
    }),
    controlWrapper:  mergeStyles({
      display: "flex",
      flexWrap: "wrap",
    }),

    selectionDetails:  mergeStyles({
      marginBottom: "20px",
    }),
    filesContainerGrid: mergeStyles({

      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
      columnGap: "15px",
      rowGap: 15,
    } ),

    noDataFoundStyles: {
        width: "300px", height: "300px",
    },
    separator: mergeStyles({
      height: "1px",
      backgroundColor: themeVariant?.palette?.neutralLight,
      opacity:  themeVariant?.isInverted ? "0.2" : "1",
    }),
    documentList: mergeStyles({
      width: "100%",



    }),
  })}, [themeVariant]);
  return {  documentListStyles, scollableContainerStyles };
}
