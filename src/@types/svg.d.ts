declare module "*.svg" {
    import React, { ContextType } from 'react';
    import {SvgProps} from 'react-native-svg'

    const content: React.FC<SvgProps>;
    export default content;

}