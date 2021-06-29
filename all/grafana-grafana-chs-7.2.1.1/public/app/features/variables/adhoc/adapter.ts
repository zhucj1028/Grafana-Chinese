import cloneDeep from 'lodash/cloneDeep';

import { AdHocVariableModel } from '../types';
import { dispatch } from '../../../store/store';
import { VariableAdapter } from '../adapters';
import { AdHocPicker } from './picker/AdHocPicker';
import { adHocVariableReducer, initialAdHocVariableModelState } from './reducer';
import { AdHocVariableEditor } from './AdHocVariableEditor';
import { setFiltersFromUrl } from './actions';
import * as urlParser from './urlParser';

const noop = async () => {};

export const createAdHocVariableAdapter = (): VariableAdapter<AdHocVariableModel> => {
  return {
    id: 'adhoc',
    description: '快速添加键/值过滤器',
    name: '临时过滤器',
    initialState: initialAdHocVariableModelState,
    reducer: adHocVariableReducer,
    picker: AdHocPicker,
    editor: AdHocVariableEditor,
    dependsOn: () => false,
    setValue: noop,
    setValueFromUrl: async (variable, urlValue) => {
      const filters = urlParser.toFilters(urlValue);
      await dispatch(setFiltersFromUrl(variable.id, filters));
    },
    updateOptions: noop,
    getSaveModel: variable => {
      const { index, id, initLock, global, ...rest } = cloneDeep(variable);
      return rest;
    },
    getValueForUrl: variable => {
      const filters = variable?.filters ?? [];
      return urlParser.toUrl(filters);
    },
  };
};
