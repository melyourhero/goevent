import React from 'react';
import {mount, shallow, render} from 'enzyme';
import Map from './index';
import googleAPI from '../../../utils/FakeGoogleAPI';

describe('Map component', () => {

   beforeEach(() => {
      googleAPI.setGlobal();
   });

   afterEach(() => {
      delete global.google;
   });

   test('#it should exist Map component', () => {
      expect(Map).toBeTruthy();
   });

   test('#it should return Map component with property center', () => {
      let emptyBlock = (
         <div></div>
      );
      let center = {
         lat: 40.75,
         lng: -73.98
      };
      let markers = [];
      const URL = 'https://maps.googleapis.com/maps/api/js?libraries=visualization&key=AI' +
            'zaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&language=en';

      let wrapper = shallow(<Map
         loadingElement={emptyBlock}
         googleMapURL={URL}
         center={center}
         markers={markers}/>);

      expect(wrapper).toBeTruthy();
   });
});
